import React from 'react';
import {URIS} from "../../../utils/constant";
import {createRoutesFromElements, Route} from "react-router-dom";
import DepartmentRouter from "../../apps/department/router";
import AccountRouter from "../../apps/account/router";

const AdminRouter = createRoutesFromElements(
    <>
        <Route path={URIS.DEPARTMENT} element={<DepartmentRouter/>}/>
        <Route path={URIS.ACCOUNT} element={<AccountRouter/>}/>
    </>
);

export default AdminRouter;
