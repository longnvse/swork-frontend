import {
    BankOutlined,
    CalendarOutlined,
    ClusterOutlined,
    FileAddOutlined,
    TeamOutlined,
} from "@ant-design/icons";
import React from "react";

const ProjectViewSummary = ({ data, teamData, phaseData }) => {
    const getDay = (d1, d2) => {
        let ms1 = d1.getTime();
        let ms2 = d2.getTime();
        return Math.ceil((ms2 - ms1) / (24 * 60 * 60 * 1000));
    };

    return (
        <div
            className={
                "rounded-[8px] border-solid border-[1px] border-[#ccc] p-6 flex items-center justify-between"
            }
        >
            <div className="flex items-center">
                <span
                    style={{
                        padding: "5px",
                        backgroundColor: "rgba(252, 197, 61, 0.3)",
                        borderRadius: "5px",
                    }}
                >
                    <CalendarOutlined
                        className="p-2"
                        style={{ fontSize: "30px", color: "rgb(252, 197, 61)" }}
                    />
                </span>
                <div className="flex flex-col ml-2">
                    <h2>
                        {getDay(new Date(data?.startDate), new Date())} ngày
                    </h2>
                    <span>Đã thực hiện</span>
                </div>
            </div>
            <div className="flex items-center">
                <span
                    style={{
                        padding: "5px",
                        backgroundColor: "rgba(252, 197, 61, 0.3)",
                        borderRadius: "5px",
                    }}
                >
                    <ClusterOutlined
                        className="p-2"
                        style={{ fontSize: "30px", color: "rgb(252, 197, 61)" }}
                    />
                </span>
                <div className="flex flex-col ml-2">
                    <h2>{phaseData?.length}</h2>
                    <span>Giai đoạn</span>
                </div>
            </div>
            <div className="flex items-center">
                <span
                    style={{
                        padding: "5px",
                        backgroundColor: "rgba(252, 197, 61, 0.3)",
                        borderRadius: "5px",
                    }}
                >
                    <TeamOutlined
                        className="p-2"
                        style={{ fontSize: "30px", color: "rgb(252, 197, 61)" }}
                    />
                </span>
                <div className="flex flex-col ml-2">
                    <h2>{teamData?.length}</h2>
                    <span>Đội nhóm</span>
                </div>
            </div>
            <div className="flex items-center">
                <span
                    style={{
                        padding: "5px",
                        backgroundColor: "rgba(252, 197, 61, 0.3)",
                        borderRadius: "5px",
                    }}
                >
                    <BankOutlined
                        className="p-2"
                        style={{ fontSize: "30px", color: "rgb(252, 197, 61)" }}
                    />
                </span>
                <div className="flex flex-col ml-2">
                    <h2>100%</h2>
                    <span>Ngân sách còn lại</span>
                </div>
            </div>
            <div className="flex items-center">
                <span
                    style={{
                        padding: "5px",
                        backgroundColor: "rgba(252, 197, 61, 0.3)",
                        borderRadius: "5px",
                    }}
                >
                    <FileAddOutlined
                        className="p-2"
                        style={{ fontSize: "30px", color: "rgb(252, 197, 61)" }}
                    />
                </span>
                <div className="flex flex-col ml-2">
                    <h2>2</h2>
                    <span>Tài liệu đính kèm</span>
                </div>
            </div>
        </div>
    );
};

export default ProjectViewSummary;
