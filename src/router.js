import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import BusinessList from "./components/apps/business";
import BusinessRouter from "./components/apps/business/router";
import Dashboard from "./components/common/layout";
import LoginPage from "./page/login";
import RootPage from "./page";
import SignUpPage from "./page/signup";
import { URIS } from "./utils/constant";
import ResetPasswordPage from "./page/resetPassword";
import CommonSider from "./components/common/layout/sider/Sider";
import AccountSidebar from "./components/common/layout/sider/AccountSidebar";
import AccountInfo from "./page/accountInfo";
import AccountSecurity from "./page/accountSecurity";
import LandingPage from "./page/landingPage";

const Routers = (props) => {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    element={
                        <RootPage
                            title="Danh sách công ty"
                            sidebar={<CommonSider />}
                        />
                    }
                >
                    <Route index element={<BusinessList />} />
                    <Route path={"/business/*"} element={<BusinessRouter />} />
                    <Route path={URIS.DASHBOARD} element={<Dashboard />} />
                </Route>
                <Route path={URIS.LOGIN} element={<LoginPage />} />
                <Route path={URIS.SIGN_UP} element={<SignUpPage />} />
                <Route path={URIS.LANDING_PAGE} element={<LandingPage />} />
                <Route
                    path={URIS.RESET_PASSWORD}
                    element={<ResetPasswordPage />}
                />
                <Route
                    element={
                        <RootPage
                            title="Cài đặt tài khoản"
                            sidebar={<AccountSidebar />}
                        />
                    }
                >
                    <Route path="/account/info" element={<AccountInfo />} />
                    <Route
                        path={"account/security"}
                        element={<AccountSecurity />}
                    />
                    <Route path={URIS.DASHBOARD} element={<Dashboard />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

Routers.propTypes = {};

export default Routers;
