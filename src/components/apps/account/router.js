import React from 'react';
import {Route, Routes} from "react-router-dom";
import AccountList from "./index";

const AccountRouter = props => {
    return (
        <Routes path={""}>
            <Route index element={<AccountList/>}/>
        </Routes>
    );
};

AccountRouter.propTypes = {};

export default AccountRouter;
