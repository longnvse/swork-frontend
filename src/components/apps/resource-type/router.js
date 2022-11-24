import React from 'react';
import {Route, Routes} from "react-router-dom";
import ResourceTypeList from "./index";

const ResourceTypeRouter = props => {
    return (
        <Routes path={"/"}>
            <Route index element={<ResourceTypeList/>}/>
        </Routes>
    );
};

ResourceTypeRouter.propTypes = {};

export default ResourceTypeRouter;
