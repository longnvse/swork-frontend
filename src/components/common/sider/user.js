import {Link} from "react-router-dom";
import {BiBuildings} from "react-icons/bi";
import React from "react";
import {MdWorkOutline} from "react-icons/md";

export const UserSider = [
    {
        label: "Dự án",
        key: "project",
        icon: <BiBuildings style={{fontSize: 20}}/>,
        children: [
            {
                label: <Link to={"/project/all"}>Tất cả</Link>,
                key: "project-all",
                icon: <BiBuildings style={{fontSize: 20}}/>
            },
            {
                label: <Link to={"/project/assign"}>Bạn thực hiện</Link>,
                key: "project-assign",
                icon: <BiBuildings style={{fontSize: 20}}/>
            },
            {
                label: <Link to={"/project/manage"}>Bạn quản trị</Link>,
                key: "project-manage",
                icon: <BiBuildings style={{fontSize: 20}}/>
            },
            {
                label: <Link to={"/project/follow"}>Bạn theo dõi</Link>,
                key: "project-follow",
                icon: <BiBuildings style={{fontSize: 20}}/>
            },
        ]
    },
    {
        label: "Công việc",
        key: "work",
        icon: <MdWorkOutline style={{fontSize: 20}}/>,
        children: [
            {
                label: <Link to={"/work/all"}>Tất cả</Link>,
                key: "work-all",
                icon: <BiBuildings style={{fontSize: 20}}/>
            },
            {
                label: <Link to={"/work/assign"}>Bạn được giao</Link>,
                key: "work-assign",
                icon: <BiBuildings style={{fontSize: 20}}/>
            },
            {
                label: <Link to={"/work/manage"}>Bạn đã giao</Link>,
                key: "work-manage",
                icon: <BiBuildings style={{fontSize: 20}}/>
            },
            {
                label: <Link to={"/work/follow"}>Bạn theo dõi</Link>,
                key: "work-follow",
                icon: <BiBuildings style={{fontSize: 20}}/>
            },
            {
                label: <Link to={"/work/department"}>Phòng ban của bạn</Link>,
                key: "work-department",
                icon: <BiBuildings style={{fontSize: 20}}/>
            }
        ]
    },
];
