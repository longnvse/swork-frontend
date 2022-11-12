import React from "react";
import { Layout, Spin } from "antd";
import { Outlet } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import CommonHeader from "../components/common/layout/header/Header";
import CommonContent from "../components/common/layout/content/Content";

const RootPage = (props) => {
    const { title, sidebar } = props;
    const { loading } = useSelector((state) => state.commonReducer);
    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

    return (
        <Layout
            style={{
                minHeight: "100vh",
            }}
        >
            {sidebar}
            <Layout>
                <CommonHeader title={title} />
                <CommonContent>
                    <Spin
                        style={{
                            height: "inherit",
                        }}
                        className={"loading"}
                        spinning={loading}
                        indicator={antIcon}
                    >
                        <Outlet />
                    </Spin>
                </CommonContent>
            </Layout>
        </Layout>
    );
};

RootPage.propTypes = {};

export default RootPage;
