import React, {useEffect} from 'react';
import {Form, Input, message, Select} from "antd";
import FormItem from "antd/es/form/FormItem";
import {addTeam, getTeam, updateTeam} from "../../../../api/team";
import SelectAccount from "../../../common/select/account";
import {message_error} from "../../../common/Constant";

const TeamForm = ({projectId, phaseId, id}) => {
    const [form] = Form.useForm();

    useEffect(() => {
        if (id) {
            getTeam(id).then(response => {
                form.setFieldsValue(response.data);
            })
        }
    }, [id]);

    const onFinish = (values) => {
        values.projectId = projectId;
        values.phaseId = phaseId;

        if (!id) {
            addTeam(values).then(response => {
                message.success("Tạo mới thành công!");
                form.resetFields();
            }).catch(message_error)
        } else {
            updateTeam(id, values).then(response => {
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
                id={"team-form"}
            >
                <FormItem
                    name={"name"}
                    label={"Tên đội nhóm"}
                    rules={[
                        {
                            required: true,
                            message: "Vui lòng nhập tên đội nhóm"
                        }
                    ]}
                >
                    <Input placeholder={"Đội A"}/>
                </FormItem>
                <FormItem
                    name={"isActive"}
                    label={"Trạng thái"}
                    initialValue={true}
                >
                    <Select options={[
                        {label: "Hoạt động", value: true},
                        {label: "Dừng hoạt động", value: false}
                    ]}/>
                </FormItem>

                <FormItem
                    name={"admins"}
                    label={"Quản trị nhóm"}
                >
                    <SelectAccount/>
                </FormItem>
                <FormItem
                    name={"members"}
                    label={"Thành viên"}
                >
                    <SelectAccount/>
                </FormItem>
                <Form.Item name="description" label="Mô tả">
                    <Input.TextArea placeholder="Nhập mô tả"/>
                </Form.Item>
            </Form>
        </>
    );
};

TeamForm.propTypes = {};

export default TeamForm;
