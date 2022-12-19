import React, {useEffect, useState} from 'react';
import {getCommentPages} from "../../../api/comment";
import {message_error} from "../Constant";
import SWComment from "./index";
import {Comment} from "@ant-design/compatible";
import {Avatar} from "antd";
import CommentForm from "./form";
import {UserOutlined} from "@ant-design/icons";

const CommentList = ({classPkId, classPkName}) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        if (classPkId && classPkName) {
            getCommentPages(classPkId, classPkName).then(res => {
                setData(res.data?.items || []);
            }).catch(message_error)
        }
    }, [classPkId, classPkName]);


    return (
        <>
            <Comment
                className={"w-full"}
                avatar={<Avatar icon={<UserOutlined/>}/>}
                content={
                    <CommentForm classPkId={classPkId} classPkName={classPkName}/>
                }
            />
            {data.map(value => <SWComment {...value} />)}
        </>
    );
};

CommentList.propTypes = {};

export default CommentList;
