import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import BusinessList from "./components/apps/business";
import BusinessRouter from "./components/apps/business/router";
import Dashboard from "./components/common/layout";
import LoginPage from "./page/login";
import RootPage from "./page";

const Routers = props => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<RootPage/>}>
                    <Route index element={<BusinessList/>}/>
                    <Route path={"/business/*"} element={<BusinessRouter/>}/>
                    <Route path={"/dashboard"} element={<Dashboard/>}/>
                </Route>
                <Route path={"/login"} element={<LoginPage/>}/>
            </Routes>
        </BrowserRouter>
    );
};

Routers.propTypes = {};

export default Routers;
