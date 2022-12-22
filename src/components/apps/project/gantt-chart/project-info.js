import React, {useEffect, useState} from 'react';
import {Col, Progress, Row, Skeleton} from "antd";
import {renderStatus} from "../../../common/status";
import {getProject} from "../../../../api/project";
import {RxCalendar, RxGear} from "react-icons/rx";
import dayjs from "dayjs";
import {FiUsers} from "react-icons/fi";
import AccountGroup from "../../../common/account/group";

const ProjectInfo = ({projectId}) => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({});
    useEffect(() => {
        setLoading(true);

        getProject(projectId).then((res) => {
            setData(res.data);
            setTimeout(() => {
                setLoading(false);
            }, 500)
        })

    }, [projectId]);


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
                <Col><RxCalendar style={{fontSize: 16}} className={"translate-y-0.5"}/> Thời gian dự kiến</Col>
                <Col>{`${dayjs(data.startDate).format("DD/MM/YYYY")} - ${dayjs(data.endDate).format("DD/MM/YYYY")}`}</Col>
            </Row>

            <Row className={"items-center justify-between mt-4"}>
                <Col><RxCalendar style={{fontSize: 16}} className={"translate-y-0.5"}/> Thời gian bắt đầu thực tế</Col>
                <Col>{data.actualStartDate && dayjs(data.actualStartDate).format("DD/MM/YYYY")}</Col>
            </Row>

            <Row className={"items-center justify-between mt-4"}>
                <Col><FiUsers style={{fontSize: 16}} className={"translate-y-0.5"}/> Nguời quản trị</Col>
                <Col><AccountGroup accountIds={data.manages?.map(item => item.memberId)}/></Col>
            </Row>
            <Row className={"items-center justify-between mt-4"}>
                <Col><FiUsers style={{fontSize: 16}} className={"translate-y-0.5"}/> Nguời thực hiện</Col>
                <Col><AccountGroup accountIds={data.handles?.map(item => item.memberId)}/></Col>
            </Row>

            <Row className={"items-center justify-between mt-4"}>
                <Col><FiUsers style={{fontSize: 16}} className={"translate-y-0.5"}/> Nguời theo dõi</Col>
                <Col><AccountGroup accountIds={data.participates?.map(item => item.memberId)}/></Col>
            </Row>

        </Skeleton>
    );
};

ProjectInfo.propTypes = {};

export default ProjectInfo;
