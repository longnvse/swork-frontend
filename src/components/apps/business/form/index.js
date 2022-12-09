import React, {useEffect} from 'react';
import {Form, Input, message} from "antd";
import {addBusiness, getBusiness, updateBusiness} from "../../../../api/business/api";
import FormItem from "antd/es/form/FormItem";

const BusinessForm = ({id}) => {
    const [form] = Form.useForm();
    useEffect(() => {
        if (id) {
            getBusiness(id).then(response => {
                form.setFieldsValue(response.data);
            })
        }
    }, [id]);


    const onFinish = (values) => {
        if (!id) {
            addBusiness(values).then(response => {
                message.success("Tạo mới thành công!");
                form.resetFields();
            }).catch(error => {
                console.log(error)
                message.error(error?.response?.data?.detail || "Đã xảy ra lỗi, vui lòng thử lại!");
            })
        } else {
            updateBusiness(id, values).then(response => {
                message.success("Cập nhật thành công!");
            }).catch(error => {
                console.log(error)
                message.error(error?.response?.data?.detail || "Đã xảy ra lỗi, vui lòng thử lại!");
            })
        }

    }

    return (
        <>
            <Form
                onFinish={onFinish}
                layout={"vertical"}
                form={form}
                style={{
                    width: "100%"
                }}
                id={"business-form"}
            >
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
                <FormItem
                    name={"customerName"}
                    label={"Tên Khách hàng"}
                >
                    <Input placeholder={"Nguyễn Văn A"}/>
                </FormItem>
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
                            pattern: /^[\\+]?[(]?[0-9]{3}[)]?[-\\s\\.]?[0-9]{3}[-\\s\\.]?[0-9]{4}$/im,
                            message: 'Sai định dạng số điện thoại!'
                        }
                    ]}
                >
                    <Input placeholder={"012345678"}/>
                </FormItem>
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
            </Form>
        </>
    );
};

export default BusinessForm;
