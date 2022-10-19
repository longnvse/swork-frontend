import React from 'react';
import {Layout} from "antd";

const {Content} = Layout

function CommonContent({children}) {
    return (
        <Content
            style={{
                margin: '15px',
            }}
        >
            {children}
        </Content>
    );
}

export default CommonContent;