import React, {useEffect, useState} from 'react';
import {Bar} from "@ant-design/plots";
import {getPhasePages} from "../../../../api/phase";
import {message_error} from "../../../common/Constant";
import {statusColor} from "../../../common/status";
import {Empty} from "antd";

const DashboardProgressPhase = ({projectId}) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        if (projectId) {
            getPhasePages(projectId, {page: 1, pageSize: Number.MAX_VALUE}).then(res => {
                setData(res.data?.items?.map(mapData) || []);
            }).catch(message_error);
        }
    }, [projectId]);

    const mapData = (item) => ({
        phase: item.name,
        value: item.progress,
        status: item.status
    })

    const formatterTooltip = (datum) => {
        return {name: datum.phase, value: datum.value + "%"};
    }

    const colorBar = ({status}, defaultColor) => {
        return statusColor(status) || defaultColor;
    }

    return (
        <>
            {data.length > 0 ?
                <Bar
                    data={data}
                    xField={"value"}
                    yField={"phase"}
                    seriesField={"status"}
                    height={200}
                    xAxis={{
                        min: 0,
                        max: 100,
                        label: {
                            formatter: (text) => `${text}%`
                        }
                    }}
                    label={{
                        formatter: ({value}) => `${value}%`
                    }}
                    yAxis={{
                        label: {
                            autoRotate: false,
                        },
                    }}
                    legend={false}
                    color={colorBar}
                    barWidthRatio={0.7}
                    tooltip={{
                        formatter: formatterTooltip
                    }}
                    scrollbar={{
                        type: "vertical"
                    }}
                /> : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={"Chưa có giai đoạn"}/>
            }
        </>
    );
};

DashboardProgressPhase.propTypes = {};

export default DashboardProgressPhase;
