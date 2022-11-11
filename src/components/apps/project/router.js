import React from "react";
import {Route, Routes} from "react-router-dom";
import ProjectList from ".";
import ProjectForm from "./form";
import ProjectView from "./view";

const ProjectRouter = (props) => {
    return (
        <Routes path={"/"}>
            <Route index element={<ProjectList/>}/>
            <Route path={"add"} element={<ProjectForm/>}/>
            <Route path={"update/:id"} element={<ProjectForm/>}/>
            <Route path={"view/:id"} element={<ProjectView/>}/>
        </Routes>
    );
};

ProjectRouter.propTypes = {};

export default ProjectRouter;
