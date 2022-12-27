import {Button, Col, message, Popconfirm, Progress, Row, Table} from "antd";
import React, {useEffect, useState} from "react";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
import ButtonDrawer from "../../../../common/button/ButtonDrawer";
import {ADD, DENIED, message_error, PROJECT_ROLE, UPDATE,} from "../../../../common/Constant";
import WorkForm from "../../../work/form";
import {deleteWork, getWorkPages} from "../../../../../api/work";
import {columnsWork} from "../../../work/common/columns";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {renderStatus} from "../../../../common/status";
import dayjs from "dayjs";
import {getDeadline} from "../../../work/common/common";
import AccountGroup from "../../../../common/account/group";

function ProjectViewWork({
                             projectId,
                             phaseId,
                             parentId,
                             hiddenBtn,
                             inProject = false,
                             role
                         }) {
    const [dataSources, setDataSources] = useState([]);
    const {reload} = useSelector((state) => state.commonReducer);

    useEffect(() => {
        if (projectId || phaseId || parentId) {
            getWorkPages({isTree: true, projectId, phaseId, parentId}).then(
                (response) => {
                    setDataSources(mapData(response?.data?.items));
                },
            );
        }
    }, [projectId, phaseId, parentId, reload]);

    const onConfirmDelete = (id) => {
        deleteWork(id)
            .then((value) => {
                message.success("Xoá thành công!");
            })
            .catch(message_error);
    };

    const isDisable = (role, item) => {
        if (item.manages?.findIndex(manage => manage.memberId) !== -1) {
            return false;
        }

        return role !== PROJECT_ROLE.MANAGE;
    }

    const mapData = (data) => {
        if (data?.length <= 0) return [];
        return data?.map((item) => {
            return {
                key: item.id,
                ...item,
                name: (
                    <Link to={`/project/view-work/${item?.id}`}>
                        {`${item?.name} ${inProject && item.phaseId ? `(${item.phaseName})` : ""}`}
                    </Link>
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
                priority: item?.priority,
                endDate: `${dayjs(item?.startDate).format(
                    "DD/MM/YYYY",
                )} - ${dayjs(item?.endDate).format("DD/MM/YYYY")}`,
                deadline:
                    item?.status === "active"
                        ? getDeadline(new Date(item?.endDate), new Date())
                        : null,
                children: item?.works?.length > 0 ? mapData(item?.works) : null,
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
                                disabled: isDisable(role, item)
                            }}
                        >
                            <WorkForm
                                projectId={projectId}
                                workId={item?.id}
                                phaseId={phaseId}
                            />
                        </ButtonDrawer>
                        <Popconfirm
                            disabled={item.status !== DENIED || isDisable(role, item)}
                            title={"Chắc chắn chứ!"}
                            onConfirm={() => onConfirmDelete(item.id)}
                        >
                            <Button
                                type={"link"}
                                disabled={item.status !== DENIED || isDisable(role, item)}
                                icon={<DeleteOutlined/>}
                            />
                        </Popconfirm>
                    </div>
                ),
            };
        });
    };

    return (
        <div>
            {!hiddenBtn ? (
                <Row gutter={12} className={"mb-4"}>
                    <Col>
                        <ButtonDrawer
                            title={"Thêm mới công việc"}
                            formId={"work-form"}
                            mode={ADD}
                            buttonProps={{
                                value: "Thêm mới",
                            }}
                            drawerProps={{
                                width: 500,
                            }}
                        >
                            <WorkForm
                                projectId={projectId}
                                phaseId={phaseId}
                                parentId={parentId}
                            />
                        </ButtonDrawer>
                    </Col>
                </Row>
            ) : null}
            <Table dataSource={dataSources} columns={columnsWork}/>
        </div>
    );
}

export default ProjectViewWork;
