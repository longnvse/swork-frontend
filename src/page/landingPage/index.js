import React from "react";
import Footer from "./Footer";
import Header from "./Header";

const advertisers = [
    {
        image: require("../../images/landing-page/manage-jobs.png"),
        title: "Quản lý công việc",
        description:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        link: "#",
    },
    {
        image: require("../../images/landing-page/auto-process.png"),
        title: "Tự động phân tích tiến độ",
        description:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        link: "#",
    },
    {
        image: require("../../images/landing-page/diagram-process.png"),
        title: "Biểu đồ tiến độ",
        description:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        link: "#",
    },
];
const LandingPage = () => {
    return (
        <div>
            <Header />
            <div className="mt-3 mx-3 w-full h-[1px] bg-[#BDC1CAFF]"></div>
            <div className="px-20 mb-[90px]">
                <div className="mt-12 flex justify-between items-center">
                    <div className="ml-[15%] flex flex-col items-center">
                        <span className="text-20/30">
                            Giải pháp thông minh cho quản lý dự án
                        </span>
                        <span className="text-14/22">
                            The featues to boost your productivity
                        </span>
                    </div>
                    <button className="w-[170px] text-center text-20/30 py-2 text-white rounded-full bg-[#FFA616FF] border-0 cursor-pointer">
                        Đăng ký
                    </button>
                </div>

                <div className="mt-[60px] flex space-x-36">
                    {advertisers.map((item, index) => (
                        <div
                            key={item.title + index}
                            className="flex-1 flex flex-col text-center"
                        >
                            <img src={item.image} alt="" className="w-full" />
                            <div className="mt-3 text-20/30 font-semibold">
                                {item.title}
                            </div>
                            <p className="text-14/22 mt-3">
                                {item.description}
                            </p>
                            <a
                                href={item.link}
                                target="_blank"
                                rel="noreferrer"
                                className="mt-16"
                            >
                                Xem thêm
                            </a>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default LandingPage;
