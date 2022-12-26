import React, {useEffect, useState} from 'react';
import {getCommentPages} from "../../../api/comment";
import {message_error} from "../Constant";
import SWComment from "./index";
import {Comment} from "@ant-design/compatible";
import {Avatar} from "antd";
import CommentForm from "./form";
import {UserOutlined} from "@ant-design/icons";
import {useSelector} from "react-redux";

const CommentList = ({classPkId, classPkName}) => {
    const [data, setData] = useState([]);
    const {reload, avatar} = useSelector(state => state.commonReducer);
    useEffect(() => {
        if ((classPkId && classPkName) || reload) {
            getCommentPages(classPkId, classPkName).then(res => {
                setData(res.data?.items || []);
            }).catch(message_error)
        }
    }, [classPkId, classPkName, reload]);


    return (
        <>
            <Comment
                className={"w-full"}
                avatar={<Avatar src={avatar} icon={<UserOutlined/>}/>}
                content={
                    <CommentForm classPkId={classPkId} classPkName={classPkName}/>
                }
            />
            {data.map(value => <SWComment {...value} classPkId={classPkId} classPkName={classPkName}/>)}
        </>
    );
};

CommentList.propTypes = {};

export default CommentList;
