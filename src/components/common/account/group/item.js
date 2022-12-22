import React from 'react';
import {Avatar, Col, Row, Tooltip} from "antd";
import {HomeOutlined, PhoneOutlined, UserOutlined} from "@ant-design/icons";
import dayjs from "dayjs";
import {DATE_FORMAT} from "../../Constant";

const AccountGroupItem = ({avatar, fullName, departmentName, username, phoneNumber}) => {

    const title = (
        <Row gutter={12} className={"items-center justify-between p-2"}>
            <Col>
                <Avatar
                    src={avatar}
                    icon={<UserOutlined/>}
                />
            </Col>
            <Col className={"justify-evenly w-fit"}>
                <Row className={"text-black font-bold"}>{fullName}</Row>
                {departmentName &&
                    <Row className={"text-black text-[12px] w-fit"}><HomeOutlined className={"mr-2"}/> {departmentName}
                    </Row>}
                {username &&
                    <Row className={"text-black text-[12px] w-fit"}><HomeOutlined
                        className={"mr-2"}/> {dayjs(username).format(DATE_FORMAT)}</Row>}
                {phoneNumber &&
                    <Row className={"text-black text-[12px] w-fit"}><PhoneOutlined className={"mr-2"}/> {phoneNumber}
                    </Row>}
            </Col>
        </Row>
    )

    return (
        <Tooltip
            className={"w-fit max-w-full"}
            placement={"top"}
            color={"white"}
            title={title}
        >
            <Avatar
                src={avatar}
                icon={<UserOutlined/>}
            />
        </Tooltip>
    );
};

AccountGroupItem.propTypes = {};

export default AccountGroupItem;
