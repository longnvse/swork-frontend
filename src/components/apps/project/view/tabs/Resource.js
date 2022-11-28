import { Col, Input, Popconfirm, Row, Table, Button, message } from "antd";
import React, { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import ButtonDrawer from "../../../../common/button/ButtonDrawer";
import { ADD, INACTIVE, UPDATE } from "../../../../common/Constant";
import ResourceForm from "../../../resource/form";
import { columnsResource } from "../../../resource/common/columns";
import {
    deleteResource,
    getResourcePages,
} from "../../../../../api/resource/resource";

function ProjectViewResource(props) {
    const [dataSources, setDataSources] = useState([]);

    useEffect(() => {
        getResourcePages().then((response) => {
            setDataSources(mapData(response?.data?.items));
        });
    }, []);

    const onConfirmDelete = (id) => {
        deleteResource(id)
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
                name: item?.name,
                quantity: item?.quantity,
                totalAmount: item?.totalAmount,
                team: item?.team,
                parent: item?.parent,
                date: item?.date,
                creator: item?.creator,
                action: (
                    <div className={"flex justify-evenly"}>
                        <ButtonDrawer
                            title={"Cập nhật tài nguyên"}
                            formId={"resource-form"}
                            mode={UPDATE}
                            buttonProps={{
                                icon: <EditOutlined />,
                                type: "link",
                                value: null,
                            }}
                        >
                            <ResourceForm resourceId={item?.id} />
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
                        title={"Thêm mới tài nguyên"}
                        formId={"resource-form"}
                        mode={ADD}
                        buttonProps={{
                            value: "Thêm mới",
                        }}
                    >
                        <ResourceForm />
                    </ButtonDrawer>
                </Col>
                <Col span={6}>
                    <Input prefix={<FiSearch />} />
                </Col>
            </Row>
            <Table dataSource={dataSources} columns={columnsResource} />
        </div>
    );
}

export default ProjectViewResource;
