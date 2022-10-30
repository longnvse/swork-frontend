import React, {useEffect, useState} from 'react';
import {Image, Menu} from "antd";
import logo from "../../../../images/logo.png";
import {Link, useSearchParams} from "react-router-dom";
import {BiBuildings} from "react-icons/bi";
import Sider from "antd/es/layout/Sider";

function CommonSider({children}) {
    const [collapsed, setCollapsed] = useState(false);
    const [searchParams] = useSearchParams();

    useEffect(() => {
        console.log(searchParams.getAll('menu'))
    }, [searchParams]);

    const items = [
        {
            label: <Link to={"/business"}>Công ty/Doanh nghiệp</Link>,
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
                }
            ]
        },
    ]

    return (
        <Sider
            width={250}
            theme={"light"}
            collapsible
            collapsed={collapsed}
            onCollapse={(value) => setCollapsed(value)}
        >
            <div style={{
                margin: 8,
                maxHeight: 64
            }}>
                <Image
                    src={logo}
                    alt={"logo"}
                    className={"app__header--logo"}
                    preview={false}
                />
            </div>
            <div>
                {children}
                <Menu
                    mode="inline"
                    items={items}
                    style={{
                        backgroundColor: 'inherit'
                    }}
                    defaultSelectedKeys={searchParams.getAll("menu")}
                />
            </div>
        </Sider>
    );
}

export default CommonSider;