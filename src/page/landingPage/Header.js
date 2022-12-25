import React from "react";
import {Link, useLocation} from "react-router-dom";
import {URIS} from "../../utils/constant";
import classNames from "classnames/bind";

const links = [
    { label: "Trang chủ", uri: URIS.LANDING_PAGE },
    { label: "Về chúng tôi", uri: URIS.HOME },
    { label: "Lựa chọn", uri: URIS.HOME },
    { label: "Liên hệ", uri: URIS.HOME },
];
const Header = () => {
    const location = useLocation();
    return (
        <div className="px-8 h-24 bg-primary flex justify-between items-center">
            <img src={require("../../images/main-logo.png")} alt="" />
            <ul className="list-none flex items-center space-x-16">
                {links.map((link) => (
                    <li key={link.label}>
                        <Link to={link.uri}>
                            <span
                                className={classNames(
                                    "text-white text-20/30",
                                    link.uri === location.pathname &&
                                        "font-semibold",
                                )}
                            >
                                {link.label}
                            </span>
                        </Link>
                    </li>
                ))}
                <li>
                    <Link to={URIS.LOGIN}>
                        <button className="w-[168px] text-center text-20/30 py-2 rounded-3xl text-white bg-[#FFA616FF] border-0 cursor-pointer">
                            Đăng nhập
                        </button>
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default Header;
