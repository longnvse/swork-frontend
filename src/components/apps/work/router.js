import React from "react";
import { Route, Routes } from "react-router-dom";
import WorkList from "./list";

const WorkRouter = () => {
    return (
        <Routes path={"/"}>
            <Route path="/:type" element={<WorkList />} />
        </Routes>
    );
};

export default WorkRouter;
