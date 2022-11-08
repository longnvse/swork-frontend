import React from 'react';
import {Col, Layout} from "antd";
import ProfileIcon from "./profile";

const {Header} = Layout

function CommonHeader() {
    return (
        <Header
            className={"flex flex-row justify-between items-center"}
            style={{
                background: '#57AAE5FF',
                padding: 0,
                borderLeft: '1px solid inherit',
            }}>
            <Col>
                <div className={"text__header pl-4"}>Danh sách công ty</div>
            </Col>
            <Col style={{paddingRight: 4}}>
                <ProfileIcon/>
            </Col>
        </Header>
    );
}

export default CommonHeader;