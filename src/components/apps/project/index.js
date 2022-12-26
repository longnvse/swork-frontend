import React, {useCallback, useEffect, useMemo, useState} from "react";
import CommonList from "../../common/list";
import {columns} from "./common/columns";
import {deleteProject, getProjectPages} from "../../../api/project";
import {Button, Col, message, Popconfirm, Progress, Row, Tooltip} from "antd";
import {renderStatus} from "../../common/status";
import ButtonDrawer from "../../common/button/ButtonDrawer";
import {ADD, DATE_FORMAT, DENIED, STATUS, UPDATE} from "../../common/Constant";
import {DeleteOutlined, EditOutlined, PlusOutlined, UnorderedListOutlined} from "@ant-design/icons";
import ProjectForm from "./form";
import dayjs from 'dayjs';
import {useDispatch} from "react-redux";
import {isReload, setHeader} from "../../../redux/actions/common/actions";
import ButtonTab from "../../common/button/ButtonTab";
import {TbLayoutKanban} from "react-icons/tb";
import {CiViewTimeline} from "react-icons/ci";
import {Link, useParams} from "react-router-dom";
import {URIS} from "../../../utils/constant";
import SWTabs from "../../common/tabs";
import ProjectKanban from "./kanban";
import ProjectGanttChart from "./gantt-chart";
import {ViewMode} from "gantt-task-react";
import AccountGroup from "../../common/account/group";
import {getMe} from "../../../api/common";

const status = ["pending", "active", "completed", "inactive", "denied"];
const PROJECT_FILTER = {
    "assign": "projectHandleAccount",
    "manage": "projectManage",
    "follow": "projectParticipateAccount"
}

function ProjectList(props) {
    const {type} = useParams();
    const [filter, setFilter] = useState("");
    const [filterBySider, setFilterBySider] = useState("");
    const [viewMode, setViewMode] = useState("list");
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setHeader("Danh sách dự án"))
    }, [])

    const onConfirmDelete = (id) => {
        deleteProject(id).then(value => {
            message.success("Xoá thành công!");
        })
    }

    useEffect(() => {
        if (filter !== null || filterBySider !== null) {
            dispatch(isReload(true));
        }
    }, [filter, filterBySider]);

    useEffect(() => {
        if (type !== "all") {
            setFilterBySider(`contains(${PROJECT_FILTER[type]},'${getMe().accountId}')`);
        } else {
            setFilterBySider("");
        }
    }, [type]);


    const onLoad = useCallback((params) => {
        params.filter = `${filterBySider || ""}${filterBySider && filter ? " and " : ""}${filter || ""}`;

        return getProjectPages(params);
    }, [filter, filterBySider]);

    const mapData = (item, index) => {
        return {
            key: item.id,
            ...item,
            name: <Link to={`${URIS.VIEW_PROJECT}/${item.id}`}>{item.name}</Link>,
            status: renderStatus(item.status),
            startDate: dayjs(item.startDate).format(DATE_FORMAT),
            endDate: dayjs(item.endDate).format(DATE_FORMAT),
            progress: <Progress percent={item.progress} size="small"/>,
            manager: <AccountGroup accountIds={item.manages.map(item => item.memberId)}/>,
            participates: <AccountGroup accountIds={item.handles.map(item => item.memberId)}/>,
            action: <div className={"flex justify-evenly"}>
                <ButtonDrawer
                    title={"Cập nhật dự án"}
                    formId={"project-form"}
                    mode={UPDATE}
                    buttonProps={{
                        icon: <EditOutlined/>, type: "link", value: null
                    }}
                >
                    <ProjectForm id={item.id}/>
                </ButtonDrawer>
                <Popconfirm
                    disabled={item.status !== DENIED}
                    title={"Chắc chắn chứ!"}
                    onConfirm={() => onConfirmDelete(item.id)}
                    autoAdjustOverflow={false}
                >
                    <Tooltip
                        title={item.status !== DENIED ? "Dự án phải ở trạng thái Huỷ" : null}
                        placement={"left"}
                    >
                        <Button type={"link"} disabled={item.status !== DENIED}
                                icon={<DeleteOutlined/>}/></Tooltip>
                </Popconfirm>
            </div>,
            index: index + 1
        };
    };

    const tabItemsForList = [{
        label: "Tất cả", key: "all"
    }, ...status.map((item) => ({label: STATUS[item], key: item}))]

    const tabItemsForGanttChart = [{label: "Ngày", key: ViewMode.Day}, {
        label: "Tuần", key: ViewMode.Week
    }, {label: "Tháng", key: ViewMode.Month}, {
        label: "Năm", key: ViewMode.Year
    }]

    const tabItems = useMemo(() => {
        switch (viewMode) {
            case "list":
                return tabItemsForList;
            case "ganttChart":
                return tabItemsForGanttChart;
            default:
                return [];
        }
    }, [viewMode]);

    const onChangeStatusFilter = (activeKey) => {
        if (!isValidStatus(activeKey)) {
            return;
        }
        if (activeKey === "all") {
            setFilter(prev => undefined);
            return;
        }
        setFilter(prev => `status eq '${activeKey}'`);
    }

    const isValidStatus = (activeKey) => {
        return tabItemsForList.findIndex(item => item.key === activeKey) !== -1;
    }

    const tabExtra = (<Row gutter={8}>
        {viewMode !== "list" && <Col>
            <ButtonTab
                icon={<UnorderedListOutlined style={{fontSize: 20}}/>}
                title={"Danh sách"}
                buttonProps={{
                    onClick: () => {
                        setViewMode("list");
                    }
                }}
                selected={viewMode === "list"}
            />
        </Col>}
        <Col>
            <ButtonTab
                icon={<TbLayoutKanban style={{fontSize: 20}}/>}
                title={"Kanban"}
                buttonProps={{
                    onClick: () => {
                        setViewMode("kanban");
                    }
                }}
                selected={viewMode === "kanban"}
            />
        </Col>
        <Col>
            <ButtonTab
                icon={<CiViewTimeline style={{fontSize: 20}}/>}
                title={"Gantt chart"}
                buttonProps={{
                    onClick: () => {
                        setViewMode("ganttChart");
                    }
                }}
                selected={viewMode === "ganttChart"}
            />
        </Col>
        <Col>
            <ButtonDrawer
                title={"Thêm mới dự án"}
                formId={"project-form"}
                mode={ADD}
                button={<ButtonTab
                    icon={<PlusOutlined style={{fontSize: 20}}/>}
                    title={"Thêm dự án"}
                    disable={getMe().role !== "admin"}
                    visible={getMe().role === "admin"}
                />}
            >
                <ProjectForm/>
            </ButtonDrawer>
        </Col>
    </Row>)

    return (<div>
        <SWTabs
            onChange={onChangeStatusFilter}
            items={tabItems}
            tabBarExtraContent={tabExtra}
        />
        {viewMode === "list" && <CommonList
            mapData={mapData}
            load={onLoad}
            columns={columns}
            hiddenButton={true}
        />}
        {viewMode === "kanban" && <ProjectKanban/>}
        {viewMode === "ganttChart" && <ProjectGanttChart/>}
    </div>);
}

export default ProjectList;
