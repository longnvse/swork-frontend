import React from 'react';
import {Layout} from "antd";
import CommonHeader from "./header/Header";
import CommonSider from "./sider/Sider";
import CommonContent from "./content/Content";

function Dashboard(props) {
    return (
        <Layout
            style={{
                minHeight: '100vh',
            }}
        >
            <CommonSider/>
            <Layout>
                <CommonHeader/>
                <CommonContent/>
            </Layout>
        </Layout>
    );
}

export default Dashboard;