import React from "react";
import {Route, Routes} from "react-router-dom";
import ProjectList from ".";
import PhaseView from "../phase/view";
import TeamView from "../team/view";
import ViewWork from "../work/view";
import ProjectView from "./view";

const ProjectRouter = (props) => {
    return (
        <Routes path={"/"}>
            <Route index element={<ProjectList />} />
            <Route path={`view/:id`} element={<ProjectView />} />
            <Route path={`view-work/:id`} element={<ViewWork />} />
            <Route path={`view-phase/:id`} element={<PhaseView />} />
            <Route path={`view-team/:id`} element={<TeamView />} />
        </Routes>
    );
};

ProjectRouter.propTypes = {};

export default ProjectRouter;
