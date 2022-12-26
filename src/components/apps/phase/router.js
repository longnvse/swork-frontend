import React from "react";
import {Route, Routes} from "react-router-dom";
import PhaseList from ".";
import PhaseView from "./view";

const PhaseRouter = (props) => {
    return (
        <Routes path={"/"}>
            <Route index element={<PhaseList />} />
            <Route path={`view/:id`} element={<PhaseView />} />
        </Routes>
    );
};

PhaseRouter.propTypes = {};

export default PhaseRouter;
