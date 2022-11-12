import React, {useEffect} from 'react';
import {Form, Input, message} from "antd";
import FormItem from "antd/es/form/FormItem";
import {addDepartment, getDepartment, updateDepartment} from "../../../../api/department/api";
import SelectAccount from "../../../common/select/account";

const DepartmentForm = ({id}) => {
    const [form] = Form.useForm();

    useEffect(() => {
        if (id) {
            getDepartment(id).then(response => {
                form.setFieldsValue(response.data);
            })
        }
    }, [id]);


    const onFinish = (values) => {
        if (!id) {
            addDepartment(values).then(response => {
                message.success("Tạo mới thành công!");
                form.resetFields();
            }).catch(error => {
                console.log(error)
                message.error(error?.response?.data?.detail || "Đã xảy ra lỗi, vui lòng thử lại!");
            })
        } else {
            updateDepartment(id, values).then(response => {
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
                id={"department-form"}
            >
                <FormItem
                    name={"name"}
                    label={"Tên phòng ban"}
                    rules={[
                        {
                            required: true,
                            message: "Vui lòng nhập tên phòng ban"
                        }
                    ]}
                >
                    <Input placeholder={"Phòng hành chính"}/>
                </FormItem>
                <FormItem
                    name={"accounts"}
                    label={"Thành viên"}
                >
                    <SelectAccount placeholder={"Chọn thành viên"}/>
                </FormItem>
            </Form>
        </>
    );
};

DepartmentForm.propTypes = {};

export default DepartmentForm;
