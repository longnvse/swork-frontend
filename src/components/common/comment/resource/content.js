import React, {useState} from 'react';
import {EllipsisOutlined} from "@ant-design/icons";
import {Button, Col, Dropdown, Modal, Row} from "antd";
import CommentForm from "../form";
import {message_error} from "../../Constant";
import {deleteComment} from "../../../../api/comment";

const CommentContent = ({id, content, replyRef, hiddenAction = true}) => {
    const [action, setAction] = useState(undefined);

    const onCancelEdit = () => {
        setAction(undefined);
    }

    const openModalDelete = () => {
        Modal.confirm({
            title: <p style={{
                borderBottom: '1px solid #cccccc66'
            }} className={"flex justify-center pb-[16px]"}>Xoá bình luận?</p>,
            content: "Bạn có chắc chắn muốn xoá bình luận này không?",
            icon: null,
            cancelText: "Không",
            okText: "Xoá",
            closable: true,
            maskClosable: true,
            keyboard: true,
            onOk: onDeleteComment
        })
    }

    const onDeleteComment = () => {
        deleteComment(id).catch(message_error)
    }

    return (
        <Row className={"items-center"} gutter={4}>
            <Col>
                {action !== "edit" &&
                    <p className={"bg-[#cccccc66] rounded-2xl p-2 px-4 w-fit max-w-full"}>{content}</p>}
                {action === "edit" &&
                    <>
                        <CommentForm id={id} content={content} replyRef={replyRef} onCancelEdit={onCancelEdit}/>
                    </>
                }
            </Col>
            {!hiddenAction && action !== "edit" && <Col>
                <Dropdown
                    menu={{
                        items: [
                            {
                                key: "edit",
                                label: "Chỉnh sửa"
                            },
                            {
                                key: "delete",
                                label: "Xoá"
                            }
                        ],
                        onClick: ({key}) => {
                            if (key === "edit") {
                                setAction(key);
                                return;
                            }

                            if (key === "delete") {
                                openModalDelete();
                            }
                        }
                    }}
                    trigger={["click"]}
                >
                    <Button type={"text"}
                            className={"hover:rounded-2xl"}
                            icon={<EllipsisOutlined style={{fontSize: 20}}/>}
                    />
                </Dropdown>
            </Col>}
        </Row>
    );
};

export default CommentContent;
