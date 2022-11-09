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

const Routers = (props) => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<RootPage />}>
                    <Route index element={<BusinessList />} />
                    <Route path={"/business/*"} element={<BusinessRouter />} />
                    <Route path={URIS.DASHBOARD} element={<Dashboard />} />
                </Route>
                <Route path={URIS.LOGIN} element={<LoginPage />} />
                <Route path={URIS.SIGN_UP} element={<SignUpPage />} />
                <Route
                    path={URIS.RESET_PASSWORD}
                    element={<ResetPasswordPage />}
                />
            </Routes>
        </BrowserRouter>
    );
};

Routers.propTypes = {};

export default Routers;
