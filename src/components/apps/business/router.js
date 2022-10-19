import React from 'react';
import {Route, Routes} from "react-router-dom";
import BusinessList from "./index";

const BusinessRouter = props => {
    return (
        <Routes path={"/"}>
            <Route index element={<BusinessList/>}/>
            <Route path={"/add"} element={<BusinessList/>}/>

        </Routes>
    );
};

BusinessRouter.propTypes = {};

export default BusinessRouter;
