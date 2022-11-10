import React from 'react';
import {Route, Routes} from "react-router-dom";
import DepartmentList from "./index";

const DepartmentRouter = props => {
    return (
        <Routes path={""}>
            <Route index element={<DepartmentList/>}/>
        </Routes>
    );
};

DepartmentRouter.propTypes = {};

export default DepartmentRouter;
