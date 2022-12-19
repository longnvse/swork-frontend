import React from 'react';
import {Form, Input, message} from "antd";
import {addComment} from "../../../api/comment";
import {message_error} from "../Constant";

const CommentForm = ({classPkId, classPkName}) => {
    const [form] = Form.useForm();

    const onFinish = (values) => {
        addComment({...values, classPkId, classPkName}).then(res => {
            message.success("Thành công!");
        }).catch(message_error);
    }

    return (
        <Form
            onFinish={onFinish}
            form={form}
        >
            <Form.Item
                name={"content"}
                required={true}
            >
                <Input
                    onEnter={() => {
                        form.submit();
                    }}
                />
            </Form.Item>
        </Form>
    );
};

CommentForm.propTypes = {};

export default CommentForm;
