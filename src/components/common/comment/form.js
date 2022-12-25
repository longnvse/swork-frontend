import React from 'react';
import {Form} from "antd";
import {addComment, updateComment} from "../../../api/comment";
import {message_error} from "../Constant";
import CommentInput from "./resource/Input";

const CommentForm = ({id, content, onCancelEdit, classPkId, classPkName, parentId = 0, replyRef}) => {
    const [form] = Form.useForm();

    const onFinish = (values) => {
        if (!values.content) {
            return;
        }

        if (!id) {
            addComment({...values, classPkId, classPkName, parentId}).then(() => {
                form.resetFields();
            }).catch(message_error);
        } else {
            updateComment(id, values).then(() => {
                if (typeof onCancelEdit === 'function') {
                    onCancelEdit();
                }
            }).catch(message_error);
        }
    }

    return (
        <Form
            onFinish={onFinish}
            onKeyUp={(event) => {
                if ((event.key === "Escape") && typeof onCancelEdit === "function") {
                    onCancelEdit();
                }
            }}
            form={form}
        >
            <Form.Item
                name={"content"}
                required={true}
                initialValue={content}
            >
                <CommentInput isEdit={!!id} replyRef={replyRef} onCancelEdit={onCancelEdit}/>
            </Form.Item>

        </Form>
    );
};

CommentForm.propTypes = {};

export default CommentForm;
