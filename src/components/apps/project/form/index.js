import {Col, DatePicker, Form, Input, InputNumber, Row, Select} from "antd";
import React, {useEffect} from "react";
import {getProject} from "../../../../api/project";
import SelectAccount from "../../../common/select/account";
import FormItem from "antd/es/form/FormItem";

const ProjectForm = ({id}) => {
    const [form] = Form.useForm();

    useEffect(() => {
        if (id) {
            getProject(id).then(response => {
                form.setFieldsValue(response?.data);
            })
        }
    }, [id]);

    const onFinish = (values) => {
        console.log(values);
    };

    return (
        <Form
            form={form}
            onFinish={onFinish}
            layout={"vertical"}
            style={{width: "100%"}}
        >
            <Row gutter={12}>
                <Col span={8}>
                    <Form.Item
                        name="code"
                        label="Mã dự án"
                        rules={[
                            {
                                required: true,
                                message: "Chưa nhập mã dự án",
                            },
                        ]}
                    >
                        <Input placeholder="Mã dự án"/>
                    </Form.Item>
                </Col>
                <Col span={16}>
                    <Form.Item
                        name="name"
                        label="Tên dự án"
                        rules={[
                            {
                                required: true,
                                message: "Chưa nhập tên dự án",
                            },
                        ]}
                    >
                        <Input placeholder="Tên dự án"/>
                    </Form.Item>
                </Col>
            </Row>
            <FormItem
                name={"progressType"}
                label={"Cách tính tiến độ dự án"}
                rules={[
                    {
                        required: true,
                        message: "Chưa chọn cách tính tiến độ dự án",
                    },
                ]}
            >
                <Select
                    dropdownMatchSelectWidth={false}
                >
                    <Select.Option
                        value={"averageWorks"}
                        title={"Theo bình quân % hoàn thành các công việc"}
                        children={<>
                            <b>Theo bình quân % hoàn thành các công việc</b>
                            <div style={{color: 'rgb(119, 119, 119)', fontSize: '0.9em'}}>Ví dụ dự án gồm 2 công việc A và B .</div>
                            <div style={{color: 'rgb(119, 119, 119)', fontSize: '0.9em'}}>Công việc A yêu cầu thời gian thực hiện trong 4 ngày , tiến độ 40%</div>
                            <div style={{color: 'rgb(119, 119, 119)', fontSize: '0.9em'}}>Công việc B yêu cầu thời gian thực hiện trong 6 ngày , tiến độ 50%</div>
                            <div style={{color: 'rgb(119, 119, 119)', fontSize: '0.9em'}}>Tiến độ dự án là ((4*40+6*60)/(4*100+6*100))*100 = 46%</div>
                        </>}/>
                </Select>
            </FormItem>
            <Row gutter={12}>
                <Col span={12}>
                    <Form.Item
                        name="startDate"
                        label="Thời gian bắt đầu"
                        rules={[
                            {
                                required: true,
                                message: "Chưa chọn thời gian bắt đầu",
                            },
                        ]}
                    >
                        <DatePicker className="w-full"/>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name="endDate"
                        label="Thời gian kết thúc"
                        rules={[
                            {
                                required: true,
                                message: "Chưa chọn thời gian kết thúc",
                            },
                        ]}
                    >
                        <DatePicker className="w-full"/>
                    </Form.Item>
                </Col>
            </Row>
            <Form.Item
                name="assignor"
                label="Người quản trị"
                rules={[
                    {
                        required: true,
                        message: "Chưa chọn người quản trị",
                    },
                ]}
            >
                <SelectAccount placeholder="Chọn người quản trị"/>
            </Form.Item>
            <Form.Item
                name="assignee"
                label="Người thực hiện"
                rules={[
                    {
                        required: true,
                        message: "Chưa chọn người thực hiện",
                    },
                ]}
            >
                <SelectAccount placeholder="Chọn người quản trị"/>
            </Form.Item>
            <Form.Item
                name="follower"
                label="Người theo dõi"
                rules={[
                    {
                        required: true,
                        message: "Chưa chọn người theo dõi",
                    },
                ]}
            >
                <SelectAccount placeholder="Chọn người theo dõi"/>
            </Form.Item>


            <Form.Item
                name="budget"
                label="Ngân sách"
                rules={[
                    {
                        required: true,
                        message: "Chưa nhập ngân sách",
                    },
                ]}
            >
                <InputNumber className={"w-full"} addonAfter={"VNĐ"} controls={false} min={0}
                             placeholder="Nhập ngân sách"/>
            </Form.Item>

            <Form.Item name="description" label="Mô tả">
                <Input.TextArea placeholder="Nhập mô tả"/>
            </Form.Item>
        </Form>
    );
};

export default ProjectForm;
