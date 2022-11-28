import React from 'react';
import {Route, Routes} from "react-router-dom";
import DepartmentList from "./index";

const TeamRouter = props => {
    return (
        <Routes path={""}>
            <Route index element={<DepartmentList/>}/>
        </Routes>
    );
};

TeamRouter.propTypes = {};

export default TeamRouter;
