import {Col, Progress, Row} from "antd";
import moment from "moment";
import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import SWDescription from "../../../../common/description";
import {renderStatus} from "../../../../common/status";
import {viewWorkFirstColumn, viewWorkSecondColumn} from "../columns";

const ViewWorkGeneral = ({data}) => {
    const {id} = useParams();
    const dateFormat = "DD/MM/YYYY";
    const [workData, setWorkData] = useState({});

    const mapData = (data) => {
        return {
            firstColumn: {
                name: data?.name,
                status: renderStatus(data?.status),
                handles: data?.handles?.map((handle, index) => {
                    return <span key={index}>{handle?.memberName}</span>;
                }),
                manages: data?.manages.map((manage, index) => {
                    return <span key={index}>{manage?.memberName}</span>;
                }),
                participates: data?.participates.map((participate, index) => {
                    return <span key={index}>{participate?.memberName}</span>;
                }),
                date: `${moment(data?.startDate).format(dateFormat)} - ${moment(
                    data?.endDate,
                ).format(dateFormat)}`,
            },
            secondColumn: {
                progress: <Progress percent={data?.progress}/>,
                project: (
                    <Link to={`/project/view/${data?.projectId}`}>
                        {data?.projectName}
                    </Link>
                ),
                phase: (
                    <Link to={`/project/view-phase/${data?.phaseId}`}>
                        {data?.phaseName}
                    </Link>
                ),
                checklists: data?.checklists,
                description: data?.description,
            },
            ...data,
        };
    };

    useEffect(() => {
        setWorkData(mapData(data));
    }, [data]);

    return (
        <Row gutter={12}>
            <Col span={12}>
                <SWDescription
                    span={1}
                    dataSource={workData?.firstColumn}
                    columns={viewWorkFirstColumn}
                />
            </Col>
            <Col span={12}>
                <SWDescription
                    span={1}
                    dataSource={workData?.secondColumn}
                    columns={viewWorkSecondColumn}
                />
            </Col>
        </Row>
    );
};

export default ViewWorkGeneral;
