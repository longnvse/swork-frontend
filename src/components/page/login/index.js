import React from 'react';
import LoginForm from "./Form";
import background from "../../../images/background.png";

function LoginPage(props) {
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