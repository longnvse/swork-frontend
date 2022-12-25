import React from 'react';
import {Col, Row} from "antd";
import dayjs from "dayjs";
import {renderStatus} from "../../../../../common/status";

export const TooltipGanttChart = ({task, fontSize, fontFamily}) => {
    const {isProject, isPhase, start, end, name, progress, status} = task;

    return (
        <div
            style={{
                fontSize,
                fontFamily
            }}
            className={"bg-white p-5 shadow rounded-2xl flex-col items-center justify-between w-[33vh]"}>
            <Row className={"mb-2"}>
                <Col span={10}
                     className={"font-bold mr-1"}>Tên {`${isProject ? "dự án" : isPhase ? "giai đoạn" : "công việc"}:`}</Col>
                <Col>{`${name}`} </Col>
            </Row>
            <Row className={"mb-2"}>
                <Col span={10}
                     className={"font-bold mr-1"}>Trạng thái:</Col>
                <Col>{renderStatus(status)} </Col>
            </Row>
            <Row className={"mb-2"}>
                <Col span={10} className={"font-bold mr-1"}>Thời gian: </Col>
                <Col>{`${dayjs(start).format("DD/MM/YYYY")} - ${dayjs(end).format("DD/MM/YYYY")}`}</Col>
            </Row>
            <Row>
                <Col span={10} className={"font-bold mr-1"}>Tiến độ:</Col>
                <Col>{progress}%</Col>
            </Row>
        </div>
    );
};

