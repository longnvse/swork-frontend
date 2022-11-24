import { Link } from "react-router-dom";
import { BiBuildings } from "react-icons/bi";
import React from "react";
import { MdWorkOutline } from "react-icons/md";

export const UserSider = [
    {
        label: <Link to={"/project"}>Dự án</Link>,
        key: "project",
        icon: <BiBuildings style={{ fontSize: 20 }} />,
    },
    {
        label: <Link to={"/work"}>Công việc</Link>,
        key: "work",
        icon: <MdWorkOutline style={{ fontSize: 20 }} />,
    },
    {
        label: <Link to={"/phase"}>Giai đoạn</Link>,
        key: "phase",
        icon: <BiBuildings style={{ fontSize: 20 }} />,
    },
];
