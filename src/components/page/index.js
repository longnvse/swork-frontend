import React from 'react';
import CommonSider from "../common/layout/sider/Sider";
import {Layout, Spin} from "antd";
import CommonHeader from "../common/layout/header/Header";
import CommonContent from "../common/layout/content/Content";
import {Outlet} from "react-router-dom";
import {LoadingOutlined} from "@ant-design/icons";
import {useSelector} from "react-redux";

const RootPage = props => {
    // const {loading} = useSelector(state => state.axiosReducer)
    const antIcon = <LoadingOutlined style={{fontSize: 24}} spin/>


    return (
        <Layout
            style={{
                minHeight: '100vh',
            }}
        >
            <CommonSider/>
            <Layout>
                <CommonHeader/>
                <CommonContent>
                    <Spin spinning={false} indicator={antIcon}>
                        <Outlet/>
                    </Spin>
                </CommonContent>
            </Layout>
        </Layout>
    );
};

RootPage.propTypes = {};

export default RootPage;
