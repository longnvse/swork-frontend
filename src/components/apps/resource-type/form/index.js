import React, {useEffect} from 'react';
import {Form, Input, message} from "antd";
import FormItem from "antd/es/form/FormItem";
import {addResourceType, getResourceType, updateResourceType} from "../../../../api/resource/resource-type";
import ResourceTypeTree from "../tree";

const ResourceTypeForm = ({id}) => {
    const [form] = Form.useForm();

    useEffect(() => {
        if (id) {
            getResourceType(id).then(response => {
                form.setFieldsValue({...response.data, parentId: response.data.parentId || undefined});
            })
        }
    }, [id]);


    const onFinish = (values) => {
        if (!id) {
            addResourceType(values).then(response => {
                message.success("Tạo mới thành công!");
                form.resetFields();
            }).catch(error => {
                console.log(error)
                message.error(error?.response?.data?.detail || "Đã xảy ra lỗi, vui lòng thử lại!");
            })
        } else {
            updateResourceType(id, values).then(response => {
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
                id={"resource-type-form"}
            >
                <FormItem
                    name={"parentId"}
                    label={"Tài nguyên cha"}
                >
                    <ResourceTypeTree placeholder={"Chọn tài nguyên cha"}/>
                </FormItem>
                <FormItem
                    name={"name"}
                    label={"Tên tài nguyên"}
                    rules={[
                        {
                            required: true,
                            message: "Vui lòng nhập tên tài nguyên"
                        }
                    ]}
                >
                    <Input placeholder={"Cát"}/>
                </FormItem>
                <FormItem
                    name={"unit"}
                    label={"Đơn vị"}
                >
                    <Input placeholder={"Khối"}/>
                </FormItem>
            </Form>
        </>
    );
};

export default ResourceTypeForm;
