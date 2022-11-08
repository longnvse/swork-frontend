import React, {useEffect} from 'react';
import LoginForm from "./Form";
import background from "../../../images/background.png";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";

function LoginPage(props) {

    const navigate = useNavigate()
    const {loggedInSuccess} = useSelector(
        (state) => state.loginReducer
    );

    useEffect(() => {
        if (loggedInSuccess) {
            navigate("/dashboard")
        }

    }, [loggedInSuccess]);

    return (
        <div
            className={"page__login-container flex items-center justify-center"}
            style={{
                backgroundImage: `url(${background})`
            }}
        >
            <LoginForm/>
        </div>
    );
}

export default LoginPage;