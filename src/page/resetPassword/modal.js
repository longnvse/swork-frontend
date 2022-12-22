import React from "react";
import { Modal, Form, Input, message } from "antd";
import { message_error } from "../../components/common/Constant";
import { patchAccountInfo } from "../../api/account/api";

const ModalChangePassword = ({ open, setOpen, onCancel }) => {
    const [form] = Form.useForm();

    const onFinish = (values) => {
        patchAccountInfo(values)
            .then(() => {
                setOpen(false);
                form.resetFields();
                message.success("Thay đổi mật khẩu thành công!");
            })
            .catch(message_error);
    };

    return (
        <Modal
            title="Thay đổi mật khẩu"
            open={open}
            onCancel={onCancel}
            destroyOnClose
            bodyStyle={{ padding: "20px 0" }}
            onOk={() => {
                form.submit();
            }}
        >
            <Form form={form} layout="vertical" onFinish={onFinish}>
                <Form.Item name="oldPassword" label="Mật khẩu cũ">
                    <Input.Password placeholder="Mật khẩu cũ" />
                </Form.Item>
                <Form.Item name="newPassword" label="Mật khẩu mới">
                    <Input.Password placeholder="Mật khẩu mới" />
                </Form.Item>
                <Form.Item name="newPasswordRepeat" label="Xác nhận mật khẩu">
                    <Input.Password placeholder="Xác nhận mật khẩu" />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default ModalChangePassword;
