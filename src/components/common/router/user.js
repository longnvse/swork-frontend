import React from "react";
import { createRoutesFromElements, Route } from "react-router-dom";
import { URIS } from "../../../utils/constant";
import PhaseRouter from "../../apps/phase/router";
import ProjectRouter from "../../apps/project/router";
import WorkRouter from "../../apps/work/router";

const UserRouter = createRoutesFromElements(
    <>
        <Route path={URIS.PROJECT} element={<ProjectRouter />} />
        <Route path={URIS.PHASE} element={<PhaseRouter />} />
        <Route path={URIS.WORK} element={<WorkRouter />} />
    </>,
);

export default UserRouter;
