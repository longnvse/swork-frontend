import {
    Col,
    Input,
    Popconfirm,
    Row,
    Table,
    Button,
    message,
    Progress,
} from "antd";
import React, { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import ButtonDrawer from "../../../../common/button/ButtonDrawer";
import { ADD, INACTIVE, UPDATE } from "../../../../common/Constant";
import WorkForm from "../../../work/form";
import { deleteWork, getWorkPages } from "../../../../../api/work";
import { columnsWork } from "../../../work/common/columns";
import { Link } from "react-router-dom";

function ProjectViewWork({ projectId, phaseId }) {
    const [dataSources, setDataSources] = useState([]);

    useEffect(() => {
        getWorkPages({ projectId: projectId, phaseId: phaseId }).then(
            (response) => {
                setDataSources(mapData(response?.data?.items));
            },
        );
    }, [projectId, phaseId]);

    const onConfirmDelete = (id) => {
        deleteWork(id)
            .then((value) => {
                message.success("Xoá thành công!");
            })
            .catch((err) => {
                message.error(
                    err.response?.data?.detail ||
                        "Đã có lỗi xảy ra. Vui lòng thử lại sau ít phút!",
                );
            });
    };

    const mapData = (data) => {
        if (data?.length <= 0) return [];
        return data?.map((item) => {
            return {
                key: item.id,
                ...item,
                name: (
                    <Link to={`/project/view-work/${item?.id}`}>
                        {item?.name}
                    </Link>
                ),
                progress: <Progress progress={item?.progress} />,
                admin: item?.admin,
                status: item?.status,
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
                            <WorkForm workId={item?.id} />
                        </ButtonDrawer>
                        <Popconfirm
                            disabled={item.status !== INACTIVE}
                            title={"Chắc chắn chứ!"}
                            onConfirm={() => onConfirmDelete(item.id)}
                        >
                            <Button
                                type={"link"}
                                disabled={item.status !== INACTIVE}
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
                        <WorkForm />
                    </ButtonDrawer>
                </Col>
                <Col span={6}>
                    <Input prefix={<FiSearch />} />
                </Col>
            </Row>
            <Table dataSource={dataSources} columns={columnsWork} />
        </div>
    );
}

export default ProjectViewWork;
