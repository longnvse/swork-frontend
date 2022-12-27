import {
    ApartmentOutlined,
    CheckCircleOutlined,
    DeleteOutlined,
    EditOutlined,
    FolderOutlined,
    PlusOutlined,
    UnorderedListOutlined,
} from "@ant-design/icons";
import {Button, Col, message, Popconfirm, Progress, Row} from "antd";
import React, {useCallback, useEffect, useMemo, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {deleteWork, getWorkPages} from "../../../../api/work";
import ButtonDrawer from "../../../common/button/ButtonDrawer";
import {ADD, DATE_FORMAT, DENIED, message_error, STATUS, UPDATE,} from "../../../common/Constant";
import {columnsWork, columnsWorkActive, columnsWorkPending,} from "../common/columns";
import WorkForm from "../form";
import {useDispatch} from "react-redux";
import {isReload, setHeader} from "../../../../redux/actions/common/actions";
import SWTabs from "../../../common/tabs";
import CommonList from "../../../common/list";
import {renderStatus} from "../../../common/status";
import dayjs from "dayjs";
import ButtonTab from "../../../common/button/ButtonTab";
import AccountGroup from "../../../common/account/group";
import {TbLayoutKanban} from "react-icons/tb";
import {CiViewTimeline} from "react-icons/ci";
import ProjectKanban from "../../project/kanban";
import ProjectGanttChart from "../../project/gantt-chart";
import {ViewMode} from "gantt-task-react";
import {getDeadline} from "../common/common";
import {getMe} from "../../../../api/common";

const WORK_FILTER = {
    "assign": "workHandleAccount",
    "manage": "workManage",
    "follow": "workParticipateAccount"
}
const WorkList = (props) => {
    const [filter, setFilter] = useState(null);
    const dispatch = useDispatch();
    const [viewMode, setViewMode] = useState("list");
    const [filterBySider, setFilterBySider] = useState("");
    const status = ["pending", "active", "completed", "inactive", "denied"];
    const [statusFilter, setStatusFilter] = useState("all");
    const {type} = useParams();

    useEffect(() => {
        dispatch(setHeader("Danh sách công việc"));
    }, []);

    useEffect(() => {
        if (filter !== null || filterBySider !== null) {
            dispatch(isReload(true));
        }
    }, [filter, filterBySider]);

    useEffect(() => {
        if (type !== "all") {
            setFilterBySider(`contains(${WORK_FILTER[type]},'${getMe().accountId}')`);
        } else {
            setFilterBySider("");
        }
    }, [type]);

    const onLoad = useCallback(
        (params) => {
            params.filter = `${filterBySider || ""}${filterBySider && filter ? " and " : ""}${filter || ""}`;

            return getWorkPages(params);
        },
        [filter, filterBySider],
    );

    const onConfirmDelete = (id) => {
        deleteWork(id)
            .then((value) => {
                message.success("Xoá thành công!");
            })
            .catch(message_error);
    };

    const mapData = (item) => {
        return {
            key: item.id,
            ...item,
            name: (
                <div>
                    <Link to={`/project/view-work/${item?.id}`}>
                        {item?.name}
                    </Link>
                    <div className="flex items-center">
                        {item?.projectId ? (
                            <div className="flex items-center">
                                <FolderOutlined/>
                                <Link
                                    to={`/project/view/${item?.projectId}`}
                                    className="ml-2 block text-gray-800 hover:underline"
                                    style={{fontSize: 13}}
                                >
                                    {item?.projectName}
                                </Link>
                                {item?.projectId && item?.phaseId || item?.parentId ? (
                                    <span className="mx-2">/</span>
                                ) : null}
                            </div>
                        ) : null}
                        {item?.phaseId ? (
                            <div className="flex items-center">
                                <ApartmentOutlined/>
                                <Link
                                    to={`/project/view-phase/${item?.phaseId}`}
                                    className="ml-2 block text-gray-800 hover:underline"
                                    style={{fontSize: 13}}
                                >
                                    {item?.phaseName}
                                </Link>
                            </div>
                        ) : null}
                        {item?.parentId ? (
                            <div className="flex items-center">
                                <CheckCircleOutlined/>
                                <Link
                                    to={`/project/view-work/${item?.parentId}`}
                                    className="ml-2 block text-gray-800 hover:underline"
                                    style={{fontSize: 13}}
                                >
                                    {item?.parentName}
                                </Link>
                            </div>
                        ) : null}
                    </div>
                </div>
            ),
            progress: <Progress percent={item?.progress}/>,
            admin: (
                <AccountGroup
                    accountIds={item?.manages.map((item) => item.memberId)}
                />
            ),
            member: (
                <AccountGroup
                    accountIds={item?.handles.map((item) => item.memberId)}
                />
            ),
            status: renderStatus(item?.status),
            endDate: `${dayjs(item?.startDate).format(DATE_FORMAT)} - ${dayjs(
                item?.endDate,
            ).format(DATE_FORMAT)}`,
            deadline:
                item?.status === "active"
                    ? getDeadline(new Date(item?.endDate), new Date())
                    : null,
            action: (
                <div className={"flex justify-evenly"}>
                    <ButtonDrawer
                        title={"Cập nhật công việc"}
                        formId={"work-form"}
                        mode={UPDATE}
                        buttonProps={{
                            icon: <EditOutlined/>,
                            type: "link",
                            value: null,
                        }}
                    >
                        <WorkForm workId={item?.id}/>
                    </ButtonDrawer>
                    <Popconfirm
                        disabled={item.status !== DENIED}
                        title={"Chắc chắn chứ!"}
                        onConfirm={() => onConfirmDelete(item.id)}
                    >
                        <Button
                            type={"link"}
                            disabled={item.status !== DENIED}
                            icon={<DeleteOutlined/>}
                        />
                    </Popconfirm>
                </div>
            ),
        };
    };

    const tabItemsForList = [
        {
            label: "Tất cả",
            key: "all",
        },
        ...status.map((item) => ({label: STATUS[item], key: item})),
    ];

    const tabItemsForGanttChart = [
        {label: "Ngày", key: ViewMode.Day},
        {
            label: "Tuần",
            key: ViewMode.Week,
        },
        {label: "Tháng", key: ViewMode.Month},
        {
            label: "Năm",
            key: ViewMode.Year,
        },
    ];

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
        setStatusFilter(activeKey);
        if (!isValidStatus(activeKey)) {
            return;
        }
        if (activeKey === "all") {
            setFilter((prev) => undefined);
            return;
        }
        setFilter((prev) => `status eq '${activeKey}'`);
    };

    const isValidStatus = (activeKey) => {
        return (
            tabItemsForList.findIndex((item) => item.key === activeKey) !== -1
        );
    };

    const tabExtra = (
        <Row gutter={8}>
            {viewMode !== "list" && (
                <Col>
                    <ButtonTab
                        icon={
                            <UnorderedListOutlined style={{fontSize: 20}}/>
                        }
                        title={"Danh sách"}
                        buttonProps={{
                            onClick: () => {
                                setViewMode("list");
                            },
                        }}
                        selected={viewMode === "list"}
                    />
                </Col>
            )}
            <Col>
                <ButtonTab
                    icon={<TbLayoutKanban style={{fontSize: 20}}/>}
                    title={"Kanban"}
                    buttonProps={{
                        onClick: () => {
                            setViewMode("kanban");
                        },
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
                        },
                    }}
                    selected={viewMode === "ganttChart"}
                />
            </Col>
            <Col>
                <ButtonDrawer
                    title={"Thêm mới công việc"}
                    formId={"work-form"}
                    mode={ADD}
                    button={
                        <ButtonTab
                            icon={<PlusOutlined style={{fontSize: 20}}/>}
                            title={"Thêm công việc"}
                        />
                    }
                >
                    <WorkForm/>
                </ButtonDrawer>
            </Col>
        </Row>
    );

    function renderList() {
        if (viewMode === "list") {
            if (statusFilter === "active" || statusFilter === "all") {
                return (
                    <CommonList
                        mapData={mapData}
                        load={onLoad}
                        columns={columnsWorkActive}
                        hiddenButton={false}
                    />
                );
            } else if (
                statusFilter === "pending" ||
                statusFilter === "completed"
            ) {
                return (
                    <CommonList
                        mapData={mapData}
                        load={onLoad}
                        columns={columnsWorkPending}
                        hiddenButton={false}
                    />
                );
            } else {
                return (
                    <CommonList
                        mapData={mapData}
                        load={onLoad}
                        columns={columnsWork}
                        hiddenButton={false}
                    />
                );
            }
        }
    }

    return (
        <div>
            <SWTabs
                onChange={onChangeStatusFilter}
                items={tabItems}
                tabBarExtraContent={tabExtra}
            />
            {renderList()}
            {viewMode === "kanban" ? <ProjectKanban isWork={true}/> : null}
            {viewMode === "ganttChart" ? (
                <ProjectGanttChart isWork={true}/>
            ) : null}
        </div>
    );
};

export default WorkList;
