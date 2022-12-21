import React, { useEffect } from "react";
import LoginForm from "./Form";
import background from "../../images/authentication/background.png";
import Coffee from "../../images/authentication/Coffee.png";
import Lightbulb from "../../images/authentication/Lightbulb.png";
import Sun from "../../images/authentication/Sun.png";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function LoginPage(props) {
    const navigate = useNavigate();
    const { loggedInSuccess } = useSelector((state) => state.loginReducer);

    useEffect(() => {
        if (loggedInSuccess) {
            navigate("/dashboard");
        }
    }, [loggedInSuccess]);

    return (
        <div
            className="h-screen"
            style={{
                background: `url(${background}) no-repeat`,
                backgroundSize: "contain",
            }}
        >
            <div className="text-right px-5 py-10">
                <span className="mr-10">Chưa có tài khoản?</span>
                <a href="# " className="font-bold">
                    Đăng ký
                </a>
            </div>
            <div className="px-10 m-auto mt-10 flex items-start justify-between">
                <div className="flex flex-col items-end">
                    <img src={Coffee} alt="Coffee" className="mb-8" />
                    <div className="w-[150px] bg-orange-500 rounded-lg h-[5px]" />
                </div>

                <div className="mt-14">
                    <h1 className="w-[200px] leading-[45px] text-gray-400 font-[400] mb-5">
                        Great to have you back!
                    </h1>
                    <p className="text-[13px] text-gray-400 w-[300px] leading-5">
                        Consequat adipisicing ea do labore irure adipisicing
                        occaecat cupidatat excepteur duis mo
                    </p>
                    <img src={Sun} alt="Sun" className="mt-8" />
                </div>

                <LoginForm />

                <img
                    src={Lightbulb}
                    alt="Lightbulb"
                    style={{ transform: "translate(-50%, 200%)" }}
                />
            </div>
        </div>
    );
}

export default LoginPage;
