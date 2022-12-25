import {Link} from "react-router-dom";
import {URIS} from "../../../utils/constant";
import {ApartmentOutlined, UserOutlined} from "@ant-design/icons";
import React from "react";
import {BiBuildings} from "react-icons/bi";
import {MdWorkOutline} from "react-icons/md";

export const AdminSider = [
    {
        label: <Link to={URIS.DEPARTMENT}>Quản lý phòng ban</Link>,
        key: "department",
        icon: <ApartmentOutlined style={{fontSize: 20}}/>
    },
    {
        label: <Link to={URIS.ACCOUNT}>Quản lý tài khoản</Link>,
        key: "account",
        icon: <UserOutlined style={{fontSize: 20}}/>
    },
    {
        label: <Link to={"/project"}>Dự án</Link>,
        key: "project",
        icon: <BiBuildings style={{fontSize: 20}}/>,
    },
    {
        label: <Link to={"/work"}>Công việc</Link>,
        key: "work",
        icon: <MdWorkOutline style={{fontSize: 20}}/>,
    },
]