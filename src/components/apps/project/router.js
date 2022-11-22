import React from "react";
import {Route, Routes} from "react-router-dom";
import ProjectList from ".";
import ProjectView from "./view";

const ProjectRouter = (props) => {
    return (
        <Routes path={"/"}>
            <Route index element={<ProjectList/>}/>
            <Route path={`view/:id`} element={<ProjectView/>}/>
        </Routes>
    );
};

ProjectRouter.propTypes = {};

export default ProjectRouter;
