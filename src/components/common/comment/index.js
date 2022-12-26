import React, {useMemo, useRef, useState} from 'react';
import {Comment} from "@ant-design/compatible";
import {Avatar, Tooltip} from "antd";
import {UserOutlined} from "@ant-design/icons";
import dayjs from "dayjs";
import "dayjs/locale/vi";
import CommentForm from "./form";
import CommentContent from "./resource/content";
import {getMe} from "../../../api/common";

const dayOfWeek = ["Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy", "Chủ Nhật"]
const SWComment = ({id, avatar, content, creatorId, creatorName, date, classPkId, classPkName, comments = []}) => {
    const [reply, setReply] = useState(false);
    const [hiddenActionContent, setHiddenActionContent] = useState(true);
    const replyRef = useRef();

    const dateDiff = useMemo(() => {
        const minutes = dayjs().diff(date, "minutes");
        if (minutes < 1) {
            return "Vừa xong";
        } else if (minutes < 60) {
            return `${minutes} phút`;
        }

        const hours = dayjs().diff(date, "hours");

        if (hours < 24) {
            return `${hours} giờ`;
        }

        const days = dayjs().diff(date, "days");

        if (days < 30) {
            return `${days} ngày`;
        }

        const months = dayjs().diff(date, "months");

        if (months < 12) {
            return `${months} tháng`;
        }

        const years = dayjs().diff(date, "years");

        return `${years} năm`;
    }, [date]);

    const tooltipDate = useMemo(() => {
        const dateTime = dayjs(date);

        return `${dayOfWeek[dateTime.weekday() - 1]}, ${dateTime.day()} Tháng ${dateTime.month() + 1}, ${dateTime.year()} lúc ${dateTime.format("HH:mm")}`
    }, [date]);

    const onClickReply = (e) => {
        setReply(true);
        replyRef.current?.focus();
    }

    const actions = [
        <span className={"ml-3 hover:underline"} onClick={onClickReply}>Trả lời</span>,
        <Tooltip
            placement={"bottom"}
            showArrow={false}
            title={tooltipDate}
        >
            <span className={"hover:underline"}>{dateDiff}</span>
        </Tooltip>
    ];

    const onMouseEnter = (e) => {
        const {accountId, role} = getMe();

        if (accountId === creatorId || role === "Admin") {
            setHiddenActionContent(false);
        }
    }

    const onMouseLeave = (e) => {
        setHiddenActionContent(true);
    }

    return (
        <Comment
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            key={id}
            actions={actions}
            className={"w-full"}
            avatar={<Avatar src={avatar} icon={<UserOutlined/>}/>}
            content={<CommentContent id={id} content={content} replyRef={replyRef} hiddenAction={hiddenActionContent}/>}
            author={creatorName}
        >
            {comments.map((value) => <SWComment {...value} classPkId={classPkId} classPkName={classPkName}/>)}
            {
                reply && <Comment
                    className={"w-full"}
                    avatar={<Avatar icon={<UserOutlined/>}/>}
                    content={
                        <CommentForm
                            replyRef={replyRef}
                            parentId={id}
                            classPkId={classPkId}
                            classPkName={classPkName}/>
                    }
                />}
        </Comment>
    );
};

SWComment.propTypes = {};

export default SWComment;
