import React, {useEffect, useState} from 'react';
import {Pie} from '@ant-design/plots';
import {getWorkPages} from "../../../../api/work";
import {message_error, STATUS_ARRAY} from "../../../common/Constant";
import {statusColor, statusString} from "../../../common/status";
import {Empty} from "antd";

const DashboardStatusWork = ({projectId}) => {
    const [data, setData] = useState([]);
    useEffect(() => {
        if (projectId) {
            getWorkPages({projectId, page: 1, pageSize: Number.MAX_VALUE}).then(r => {
                setData(mapData(r.data?.items || []));
            }).catch(message_error);
        }
    }, [projectId]);

    const mapData = (items = []) => {
        return STATUS_ARRAY.map(status => ({
            status,
            value: items.filter(item => status === item.status).length
        })).filter(item => item.value > 0);
    }

    const config = {
        locale: "VN-vi",
        legend: {
            layout: 'vertical',
            position: 'left',
            itemName: {
                formatter: (text) => statusString(text)
            },
        },
        color: ({status}) => statusColor(status),
        appendPadding: [10, 10, 10, 10],
        data,
        angleField: 'value',
        colorField: 'status',
        radius: 1,
        innerRadius: 0.64,
        meta: {
            value: {
                formatter: (v) => `${v}`,
            },
        },
        label: {
            type: 'inner',
            offset: '-50%',
            style: {
                textAlign: 'left',
            },
            autoRotate: false,
            content: '{value}',
        },
        statistic: {
            title: {
                offsetY: -4,
                customHtml: (container, view, datum) => {
                    const {width, height} = container.getBoundingClientRect();
                    const d = Math.sqrt(Math.pow(width / 2, 2) + Math.pow(height / 2, 2));
                    const text = datum ? statusString(datum.status) : 'Tổng';
                    return <div className={"flex items-center justify-center"}>
                        {text}
                    </div>
                },
            },
            content: {
                offsetY: 4,
                style: {
                    fontSize: '32px',
                },
                customHtml: (container, view, datum, data) => {
                    const {width} = container.getBoundingClientRect();
                    const text = datum ? `${datum.value}` : `${data.reduce((r, d) => r + d.value, 0)}`;

                    return <div>
                        {text}
                    </div>
                },
            }
        },
        interactions: [
            {
                type: 'element-selected',
            },
            {
                type: 'element-active',
            },
            {
                type: 'pie-statistic-active',
            },
        ],
    };
    return <>{data.length > 0 ? <Pie height={250} {...config} /> :
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={"Chưa có công việc"}/>}</>;
};

DashboardStatusWork.propTypes = {};

export default DashboardStatusWork;
