import React, {useEffect, useState} from 'react';
import {Image, Menu} from "antd";
import logo from "../../../../images/logo.png";
import {Link, useSearchParams} from "react-router-dom";
import {BiBuildings} from "react-icons/bi";
import Sider from "antd/es/layout/Sider";
import {URIS} from "../../../../utils/constant";
import {ApartmentOutlined, UserOutlined} from "@ant-design/icons";

function CommonSider({children}) {
    const [collapsed, setCollapsed] = useState(false);
    const [searchParams] = useSearchParams();

    useEffect(() => {
        console.log(searchParams.getAll('menu'))
    }, [searchParams]);

    const items = [
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
                }
            ]
        },
        {
            label: <Link to={URIS.DEPARTMENT}>Quản lý phòng ban</Link>,
            key: "department",
            icon: <ApartmentOutlined style={{fontSize: 20}}/>
        },
        {
            label: <Link to={URIS.ACCOUNT}>Quản lý tài khoản</Link>,
            key: "account",
            icon: <UserOutlined style={{fontSize: 20}}/>
        }
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
            }} className={"flex items-center justify-center"}>
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
                />
            </div>
        </Sider>
    );
}

export default CommonSider;