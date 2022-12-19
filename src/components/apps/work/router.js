import React from "react";
import { Route, Routes } from "react-router-dom";
import WorkList from "./list";

const WorkRouter = () => {
    return (
        <Routes path={"/"}>
            <Route path="all" element={<WorkList />} />
        </Routes>
    );
};

export default WorkRouter;
