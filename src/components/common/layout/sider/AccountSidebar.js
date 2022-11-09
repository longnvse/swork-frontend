import React, { useEffect, useState } from "react";
import { Image, Menu } from "antd";
import logo from "../../../../images/logo.png";
import { Link, useSearchParams } from "react-router-dom";
import { VscAccount } from "react-icons/vsc";
import { RiGitRepositoryPrivateLine } from "react-icons/ri";
import Sider from "antd/es/layout/Sider";
import { URIS } from "../../../../utils/constant";

function AccountSidebar({ children }) {
    const [collapsed, setCollapsed] = useState(false);
    const [searchParams] = useSearchParams();

    useEffect(() => {
        console.log(searchParams.getAll("menu"));
    }, [searchParams]);

    const items = [
        {
            label: <Link to={URIS.ACCOUNT_INFO}>Thông tin cá nhân</Link>,
            key: "account-info",
            icon: <VscAccount style={{ fontSize: 20 }} />,
        },
        {
            label: <Link to={URIS.ACCOUNT_SERCURITY}>Bảo mật</Link>,
            key: "account-sercurity",
            icon: <RiGitRepositoryPrivateLine style={{ fontSize: 20 }} />,
        },
    ];

    return (
        <Sider
            width={250}
            theme={"light"}
            collapsible
            collapsed={collapsed}
            onCollapse={(value) => setCollapsed(value)}
        >
            <div
                style={{
                    margin: 8,
                    maxHeight: 64,
                }}
                className={"flex items-center justify-center"}
            >
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
                        backgroundColor: "inherit",
                    }}
                    defaultSelectedKeys={searchParams.getAll("menu")}
                />
            </div>
        </Sider>
    );
}

export default AccountSidebar;
