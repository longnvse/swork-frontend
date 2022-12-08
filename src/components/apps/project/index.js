import React, {useCallback, useEffect, useState} from "react";
import CommonList from "../../common/list";
import {columns} from "./common/columns";
import {deleteProject, getProjectPages} from "../../../api/project";
import {Button, Col, message, Popconfirm, Progress, Row, Tabs, Tooltip} from "antd";
import {renderStatus} from "../../common/status";
import ButtonDrawer from "../../common/button/ButtonDrawer";
import {ADD, DATE_FORMAT, DENIED, STATUS, UPDATE} from "../../common/Constant";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
import ProjectForm from "./form";
import moment from "moment";
import {useDispatch} from "react-redux";
import {isReload} from "../../../redux/actions/common/actions";
import ButtonTab from "../../common/button/ButtonTab";
import {TbLayoutKanban} from "react-icons/tb";
import {CiViewTimeline} from "react-icons/ci";
import {Link} from "react-router-dom";
import {URIS} from "../../../utils/constant";

const status = ["pending", "active", "completed", "inactive", "denied"];

function ProjectList(props) {
    const [filter, setFilter] = useState(null);
    const dispatch = useDispatch();

    const onConfirmDelete = (id) => {
        deleteProject(id).then(value => {
            message.success("Xoá thành công!");
        })
    }

    useEffect(() => {
        if (filter !== null) {
            dispatch(isReload(true));
        }
    }, [filter]);


    const onLoad = useCallback((params) => {
        params.filter = filter;

        return getProjectPages(params);
    }, [filter]);

    const mapData = (item, index) => {
        return {
            key: item.id,
            ...item,
            name: <Link to={`${URIS.VIEW_PROJECT}/${item.id}`}>{item.name}</Link>,
            status: renderStatus(item.status),
            startDate: moment(item.startDate).format(DATE_FORMAT),
            endDate: moment(item.endDate).format(DATE_FORMAT),
            progress: <Progress percent={item.progress} size="small"/>,
            action: <div className={"flex justify-evenly"}>
                <ButtonDrawer
                    title={"Cập nhật dự án"}
                    formId={"project-form"}
                    mode={UPDATE}
                    buttonProps={{
                        icon: <EditOutlined/>,
                        type: "link",
                        value: null
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

    const buttonAdd = <ButtonDrawer
        title={"Thêm mới dự án"}
        formId={"project-form"}
        mode={ADD}
        buttonProps={{
            value: "Thêm mới"
        }}
    >
        <ProjectForm/>
    </ButtonDrawer>

    const tabItems = [
        {
            label: "Tất cả",
            key: "all"
        },
        ...status.map((item) => ({label: STATUS[item], key: item}))
    ]

    const onChangeStatusFilter = (activeKey) => {
        if (activeKey === "all") {
            setFilter(undefined);
            return;
        }
        setFilter(`status eq '${activeKey}'`);
    }

    const tabExtra = (
        <Row gutter={8}>
            <Col>
                <ButtonTab
                    icon={<TbLayoutKanban style={{fontSize: 20}}/>}
                    title={"Kanban"}
                />
            </Col>
            <Col>
                <ButtonTab
                    icon={<CiViewTimeline style={{fontSize: 20}}/>}
                    title={"Gantt chart"}
                />
            </Col>
        </Row>
    )

    return (
        <div>
            <Tabs
                onChange={onChangeStatusFilter}
                items={tabItems}
                tabBarExtraContent={tabExtra}
            />
            <CommonList
                mapData={mapData}
                load={onLoad}
                columns={columns}
                buttonAdd={buttonAdd}
            />
        </div>
    );
}

export default ProjectList;
