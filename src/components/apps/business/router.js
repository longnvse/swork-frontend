import React from 'react';
import {Route, Routes} from "react-router-dom";
import BusinessList from "./index";
import BusinessForm from "./form";

const BusinessRouter = props => {
    return (
        <Routes path={"/"}>
            <Route index element={<BusinessList/>}/>
            <Route path={"add"} element={<BusinessForm/>}/>
            <Route path={"update/:id"} element={<BusinessForm/>}/>

        </Routes>
    );
};

BusinessRouter.propTypes = {};

export default BusinessRouter;
