import React, { useEffect } from "react";
import SignUpForm from "./Form";
import background from "../../images/authentication/background.png";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import AuthenticationLayout from "../../components/layout/Authentication";

function SignUpPage(props) {
    const navigate = useNavigate();
    const { loggedInSuccess } = useSelector((state) => state.loginReducer);

    useEffect(() => {
        if (loggedInSuccess) {
            navigate("/dashboard");
        }
    }, [loggedInSuccess]);

    return (
        <AuthenticationLayout>
            <SignUpForm />
        </AuthenticationLayout>
    );
}

export default SignUpPage;
