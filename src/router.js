import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import BusinessRouter from "./components/apps/business/router";
import Dashboard from "./components/common/layout";
import SignUpPage from "./page/signup";
import {URIS} from "./utils/constant";
import ResetPasswordPage from "./page/resetPassword";
import CommonSider from "./components/common/layout/sider/Sider";
import AccountSidebar from "./components/common/layout/sider/AccountSidebar";
import AccountInfo from "./page/accountInfo";
import AccountSecurity from "./page/accountSecurity";
import LandingPage from "./page/landingPage";
import DepartmentRouter from "./components/apps/department/router";
import AccountRouter from "./components/apps/account/router";
import LoginPage from "./page/login";
import RootPage from "./page";
import ProjectRouter from "./components/apps/project/router";
import {Button, Result} from "antd";

const Routers = (props) => {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<LandingPage/>}/>
                <Route
                    element={
                        <RootPage
                            title="Danh sách công ty"
                            sidebar={<CommonSider/>}
                        />
                    }
                >
                    <Route path={URIS.BUSINESS} element={<BusinessRouter/>}/>
                    <Route path={URIS.DEPARTMENT} element={<DepartmentRouter/>}/>
                    <Route path={URIS.ACCOUNT} element={<AccountRouter/>}/>
                    <Route path={URIS.DASHBOARD} element={<Dashboard/>}/>
                    <Route path={URIS.PROJECT} element={<ProjectRouter/>}/>
                </Route>
                <Route path={URIS.LOGIN} element={<LoginPage/>}/>
                <Route path={URIS.SIGN_UP} element={<SignUpPage/>}/>
                <Route
                    path={URIS.RESET_PASSWORD}
                    element={<ResetPasswordPage/>}
                />
                <Route
                    element={
                        <RootPage
                            title="Cài đặt tài khoản"
                            sidebar={<AccountSidebar/>}
                        />
                    }
                >
                    <Route path={URIS.ACCOUNT_INFO} element={<AccountInfo/>}/>
                    <Route
                        path={URIS.ACCOUNT_SECURITY}
                        element={<AccountSecurity/>}
                    />
                    <Route path={URIS.DASHBOARD} element={<Dashboard/>}/>
                </Route>
                <Route path={"/*"} element={<Result
                    status="404"
                    title="404"
                    subTitle="Xin lỗi, Trang bạn cần không tồn tại."
                    extra={<Button type="primary">Quay lại Trang chủ.</Button>}
                />}/>
            </Routes>
        </BrowserRouter>
    );
};

Routers.propTypes = {};

export default Routers;
