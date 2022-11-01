import React, {useCallback, useEffect} from 'react';
import {Button, Col, Form, Input, message, Row, Typography} from "antd";
import {addBusiness, getBusiness, updateBusiness} from "../../../../api/business/api";
import FormItem from "antd/es/form/FormItem";
import {useNavigate, useParams} from "react-router-dom";

const BusinessForm = props => {
    const navigate = useNavigate();
    const {id} = useParams();
    const [form] = Form.useForm();

    useEffect(() => {
        if (id) {
            getBusiness(id).then(response => {
                form.setFieldsValue(response.data);
            })
        }
    }, [id]);


    const onFinish = (values) => {
        if(!id){
            addBusiness(values).then(response => {
                message.success("Tạo mới thành công!");
                form.resetFields();
            }).catch(error => {
                console.log(error)
                message.error(error?.response?.data?.detail || "Đã xảy ra lỗi, vui lòng thử lại!");
            })
        } else{
            updateBusiness(id, values).then(response => {
                message.success("Cập nhật thành công!");
                navigate("/business")
            }).catch(error => {
                console.log(error)
                message.error(error?.response?.data?.detail || "Đã xảy ra lỗi, vui lòng thử lại!");
            })
        }

    }

    const title = useCallback(
        () => {
            if (id) {
                return "Cập nhật Công ty/Doanh nghiệp";
            }

            return "Thêm Công ty/Doanh nghiệp";
        },
        [id]);


    return (
        <>
            <Typography.Title style={{fontSize: 18, marginBottom: 8}}>{title}</Typography.Title>
            <Form
                onFinish={onFinish}
                layout={"vertical"}
                style={{width: '70%'}}
                form={form}
            >
                <Row gutter={12}>
                    <Col span={12}>
                        <FormItem
                            name={"name"}
                            label={"Tên Công ty/Doanh nghiệp"}
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng nhập tên Công ty/Doanh nghiệp"
                                }
                            ]}
                        >
                            <Input placeholder={"Công ty TNHH Thạch Thất"}/>
                        </FormItem>
                    </Col>
                    <Col span={12}>
                        <FormItem
                            name={"customerName"}
                            label={"Tên Khách hàng"}
                        >
                            <Input placeholder={"Nguyễn Văn A"}/>
                        </FormItem>
                    </Col>
                </Row>
                <Row gutter={12}>
                    <Col span={12}>
                        <FormItem
                            name={"email"}
                            label={"Email"}
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng nhập email!"
                                },
                                {
                                    type: "email",
                                    message: "Sai định dạng Email!"
                                }
                            ]}
                        >
                            <Input placeholder={"abc@abc.com"}/>
                        </FormItem>
                    </Col>
                    <Col span={12}>
                        <FormItem
                            name={"phoneNumber"}
                            label={"Số điện thoại"}
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng nhập số điện thoại!"
                                },
                                {
                                    type: 'string',
                                    pattern: /^[\\+]?[(]?[0-9]{3}[)]?[-\\s\\.]?[0-9]{3}[-\\s\\.]?[0-9]{4,5}$/im,
                                    message: 'Sai định dạng số điện thoại!'
                                }
                            ]}
                        >
                            <Input placeholder={"012345678"}/>
                        </FormItem>
                    </Col>
                </Row>
                <Row gutter={12}>
                    <Col span={12}>
                        <FormItem
                            name={"businessAddress"}
                            label={"Địa chỉ Công ty/Doanh nghiệp"}
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng nhập địa chỉ!"
                                }
                            ]}
                        >
                            <Input placeholder={"Số 1 Ngách 2 Phường Tân Xã Huyện Thạch Thất "}/>
                        </FormItem>
                    </Col>
                    <Col span={12}>
                        <FormItem
                            name={"fieldOperations"}
                            label={"Lĩnh vực hoạt động"}
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng nhập lĩnh vực hoạt động!"
                                }
                            ]}
                        >
                            <Input placeholder={"Công nghệ"}/>
                        </FormItem>
                    </Col>
                </Row>
                <Row gutter={12}>
                    <Col>
                        <Button htmlType="submit">{`${id ? "Cập nhật" : "Thêm mới"}`}</Button>
                    </Col>
                    <Col>
                        <Button onClick={() => navigate("/business")}>Hủy</Button>
                    </Col>
                </Row>
            </Form>
        </>
    );
};

export default BusinessForm;
