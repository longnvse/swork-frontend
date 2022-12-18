import React from 'react';
import {Comment} from "@ant-design/compatible";
import {Avatar} from "antd";

const SWComment = ({id, content, creatorName, classPkId, classPkName, comments = []}) => {
    return (
        <Comment
            avatar={<Avatar/>}
            content={content}
            author={creatorName}
        >
            {comments.map((value) => <SWComment {...value} classPkId={classPkId} classPkName={classPkName}/>)}
        </Comment>
    );
};

SWComment.propTypes = {};

export default SWComment;
