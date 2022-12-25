import React from 'react';
import {URIS} from "../../../utils/constant";
import {createRoutesFromElements, Route} from "react-router-dom";
import DepartmentRouter from "../../apps/department/router";
import AccountRouter from "../../apps/account/router";
import ProjectRouter from "../../apps/project/router";
import PhaseRouter from "../../apps/phase/router";

const AdminRouter = createRoutesFromElements(
    <>
        <Route path={URIS.DEPARTMENT} element={<DepartmentRouter/>}/>
        <Route path={URIS.ACCOUNT} element={<AccountRouter/>}/>
        <Route path={URIS.PROJECT} element={<ProjectRouter/>}/>
        <Route path={URIS.PHASE} element={<PhaseRouter/>}/>
        <Route path={URIS.WORK} element={<PhaseRouter/>}/>
    </>
);

export default AdminRouter;
