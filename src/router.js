import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Dashboard from "./components/common/layout";
import SignUpPage from "./page/signup";
import {URIS} from "./utils/constant";
import ResetPasswordPage from "./page/resetPassword";
import CommonSider from "./components/common/layout/sider/Sider";
import AccountSidebar from "./components/common/layout/sider/AccountSidebar";
import AccountInfo from "./page/accountInfo";
import AccountSecurity from "./page/accountSecurity";
import LandingPage from "./page/landingPage";
import LoginPage from "./page/login";
import RootPage from "./page";
import {Button, Result} from "antd";
import {RouteByPermission} from "./components/common/router";

const Routers = ({role}) => {
    const mapRoute = (item) => <Route key={item.id} {...item} />;

    console.log(RouteByPermission[role])

    return (
        <BrowserRouter>
            <Routes>
                <Route key={"1"} index element={<LandingPage/>}/>
                <Route
                    key={"2"}
                    element={
                        <RootPage
                            title="Danh sách công ty"
                            sidebar={<CommonSider role={role}/>}
                        />
                    }
                >
                    {/*<Route path={URIS.BUSINESS} element={<BusinessRouter/>}/>*/}
                    {/*<Route path={URIS.DEPARTMENT} element={<DepartmentRouter/>}/>*/}
                    {/*<Route path={URIS.ACCOUNT} element={<AccountRouter/>}/>*/}
                    <Route key={"3"} path={URIS.DASHBOARD} element={<Dashboard/>}/>
                    {/*<Route path={URIS.PROJECT} element={<ProjectRouter/>}/>*/}
                    {RouteByPermission[role]?.map(mapRoute) || <></>}
                </Route>
                <Route key={"4"} path={URIS.LOGIN} element={<LoginPage/>}/>
                <Route key={"5"} path={URIS.SIGN_UP} element={<SignUpPage/>}/>
                <Route
                    key={"6"}
                    path={URIS.RESET_PASSWORD}
                    element={<ResetPasswordPage/>}
                />
                <Route
                    key={"7"}
                    element={
                        <RootPage
                            title="Cài đặt tài khoản"
                            sidebar={<AccountSidebar/>}
                        />
                    }
                >
                    <Route key={"8"} path={URIS.ACCOUNT_INFO} element={<AccountInfo/>}/>
                    <Route
                        key={"9"}
                        path={URIS.ACCOUNT_SECURITY}
                        element={<AccountSecurity/>}
                    />
                </Route>
                <Route key={"10"} path={"/*"} element={<Result
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
