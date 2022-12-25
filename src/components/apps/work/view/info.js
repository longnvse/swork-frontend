import React, {useEffect, useState} from 'react';
import {Col, Progress, Row, Skeleton} from "antd";
import {RxCalendar, RxGear} from "react-icons/rx";
import {renderStatus} from "../../../common/status";
import dayjs from "dayjs";
import {FiUsers} from "react-icons/fi";
import AccountGroup from "../../../common/account/group";
import {getWork} from "../../../../api/work";
import {FormOutlined} from "@ant-design/icons";
import {progressTypeString} from "../../../common/Constant";

const WorkViewInfo = ({workId}) => {


    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({});
    useEffect(() => {
        setLoading(true);

        getWork(workId).then((res) => {
            setData(res.data);
            setTimeout(() => {
                setLoading(false);
            }, 500)
        })

    }, [workId]);

    return (
        <Skeleton
            active={true}
            loading={loading}
            paragraph={{
                rows: 20
            }}
        >
            <Row className={"items-center justify-between"}>
                <Col>Tiến độ</Col>
                <Col>{data.progress}%</Col>
            </Row>
            <Row className={"items-center justify-between"}>
                <Col className={"text-[11px]"}>{progressTypeString[data.progressType]}</Col>
            </Row>
            <Row>
                <Progress className={"w-[110%]"} percent={data.progress} showInfo={false}/>
            </Row>

            <Row className={"items-center justify-between mt-4"}>
                <Col><RxGear style={{fontSize: 16}} className={"translate-y-0.5"}/> Trạng thái</Col>
                <Col>{renderStatus(data.status)}</Col>
            </Row>

            <Row className={"items-center justify-between mt-4"}>
                <Col><RxCalendar style={{fontSize: 16}} className={"translate-y-0.5"}/> Thời gian</Col>
                <Col>{`${dayjs(data.startDate).format("DD/MM/YYYY")} - ${dayjs(data.endDate).format("DD/MM/YYYY")}`}</Col>
            </Row>

            <Row className={"items-center justify-between mt-4"}>
                <Col><FiUsers style={{fontSize: 16}} className={"translate-y-0.5"}/> Nguời quản trị</Col>
                <Col><AccountGroup
                    positionTooltip={"left"}
                    accountIds={data.manages?.map(item => item.memberId)}/></Col>
            </Row>

            <Row className={"items-center justify-between mt-4"}>
                <Col><FiUsers style={{fontSize: 16}} className={"translate-y-0.5"}/> Nguời thực hiện</Col>
                <Col><AccountGroup positionTooltip={"left"}
                                   accountIds={data.handles?.map(item => item.memberId)}/></Col>
            </Row>

            <Row className={"items-center justify-between mt-4"}>
                <Col><FiUsers style={{fontSize: 16}} className={"translate-y-0.5"}/> Nguời theo dõi</Col>
                <Col><AccountGroup positionTooltip={"left"} accountIds={data.participates?.map(item => item.memberId)}/></Col>
            </Row>

            <Row className={"items-center justify-between mt-4"}>
                <Col><FormOutlined style={{fontSize: 16}} className={"translate-y-0.5"}/> Mô tả</Col>
                <Col>{data.description}</Col>
            </Row>


        </Skeleton>
    );
};

export default WorkViewInfo;
