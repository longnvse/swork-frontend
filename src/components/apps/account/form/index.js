import React, {useEffect} from 'react';
import {DatePicker, Form, Input, message} from "antd";
import FormItem from "antd/es/form/FormItem";
import {DATE_FORMAT, message_error} from "../../../common/Constant";
import {addAccount, getAccount, updateAccount} from "../../../../api/account/api";

const AccountForm = ({id}) => {
    const [form] = Form.useForm();
    useEffect(() => {
        if (id) {
            getAccount(id).then(response => {
                form.setFieldsValue(response.data);
            })
        }
    }, [id]);


    const onFinish = (values) => {
        if (!id) {
            addAccount(values).then(response => {
                message.success("Tạo mới thành công!");
                form.resetFields();
            }).catch(message_error)
        } else {
            updateAccount(id, values).then(response => {
                message.success("Cập nhật thành công!");
            }).catch(message_error)
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
                id={"account-form"}
            >
                <FormItem
                    name={"fullName"}
                    label={"Họ và tên"}
                >
                    <Input placeholder={"Nguyễn Văn A"}/>
                </FormItem>
                <FormItem
                    name={"dateOfBirth"}
                    label={"Ngày sinh"}
                >
                    <DatePicker placeholder={"25-06-2000"} format={DATE_FORMAT}/>
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
                            type: 'string',
                            pattern: /^[\\+]?[(]?[0-9]{3}[)]?[-\\s\\.]?[0-9]{3}[-\\s\\.]?[0-9]{4,5}$/im,
                            message: 'Sai định dạng số điện thoại!'
                        }
                    ]}
                >
                    <Input placeholder={"012345678"}/>
                </FormItem>
                <FormItem
                    name={"address"}
                    label={"Địa chỉ"}
                >
                    <Input placeholder={"Số 1 Ngách 2 Phường Tân Xã Huyện Thạch Thất "}/>
                </FormItem>
            </Form>
        </>
    );
};

export default AccountForm;
