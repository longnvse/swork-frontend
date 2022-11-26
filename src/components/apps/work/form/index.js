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
import { addWork, getWork, updateWork } from "../../../../api/work";

const WorkForm = () => {
    const { id } = useParams();
    const [form] = Form.useForm();
    const [assignees, setAssignees] = useState([]);
    const [assignors, setAssignors] = useState([]);
    const [followers, setFollowers] = useState([]);
    const priorities = [
        {
            label: "Cao",
            value: "high",
        },
        {
            label: "Trung bình",
            value: "medium",
        },
        {
            label: "Thấp",
            value: "low",
        },
    ];

    useEffect(() => {
        getWork(id).then((response) => {
            form.setFieldsValue(response?.data);
        });
    }, [id]);

    const onFinish = (values) => {
        if (!id) {
            addWork(values)
                .then(() => {
                    message.success("Thêm công việc thành công!");
                })
                .catch(() => {
                    message.error("Thêm công việc thất bại!");
                });
        } else {
            updateWork(id, values)
                .then(() => {
                    message.success("Cập nhật công việc thành công!");
                })
                .catch(() => {
                    message.error("Cập nhật công việc thất bại!");
                });
        }
    };

    return (
        <Form form={form} layout="vertical" onFinish={onFinish}>
            <Row gutter={12} wrap>
                <Col span={24}>
                    <Form.Item
                        name="name"
                        label="Tên công việc"
                        rules={[
                            {
                                required: true,
                                message: "Chưa nhập tên công việc",
                            },
                        ]}
                    >
                        <Input placeholder="Tên công việc" />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item name="startDate" label="Thời gian bắt đầu">
                        <DatePicker
                            format={"DD/MM/YYYY"}
                            placeholder="Bắt đầu"
                            className="w-full"
                        />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item name="endDate" label="Thời gian kết thúc">
                        <DatePicker
                            className="w-full"
                            format={"DD/MM/YYYY"}
                            placeholder="Kết thúc"
                        />
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Form.Item name="assignee" label="Người thực hiện">
                        <Select
                            options={assignees}
                            className="w-full"
                            placeholder="Người thực hiện"
                        />
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Form.Item name="assignor" label="Người quản trị">
                        <Select
                            options={assignors}
                            className="w-full"
                            placeholder="Người quản trị"
                        />
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Form.Item
                        name="follower"
                        label="Người theo dõi/phối hợp thực hiện"
                    >
                        <Select
                            options={followers}
                            className="w-full"
                            placeholder="Người theo dõi/phối hợp thực hiện"
                        />
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Form.Item name="priority" label="Độ ưu tiên">
                        <Select
                            options={priorities}
                            className="w-full"
                            placeholder="Độ ưu tiên"
                        />
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Form.Item name="description" label="Mô tả">
                        <Input.TextArea
                            className="w-full"
                            placeholder="Mô tả"
                        />
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    );
};

export default WorkForm;
