import React, {useState} from 'react';
import {Layout, Menu} from "antd";
import logo from "../../../../images/logo.png";

const {Sider} = Layout

function CommonSider({children}) {
    const [collapsed, setCollapsed] = useState(false);

    const items = [
        {
            label: "Dự án",
            key: "project"
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
            <div>
                <img src={logo} alt="logo" className={"app__header--logo"}/>
            </div>
            <div>
                {children}
                <Menu
                    mode="inline"
                    items={items}
                />
            </div>
        </Sider>
    );
}

export default CommonSider;