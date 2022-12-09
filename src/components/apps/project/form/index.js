import {Col, Form, Input, InputNumber, message, Row, Select} from "antd";
import React, {useEffect} from "react";
import {addProject, getProject, updateProject} from "../../../../api/project";
import SelectAccount from "../../../common/select/account";
import FormItem from "antd/es/form/FormItem";
import SWDatePicker from "../../../common/date";
import dayjs from "dayjs";
import {message_error} from "../../../common/Constant";

const ProjectForm = ({id}) => {
    const [form] = Form.useForm();

    useEffect(() => {
        if (id) {
            getProject(id).then(response => {
                form.setFieldsValue({
                    ...response?.data,
                    startDate: dayjs(response.data.startDate),
                    endDate: dayjs(response.data.endDate)
                });
            })
        }
    }, [id]);

    const onFinish = (values) => {
        if (!id) {
            addProject(values).then(() => {
                message.success("Thêm dự án thành công!");
            }).catch(message_error)
        } else {
            updateProject(id, values).then(() => {
                message.success("Cập nhật dự án thành công!");
            }).catch(message_error)
        }

    };

    return (
        <Form
            form={form}
            onFinish={onFinish}
            layout={"vertical"}
            id={"project-form"}
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
                    defaultValue={"averageWorks"}
                    placeholder={"Chọn cách tính tiến độ dự án"}
                >
                    <Select.Option
                        value={"averageWorks"}
                        title={"Theo bình quân % hoàn thành các công việc"}
                        children={<>
                            <b>Theo bình quân % hoàn thành các công việc</b>
                            <div style={{color: 'rgb(119, 119, 119)', fontSize: '0.9em'}}>Ví dụ dự án gồm 2 công việc A
                                và B .
                            </div>
                            <div style={{color: 'rgb(119, 119, 119)', fontSize: '0.9em'}}>Công việc A tiến độ 40% , Công
                                việc B tiến độ 60% .
                            </div>
                            <div style={{color: 'rgb(119, 119, 119)', fontSize: '0.9em'}}>Tiến độ của dự án là (40+60)/2
                                = 50% .
                            </div>
                        </>}/>
                    <Select.Option
                        value={"proportionDate"}
                        title={"Theo tỷ trọng ngày thực hiện"}
                        children={<>
                            <b>Theo tỷ trọng ngày thực hiện </b>
                            <div style={{color: 'rgb(119, 119, 119)', fontSize: '0.9em'}}>Ví dụ dự án gồm 2 công việc A
                                và B .
                            </div>
                            <div style={{color: 'rgb(119, 119, 119)', fontSize: '0.9em'}}>Công việc A yêu cầu thời gian
                                thực hiện trong 4 ngày , tiến độ 40%
                            </div>
                            <div style={{color: 'rgb(119, 119, 119)', fontSize: '0.9em'}}>Công việc B yêu cầu thời gian
                                thực hiện trong 6 ngày , tiến độ 50%
                            </div>
                            <div style={{color: 'rgb(119, 119, 119)', fontSize: '0.9em'}}>Tiến độ dự án là
                                ((4*40+6*60)/(4*100+6*100))*100 = 52%
                            </div>
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
                        <SWDatePicker className="w-full"/>
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
                        <SWDatePicker className="w-full"/>
                    </Form.Item>
                </Col>
            </Row>
            <Form.Item
                name="manages"
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
                name="handles"
                label="Người thực hiện"
                rules={[
                    {
                        required: true,
                        message: "Chưa chọn người thực hiện",
                    },
                ]}
            >
                <SelectAccount withExt={true} placeholder="Chọn người quản trị"/>
            </Form.Item>
            <Form.Item
                name="participates"
                label="Người theo dõi"
                rules={[
                    {
                        required: true,
                        message: "Chưa chọn người theo dõi",
                    },
                ]}
            >
                <SelectAccount withExt={true} placeholder="Chọn người theo dõi"/>
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
