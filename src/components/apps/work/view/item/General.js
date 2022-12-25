import {Col, Progress, Row} from "antd";
import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import SWDescription from "../../../../common/description";
import {viewWorkFirstColumn, viewWorkSecondColumn} from "../columns";
import {renderStatus} from "../../../../common/status";
import dayjs from "dayjs";
import AccountGroup from "../../../../common/account/group";

const ViewWorkGeneral = ({data}) => {
    const dateFormat = "DD/MM/YYYY";
    const [workData, setWorkData] = useState({});

    const mapData = (data) => {
        return {
            firstColumn: {
                name: data?.name,
                status: renderStatus(data?.status),
                handles: <AccountGroup accountIds={data?.handles?.map(item => item.memberId)}/>,
                manages: <AccountGroup accountIds={data?.manages?.map(item => item.memberId)}/>,
                participates: <AccountGroup accountIds={data?.participates?.map(item => item.memberId)}/>,
                date: `${dayjs(data?.startDate).format(dateFormat)} - ${dayjs(
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
