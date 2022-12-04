import React, {useEffect, useState} from 'react';
import {Empty} from "antd";
import ReactEcharts from "echarts-for-react";

const DashboardProgressPhase = (props) => {
    const [data, setData] = useState([])
    const [xAxis, setXAxis] = useState([])
    const [check, setCheck] = useState(true)

    const mapXAxis = (values) => {

        let xAxis = []

        values?.map(item => {
            xAxis.push(item.name)
        })

        return xAxis
    }

    const mapData = (values) => {
        let data = []

        values?.map(item => {
            data.push({
                value: item.progress,
                itemStyle: {
                    color: item.progress > 50 ? 'rgba(2, 99, 255, 0.8)' : 'rgba(255, 119, 35, 0.8)'
                }
            })
        })

        return data
    }
    useEffect(() => {
        // if (props.currentSlide === props.index)
        //     getDashboardPhase(props.id).then(r => {
        //         setData(mapData(r.items))
        //         setXAxis(mapXAxis(r.items))
        //         setCheck(r.items.length > 0)
        //     })
    }, [props.currentSlide])

    const getOption = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            },
            formatter: "{b} ({c}%)"
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'value',
            axisLabel: {
                formatter: '{value}'
            },
            max: 100
        },
        yAxis: {
            type: 'category',
            inverse: true,
            data: xAxis
        },
        series: [
            {
                type: 'bar',
                label: {show: true},
                data: data,
                barWidth: 30
            }
        ]
    };

    return (

        <>
            {
                check ? <ReactEcharts
                    option={getOption}
                /> : <Empty description={"Chưa có dữ liệu "}/>
            }
        </>
    )
};

DashboardProgressPhase.propTypes = {};

export default DashboardProgressPhase;
