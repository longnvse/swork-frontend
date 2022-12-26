import React, {useEffect} from 'react';
import {Input} from "antd";

const CommentInput = ({isEdit, onChange, value, replyRef, onCancelEdit}) => {

    const onClickCancelEdit = () => {
        if (typeof onCancelEdit === "function") {
            onCancelEdit();
        }
    }

    useEffect(() => {
        if (replyRef?.current) {
            replyRef.current?.focus();
        }
    }, [isEdit, replyRef]);


    return (
        <>
            <Input
                ref={replyRef}
                onChange={onChange}
                value={value}
                className={"p-2 px-4"}
                placeholder={"Thảo luận..."}
            />
            {isEdit && <span style={{fontSize: 12}}>
                Nhấn Esc để <a href={"#"} onClick={onClickCancelEdit} className={"hover:underline"}>Huỷ</a>
            </span>}
        </>
    );
};

export default CommentInput;
