import React from 'react';
import {Layout} from "antd";

const {Header} = Layout

function CommonHeader({children}) {
    return (
        <Header className={"bg-orange-600"}>
            {children}
        </Header>
    );
}

export default CommonHeader;