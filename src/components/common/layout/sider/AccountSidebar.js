import {Image, Menu} from "antd";
import Sider from "antd/es/layout/Sider";
import React, {useState} from "react";
import {RiGitRepositoryPrivateLine} from "react-icons/ri";
import {VscAccount} from "react-icons/vsc";
import {Link, useLocation} from "react-router-dom";
import logo from "../../../../images/logo.png";
import {URIS} from "../../../../utils/constant";

function AccountSidebar({ children }) {
    const [collapsed, setCollapsed] = useState(false);
    const location = useLocation();

    const items = [
        {
            label: <Link to={URIS.ACCOUNT_INFO}>Thông tin cá nhân</Link>,
            key: URIS.ACCOUNT_INFO,
            icon: <VscAccount style={{ fontSize: 20 }} />,
        },
        {
            label: <Link to={URIS.ACCOUNT_SECURITY}>Bảo mật</Link>,
            key: URIS.ACCOUNT_SECURITY,
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
                    defaultSelectedKeys={location.pathname}
                />
            </div>
        </Sider>
    );
}

export default AccountSidebar;
