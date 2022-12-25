import React, {useMemo, useState} from 'react';
import {Image, Menu} from "antd";
import logo from "../../../../images/logo.png";
import Sider from "antd/es/layout/Sider";
import {SiderByPermission} from "../../sider";

function CommonSider({role, children}) {
    const [collapsed, setCollapsed] = useState(false);

    const getDefaultOpenKeys = useMemo(() => window.location.pathname.split("/").filter(value => {
        if (!value) {
            return false;
        }

        if (!Number(value)) {
            return true;
        }
    }), []);

    const getDefaultSelectedKeys = useMemo(() => {
        return window.location.pathname.split("/").filter(value => {
            if (!value) {
                return false;
            }

            if (!Number(value)) {
                return true;
            }
        }).join("-");
    }, [])

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
                    defaultOpenKeys={getDefaultOpenKeys}
                    defaultSelectedKeys={[...getDefaultOpenKeys, getDefaultSelectedKeys]}
                />
            </div>
        </Sider>
    );
}

export default CommonSider;