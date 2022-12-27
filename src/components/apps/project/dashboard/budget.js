import React, {useEffect, useState} from 'react';
import {Column} from "@ant-design/plots";
import {getResourcePages} from "../../../../api/resource/resource";
import {message_error} from "../../../common/Constant";
import {convertMoney} from "../../../common/convert";

const DashboardBudget = ({projectId, budget = 0}) => {
    const [data, setData] = useState([]);
    useEffect(() => {
        if (projectId) {
            getResourcePages({projectId}).then(res => {
                mapData(res.data?.items || []);
            }).catch(err => {
                console.log(err)
                message_error(err)
            });
        }
    }, [projectId])

    const mapData = (items = []) => {
        const totalIncoming = items
            .filter(item => item.type === "incoming")
            .reduce((previousValue, currentValue) => {
                if (!previousValue) {
                    return currentValue.totalAmount;
                }

                return previousValue + currentValue.totalAmount;
            }, 0);

        const totalSpending = items.filter(item => item.type === "spending").reduce((previousValue, currentValue) => {
            if (!previousValue) {
                return currentValue.totalAmount;
            }

            return previousValue + currentValue.totalAmount;
        }, 0);

        const remainsBudget = budget + totalIncoming - totalSpending;
        const data = [
            {
                type: "Ngân sách",
                value: remainsBudget,
                key: `${remainsBudget}`
            },
            {
                type: "Thu",
                value: totalIncoming,
                key: `${totalIncoming}`
            },
            {
                type: "Chi",
                value: totalSpending,
                key: `${totalSpending}`
            },
        ]

        setData(data);
    }

    return (
        <Column
            height={495}
            xField={"type"}
            yField={"value"}
            legend={false}
            yAxis={{
                label: {
                    formatter: (text) => convertMoney(text)
                }
            }}
            tooltip={{
                formatter: (datum) => ({name: datum.type, value: convertMoney(datum.value)})
            }}
            seriesField={"key"}
            color={(datum, defaultColor) => {
                if (datum.key < 0) {
                    return 'red';
                }
                return defaultColor;
            }}
            data={data}/>
    );
};

DashboardBudget.propTypes = {};

export default DashboardBudget;
