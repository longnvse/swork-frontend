import React from "react";
import { createRoutesFromElements, Route } from "react-router-dom";
import { URIS } from "../../../utils/constant";
import PhaseRouter from "../../apps/phase/router";
import ProjectRouter from "../../apps/project/router";

const UserRouter = createRoutesFromElements(
    <>
        <Route path={URIS.PROJECT} element={<ProjectRouter />} />
        <Route path={URIS.PHASE} element={<PhaseRouter />} />
    </>,
);

export default UserRouter;
