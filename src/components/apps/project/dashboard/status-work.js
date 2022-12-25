import React, {useEffect, useState} from 'react';
import {measureTextWidth, Pie} from '@ant-design/plots';
import {getWorkPages} from "../../../../api/work";
import {message_error, STATUS_ARRAY} from "../../../common/Constant";
import {statusColor, statusString} from "../../../common/status";

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

    function renderStatistic(containerWidth, text, style) {
        const {width: textWidth, height: textHeight} = measureTextWidth(text, style);
        const R = containerWidth / 2; // r^2 = (w / 2)^2 + (h - offsetY)^2

        let scale = 1;

        if (containerWidth < textWidth) {
            scale = Math.min(Math.sqrt(Math.abs(Math.pow(R, 2) / (Math.pow(textWidth / 2, 2) + Math.pow(textHeight, 2)))), 1);
        }

        const textStyleStr = `width:${containerWidth}px;`;
        return `<div style="${textStyleStr};font-size:${scale}em;line-height:${scale < 1 ? 1 : 'inherit'};">${text}</div>`;
    }

    const data1 = [
        {
            status: 'Chờ thực hiện',
            value: 27,
        },
        {
            status: 'Đang thực hiện',
            value: 25,
        },
        {
            status: 'Hoàn thành',
            value: 18,
        },
        {
            status: 'Tạm dừng',
            value: 15,
        },
        {
            status: 'Huỷ',
            value: 10,
        }
    ];
    const config = {
        locale: "VN-vi",
        legend: {
            layout: 'horizontal',
            position: 'top',
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
                    return renderStatistic(d, text, {
                        fontSize: 28,
                    });
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
                    return renderStatistic(width, text, {
                        fontSize: 32,
                    });
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
    return <Pie {...config} />;
};

DashboardStatusWork.propTypes = {};

export default DashboardStatusWork;
