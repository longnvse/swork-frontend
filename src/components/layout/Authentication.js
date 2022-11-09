import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { URIS } from "../../utils/constant";

import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import background from "../../images/authentication/background.png";

function AuthenticationLayout(props) {
    const { children } = props;
    const navigate = useNavigate();
    const { loggedInSuccess } = useSelector((state) => state.loginReducer);

    useEffect(() => {
        if (loggedInSuccess) {
            navigate("/dashboard");
        }
    }, [loggedInSuccess]);

    return (
        <div
            className={"page__login-container flex"}
            style={{
                backgroundImage: `url(${background})`,
            }}
        >
            <div className="w-full px-10 py-8">
                <div className="flex justify-end ">
                    <span className="mr-5">Đã có tài khoản?</span>
                    <Link
                        to={URIS.LOGIN}
                        className="underline text-[#2525EBFF]"
                    >
                        Đăng nhập
                    </Link>
                </div>
                <div
                    className="flex mt-5"
                    style={{ minHeight: "calc(100vh - 150px)" }}
                >
                    <div className="mt-[100px] w-[15%] text-right">
                        <img
                            src={require("../../images/authentication/Coffee.png")}
                            alt=""
                        />
                        <div className="mt-10 h-2 w-full bg-[#ed7d2d] rounded-xl"></div>
                    </div>
                    <div className="mt-[150px] w-[21%] ml-[84px] text-[#9095A1FF]">
                        <div className="text-48/68">
                            Great to have you back!
                        </div>
                        <p className="text-14/22 mt-3">
                            Consequat adipisicing ea do labore irure adipisicing
                            occaecat cupidatat excepteur duis mo
                        </p>
                        <img
                            src={require("../../images/authentication/Sun.png")}
                            alt=""
                        />
                    </div>
                    <div className="flex items-center w-[45%]"> {children}</div>
                    <div className="flex-1 text-end mt-[200px]">
                        <img
                            src={require("../../images/authentication/Lightbulb.png")}
                            alt=""
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AuthenticationLayout;
