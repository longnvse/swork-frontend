import {BiBuildings} from "react-icons/bi";
import {Link} from "react-router-dom";
import React from "react";

export const SuperAdminSider = [
    {
        label: "Công ty/Doanh nghiệp",
        key: "business",
        icon: <BiBuildings style={{fontSize: 20}}/>,
        children: [
            {
                label: <Link to={{pathname: "/business", search: "status=all"}}>Tất cả</Link>,
                key: "business-all",
                icon: <BiBuildings/>,
            },
            {
                label: <Link to={{pathname: "/business", search: "status=active"}}>Đang hoạt động</Link>,
                key: "business-active",
                icon: <BiBuildings/>,
            },
            {
                label: <Link to={{pathname: "/business", search: "status=inactive"}}>Dừng hoạt động</Link>,
                key: "business-inactive",
                icon: <BiBuildings/>,
            }
        ]
    }
]