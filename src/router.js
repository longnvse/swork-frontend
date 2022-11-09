import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import BusinessList from "./components/apps/business";
import BusinessRouter from "./components/apps/business/router";
import Dashboard from "./components/common/layout";
import SignUpPage from "./page/signup";
import {URIS} from "./utils/constant";
import ResetPasswordPage from "./page/resetPassword";
import RootPage from "./components/page";
import LoginPage from "./components/page/login";
import DepartmentRouter from "./components/apps/department/router";
import AccountRouter from "./components/apps/account/router";

const Routers = (props) => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<RootPage/>}>
                    <Route index element={<BusinessList/>}/>
                    <Route path={URIS.BUSINESS} element={<BusinessRouter/>}/>
                    <Route path={URIS.DEPARTMENT} element={<DepartmentRouter/>}/>
                    <Route path={URIS.ACCOUNT} element={<AccountRouter/>}/>
                    <Route path={URIS.DASHBOARD} element={<Dashboard/>}/>
                </Route>
                <Route path={URIS.LOGIN} element={<LoginPage/>}/>
                <Route path={URIS.SIGN_UP} element={<SignUpPage/>}/>
                <Route
                    path={URIS.RESET_PASSWORD}
                    element={<ResetPasswordPage/>}
                />
            </Routes>
        </BrowserRouter>
    );
};

Routers.propTypes = {};

export default Routers;
