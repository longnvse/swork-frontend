import React from 'react';
import {createRoutesFromElements, Route} from "react-router-dom";
import {URIS} from "../../../utils/constant";
import BusinessRouter from "../../apps/business/router";

const SuperAdminRouter = createRoutesFromElements(
    <>
        <Route path={URIS.BUSINESS} element={<BusinessRouter/>}/>
    </>
)

export default SuperAdminRouter;
