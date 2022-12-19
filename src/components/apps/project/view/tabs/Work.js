import { Button, Col, message, Popconfirm, Progress, Row, Table } from "antd";
import React, { useEffect, useState } from "react";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import ButtonDrawer from "../../../../common/button/ButtonDrawer";
import {
    ADD,
    DENIED,
    message_error,
    UPDATE,
} from "../../../../common/Constant";
import WorkForm from "../../../work/form";
import { deleteWork, getWorkPages } from "../../../../../api/work";
import { columnsWork } from "../../../work/common/columns";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { renderStatus } from "../../../../common/status";

function ProjectViewWork({ projectId, phaseId }) {
    const [dataSources, setDataSources] = useState([]);
    const { reload } = useSelector((state) => state.commonReducer);

    useEffect(() => {
        getWorkPages({ projectId: projectId, phaseId: phaseId }).then(
            (response) => {
                setDataSources(mapData(response?.data?.items));
            },
        );
    }, [projectId, phaseId, reload]);

    const onConfirmDelete = (id) => {
        deleteWork(id)
            .then((value) => {
                message.success("Xoá thành công!");
            })
            .catch(message_error);
    };

    const mapData = (data) => {
        if (data?.length <= 0) return [];
        return data?.map((item) => {
            console.log(item.status);
            return {
                key: item.id,
                ...item,
                name: (
                    <Link to={`/project/view-work/${item?.id}`}>
                        {item?.name}
                    </Link>
                ),
                progress: <Progress percent={item?.progress} />,
                admin: item?.admin,
                status: renderStatus(item?.status),
                priority: item?.priority,
                intendTime: item?.intendTime,
                deadline: item?.deadline,
                action: (
                    <div className={"flex justify-evenly"}>
                        <ButtonDrawer
                            title={"Cập nhật công việc"}
                            formId={"work-form"}
                            mode={UPDATE}
                            buttonProps={{
                                icon: <EditOutlined />,
                                type: "link",
                                value: null,
                            }}
                        >
                            <WorkForm
                                projectId={projectId}
                                workId={item?.id}
                                phaseId={phaseId}
                            />
                        </ButtonDrawer>
                        <Popconfirm
                            disabled={item.status !== DENIED}
                            title={"Chắc chắn chứ!"}
                            onConfirm={() => onConfirmDelete(item.id)}
                        >
                            <Button
                                type={"link"}
                                disabled={item.status !== DENIED}
                                icon={<DeleteOutlined />}
                            />
                        </Popconfirm>
                    </div>
                ),
            };
        });
    };

    return (
        <div>
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
                        <WorkForm projectId={projectId} phaseId={phaseId} />
                    </ButtonDrawer>
                </Col>
            </Row>
            <Table dataSource={dataSources} columns={columnsWork} />
        </div>
    );
}

export default ProjectViewWork;
