import React from "react";
import { Col, Layout, Row } from "antd";
import ProfileIcon from "./profile";
import { IoMdNotificationsOutline } from "react-icons/io";

const { Header } = Layout;

function CommonHeader(props) {
    const { title } = props;
    return (
        <Header
            className={"flex flex-row justify-between items-center"}
            style={{
                background: "#57AAE5FF",
                padding: 0,
                borderLeft: "1px solid inherit",
            }}
        >
            <Col>
                <div className={"text__header pl-4"}>{title}</div>
            </Col>
            <Col style={{ paddingRight: 4 }}>
                <Row className="flex items-center">
                    <div className="cursor-pointer flex items-center mr-2">
                        <IoMdNotificationsOutline className="text-white w-6 h-6" />
                    </div>
                    <ProfileIcon />
                </Row>
            </Col>
        </Header>
    );
}

export default CommonHeader;
