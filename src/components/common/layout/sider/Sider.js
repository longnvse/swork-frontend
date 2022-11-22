import React, {useState} from 'react';
import {Image, Menu} from "antd";
import logo from "../../../../images/logo.png";
import Sider from "antd/es/layout/Sider";
import {SiderByPermission} from "../../sider";
import {useSearchParams} from "react-router-dom";

function CommonSider({role, children}) {
    const [collapsed, setCollapsed] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();

    const onOpenChange = (openKey) => {
        if (!openKey[0]) {
            searchParams.delete("open");
            setSearchParams(searchParams, {replace: true});
            return;
        }
        searchParams.set("open", openKey[0] || "");
        setSearchParams(searchParams, {replace: true});
    }

    console.log(searchParams.toString());

    const onSelect = ({key}) => {
        searchParams.set("menu", key);
        setSearchParams(searchParams, {replace: true});
    }

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
                    items={SiderByPermission[role] || []}
                    style={{
                        backgroundColor: 'inherit'
                    }}
                    // onSelect={onSelect}
                    onOpenChange={onOpenChange}
                    defaultOpenKeys={searchParams.getAll("open")}
                    defaultSelectedKeys={searchParams.getAll("menu")}
                />
            </div>
        </Sider>
    );
}

export default CommonSider;