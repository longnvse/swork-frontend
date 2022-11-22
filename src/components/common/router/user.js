import React from 'react';
import {createRoutesFromElements, Route} from "react-router-dom";
import {URIS} from "../../../utils/constant";
import ProjectRouter from "../../apps/project/router";

const UserRouter = createRoutesFromElements(
    <>
        <Route path={URIS.PROJECT} element={<ProjectRouter/>}/>
    </>
);


export default UserRouter;
