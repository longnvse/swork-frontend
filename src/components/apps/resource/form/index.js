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
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import {
    addResource,
    getResource,
    updateResource,
} from "../../../../api/resource/resource";

const ResourceForm = () => {
    const { id } = useParams;
    const [form] = Form.useForm();

    const options = [
        {
            name: "Đội 1",
            value: "doi1",
        },
        {
            name: "Đội 2",
            value: "doi2",
        },
    ];

    useEffect(() => {
        getResource(id).then((response) => {
            form.setFieldsValue(response?.data);
        });
    }, [id]);

    const onFinish = (values) => {
        if (!id) {
            addResource(values)
                .then(() => {
                    message.success("Thêm tài nguyên thành công!");
                })
                .catch(() => {
                    message.error("Thêm tài nguyên thất bại!");
                });
        } else {
            updateResource(id, values)
                .then(() => {
                    message.success("Cập nhật tài nguyên thành công!");
                })
                .catch(() => {
                    message.error("Cập nhật tài nguyên thất bại!");
                });
        }
    };

    return (
        <Form form={form} layout="vertical" onFinish={onFinish}>
            <Row gutter={12} wrap>
                <Col span={16}>
                    <Form.Item
                        name="name"
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
                <Col span={8}>
                    <Form.Item name="unit" label="Đơn vị">
                        <InputNumber placeholder="Đơn vị" className="w-full" />
                    </Form.Item>
                </Col>
                <Col span={16}>
                    <Form.Item name="team" label="Đội nhóm">
                        <Select
                            options={options}
                            className="w-full"
                            placeholder="Đội nhóm"
                        />
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item name="quantity" label="Số lượng">
                        <InputNumber
                            placeholder="Số lượng"
                            className="w-full"
                        />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item name="date" label="Ngày">
                        <DatePicker
                            format={"DD/MM/YYYY"}
                            className="w-full"
                            placeholder="Ngày"
                        />
                    </Form.Item>
                </Col>
                <Col span={12}>
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
