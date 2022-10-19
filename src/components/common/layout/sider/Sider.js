import React from 'react';
import {Layout} from "antd";
import logo from "../../../../images/logo.png";

const {Sider} = Layout

function CommonSider({children}) {
    return (
        <Sider
            width={250}
            theme={"light"}
        >
            <div>
                <img src={logo} alt="logo" className={"app__header--logo"}/>
            </div>
            <div>
                {children}
            </div>
        </Sider>
    );
}

export default CommonSider;