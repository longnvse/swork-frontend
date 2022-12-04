import React, {useEffect, useState} from 'react';
import ReactEcharts from "echarts-for-react";
import {getDashboardStatusWork} from "../../../../api/project";
import {statusColor, statusString} from "../../../common/status/status-work";

const DashboardStatusWork = props => {
    const [data, setData] = useState([])

    useEffect(() => {
        if (props.currentSlide === props.index)
            getDashboardStatusWork(props.projectId).then(r => {
                console.log(r.data.items)
                setData(mapData(r.data?.items || []))
            })
    }, [props.projectId, props.currentSlide])

    const mapData = (values) => {
        return values.map(item => ({
            name: statusString(item.obj),
            value: item.sum,
            itemStyle: {
                color: statusColor(item.obj)
            }
        }))
    }
    console.log(data)

    const getOption = {
        tooltip: {
            show: true,
            trigger: 'item',
            formatter: "{b} : ({d}%)"
        },
        legend: {
            top: '21%',
            left: 'center',
            orient: 'vertical',
            icon: "circle"
        },
        series: [
            {
                top: -50,
                height: "400px",
                type: 'pie',
                radius: ['55%', '75%'],
                avoidLabelOverlap: false,
                label: {
                    show: true,
                    formatter: '{c}',
                    position: 'inside',
                    color: '#FFFFFF',
                    fontSize: 10
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: "12",
                        fontWeight: "bold"
                    }
                },
                data: data
            }
        ]
    };

    return (
        <ReactEcharts
            option={getOption}
        />
    )

};

DashboardStatusWork.propTypes = {};

export default DashboardStatusWork;
