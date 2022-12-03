import React from "react";
import { Col, Input, Layout, Row } from "antd";
import ProfileIcon from "./profile";
import { IoMdNotificationsOutline } from "react-icons/io";
import { FiSearch } from "react-icons/fi";

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
            <div className="flex items-center justify-between w-full">
                <div className={"text__header pl-4"}>{title}</div>
                <div className="mr-2">
                    <div className="flex items-center">
                        <Input
                            prefix={<FiSearch />}
                            className="mr-4"
                            placeholder="Tìm kiếm"
                        />
                        <div className="app__header--item cursor-pointer flex items-center mr-2">
                            <IoMdNotificationsOutline className="text-white w-6 h-6" />
                        </div>
                        <ProfileIcon />
                    </div>
                </div>
            </div>
        </Header>
    );
}

export default CommonHeader;
