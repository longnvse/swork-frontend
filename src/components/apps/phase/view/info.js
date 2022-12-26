import React, {useEffect, useState} from 'react';
import {Col, Progress, Row, Skeleton} from "antd";
import {RxCalendar, RxGear} from "react-icons/rx";
import {renderStatus} from "../../../common/status";
import dayjs from "dayjs";
import {FiUsers} from "react-icons/fi";
import AccountGroup from "../../../common/account/group";
import {getPhase} from "../../../../api/phase";

const PhaseViewInfo = ({phaseId}) => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({});
    useEffect(() => {
        setLoading(true);

        getPhase(phaseId).then((res) => {
            setData(res.data);
            setTimeout(() => {
                setLoading(false);
            }, 500)
        })

    }, [phaseId]);


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
                <Col><AccountGroup positionTooltip={"left"} accountIds={data.phaseManages?.map(item => item.accountId)}/></Col>
            </Row>

            <Row className={"items-center justify-between mt-4"}>
                <Col><FiUsers style={{fontSize: 16}} className={"translate-y-0.5"}/> Mô tả</Col>
                <Col>{data.description}</Col>
            </Row>


        </Skeleton>
    );
};

export default PhaseViewInfo;
