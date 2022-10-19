import React, {useState} from 'react';
import {Layout, Menu} from "antd";
import logo from "../../../../images/logo.png";
import {Link} from "react-router-dom";

const {Sider} = Layout

function CommonSider({children}) {
    const [collapsed, setCollapsed] = useState(false);

    const items = [
        {
            label: <Link to={"/business"}>Công ty/Doanh nghiệp</Link>,
            key: "business",
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