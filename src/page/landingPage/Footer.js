import React from "react";
import {AiOutlineMail} from "react-icons/ai";
import {Link} from "react-router-dom";

const footer = [
    {
        title: "Hỗ trợ",
        subtitles: [
            { label: "Lorem ispsum lor", uri: "/" },
            { label: "Lorem ispsum lor", uri: "/" },
            { label: "Lorem ispsum lor", uri: "/" },
        ],
    },
    {
        title: "Cộng đồng",
        subtitles: [
            { label: "Lorem ispsum lor", uri: "/" },
            { label: "Lorem ispsum lor", uri: "/" },
            { label: "Lorem ispsum lor", uri: "/" },
        ],
    },
    {
        title: "Về chúng tôi",
        subtitles: [
            { label: "Lorem ispsum lor", uri: "/" },
            { label: "Lorem ispsum lor", uri: "/" },
            { label: "Lorem ispsum lor", uri: "/" },
        ],
    },
];

const socials = [
    { icon: require("../../images/landing-page/network.png"), link: "" },
    { icon: require("../../images/landing-page/facebook.png"), link: "" },
    { icon: require("../../images/landing-page/twitter.png"), link: "" },
    { icon: require("../../images/landing-page/instagram.png"), link: "" },
];
const Footer = () => {
    return (
        <div className="bg-primary flex justify-center">
            <div className="max-w-[1176px] w-full mt-10 mb-5 text-white">
                <div
                    className="pb-10 flex w-full"
                    style={{ borderBottom: "1px solid #DEE1E6FF" }}
                >
                    <div className="flex w-[60%]">
                        {footer.map((item) => (
                            <div key={item.title} className="flex-1 text-20/30">
                                <div>{item.title}</div>
                                <ul className="list-none">
                                    {item.subtitles.map((subtitle, index) => (
                                        <li key={index} className="mt-3">
                                            <Link to={subtitle.uri}>
                                                <span className="text-14/22 text-white">
                                                    {subtitle.label}
                                                </span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                    <div className="w-[40%] flex flex-col">
                        <span className="text-20/30">
                            Nhận thông báo mới từ chúng tôi
                        </span>
                        <span className="text-12/20">
                            Để biết thông báo và giao dịch độc quyền
                        </span>
                        <div className="flex items-center mt-4">
                            <div className="bg-white rounded-full w-[200px] flex items-center justify-start px-3 py-3">
                                <AiOutlineMail size={16} color="black" />
                                <input
                                    placeholder="Điền tên email"
                                    type="email"
                                    className="ml-2 outline-none border-0 min-w-0 text-black placeholder-gray-400"
                                />
                            </div>
                            <button className="w-[168px] ml-5 text-center text-20/30 py-2 rounded-3xl text-white bg-[#FFA616FF] border-0 cursor-pointer">
                                Nhận thông báo
                            </button>
                        </div>
                    </div>
                </div>
                <div className="mt-5 flex justify-between">
                    <div className="flex">
                        © 2022 Swork, Inc.
                        <ul className="list-none flex ml-10 space-x-5">
                            <li>
                                <Link to="/">
                                    <span className="text-14/22 text-white">
                                        Privacy
                                    </span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/">
                                    <span className="text-14/22 text-white">
                                        Terms
                                    </span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <ul className="flex space-x-4">
                        {socials.map((item, index) => (
                            <a href={item.link} key={index}>
                                <img
                                    src={item.icon}
                                    alt=""
                                    className="w-5 h-5"
                                />
                            </a>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Footer;
