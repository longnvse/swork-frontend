import React from "react";
import { Form, Row, Col } from "antd";

const ByUserForm = () => {
    const [form] = Form.useForm();

    const onFinish = (values) => {
        console.log(values);
    };

    return (
        <Form
            id={"by-user-form"}
            form={form}
            layout={"vertical"}
            onFinish={onFinish}
        >
            <Row gutter={12} className={"w-full"}>
                <Col span={12}>
                    <Form.Item
                        name={"completeAmount"}
                        label={"Hoàn thành"}
                        required={true}
                        rules={[
                            {
                                required: true,
                                message:
                                    "Vui lòng nhập khối lượng đã hoàn thành!",
                            },
                        ]}
                    >
                        <InputNumber className={"w-full"} controls={false} />
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    );
};

export default ByUserForm;
