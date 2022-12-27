import {BankOutlined, CalendarOutlined, ClusterOutlined, FileAddOutlined, TeamOutlined,} from "@ant-design/icons";
import React, {useEffect, useMemo, useState} from "react";
import dayjs from "dayjs";
import {getResourcePages} from "../../../../../../api/resource/resource";

const ProjectViewSummary = ({data, teamData, phaseData}) => {
    const [remainsBudget, setRemainsBudget] = useState(0);
    const getDay = (d1, d2) => {
        let ms1 = d1.getTime();
        let ms2 = d2.getTime();
        return Math.ceil((ms2 - ms1) / (24 * 60 * 60 * 1000));
    };

    const dayDiffHandle = useMemo(() => {
        if (data?.status === "PENDING") {
            return 0;
        }

        return dayjs(data?.actualStartDate).diff(dayjs(data?.actualEndDate), "days") + 1
    }, [data]);

    useEffect(() => {
        getResourcePages({page: 1, pageSize: Number.MAX_VALUE}).then(res => {
            const remainsBudget = res.data?.items?.reduce((previousValue, {type, totalAmount}) => {
                if (type === "incoming") {
                    return previousValue + totalAmount;
                }
                return previousValue - totalAmount;
            }, (data?.budget || 0));

            setRemainsBudget(parseFloat(Number((remainsBudget) * 100 / data?.budget).toFixed(2)));
        })
    }, [data]);

    return (
        <div
            className={
                "rounded-[8px] border-solid border-[1px] border-[#ccc] p-6 flex items-center justify-between w-full"
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
                        style={{fontSize: "30px", color: "rgb(252, 197, 61)"}}
                    />
                </span>
                <div className="flex flex-col ml-2">
                    <h2>
                        {dayDiffHandle} ngày
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
                        style={{fontSize: "30px", color: "rgb(252, 197, 61)"}}
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
                        style={{fontSize: "30px", color: "rgb(252, 197, 61)"}}
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
                        style={{fontSize: "30px", color: "rgb(252, 197, 61)"}}
                    />
                </span>
                <div className="flex flex-col ml-2">
                    <h2>{remainsBudget}%</h2>
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
                        style={{fontSize: "30px", color: "rgb(252, 197, 61)"}}
                    />
                </span>
                <div className="flex flex-col ml-2">
                    <h2>{data?.attachNumber || 0}</h2>
                    <span>Tài liệu đính kèm</span>
                </div>
            </div>
        </div>
    );
};

export default ProjectViewSummary;
