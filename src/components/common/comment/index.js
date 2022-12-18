import React from 'react';
import {Comment} from "@ant-design/compatible";

const SWComment = ({id, content, parentId = 0, classPkId, classPkName}) => {
    return (
        <Comment
            content={content}
        >

        </Comment>
    );
};

SWComment.propTypes = {};

export default SWComment;
