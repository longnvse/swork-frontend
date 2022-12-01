import {
    Col,
    DatePicker,
    Form,
    Input,
    InputNumber,
    message,
    Row,
    Select,
} from "antd";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
    addResource,
    getResource,
    updateResource,
} from "../../../../api/resource/resource";
import { getTeamPages } from "../../../../api/team";

const ResourceForm = ({ resourceId, projectId, phaseId }) => {
    const { id } = useParams();
    const [form] = Form.useForm();
    const [teams, setTeams] = useState([]);

    const mapDataTeams = (data) => {
        if (data?.length <= 0) return [];
        return data?.map((item) => {
            return {
                label: item?.name,
                value: item?.id,
            };
        });
    };

    useEffect(() => {
        getTeamPages(id).then((response) => {
            setTeams(mapDataTeams(response?.data?.items));
        });

        getResource(resourceId).then((response) => {
            form.setFieldsValue(response?.data);
        });
    }, [resourceId]);

    const onFinish = (values) => {
        values = {
            ...values,
            projectId: projectId,
            phaseId: phaseId,
        };

        if (!resourceId) {
            addResource(values)
                .then(() => {
                    message.success("Thêm tài nguyên thành công!");
                })
                .catch(() => {
                    message.error("Thêm tài nguyên thất bại!");
                });
        } else {
            updateResource(resourceId, values)
                .then(() => {
                    message.success("Cập nhật tài nguyên thành công!");
                })
                .catch(() => {
                    message.error("Cập nhật tài nguyên thất bại!");
                });
        }

        console.log("jtadd", values);
    };

    return (
        <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            id="resource-form"
        >
            <Row gutter={12} wrap>
                <Col span={24}>
                    <Form.Item
                        name="resourceTypeName"
                        label="Tên tài nguyên"
                        rules={[
                            {
                                required: true,
                                message: "Chưa nhập tên tài nguyên",
                            },
                        ]}
                    >
                        <Input placeholder="Tên tài nguyên" />
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Form.Item name="unit" label="Đơn vị">
                        <Input placeholder="Đơn vị" className="w-full" />
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Form.Item name="teamId" label="Đội nhóm">
                        <Select
                            options={teams}
                            className="w-full"
                            placeholder="Đội nhóm"
                        />
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Form.Item name="quantity" label="Số lượng">
                        <InputNumber
                            placeholder="Số lượng"
                            className="w-full"
                        />
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Form.Item name="dateResource" label="Ngày">
                        <DatePicker
                            format={"DD/MM/YYYY"}
                            className="w-full"
                            placeholder="Ngày"
                        />
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Form.Item name="totalAmount" label="Thành tiền">
                        <InputNumber
                            placeholder="Thành tiền"
                            className="w-full"
                        />
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    );
};

export default ResourceForm;
