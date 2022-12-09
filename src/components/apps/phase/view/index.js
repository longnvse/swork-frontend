import {Col, Collapse, Row} from "antd";
import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {getPhase} from "../../../../api/phase";
import {DATE_FORMAT} from "../../../common/Constant";
import SWDescription from "../../../common/description";
import {renderStatus} from "../../../common/status";
import ProjectViewResource from "../../project/view/tabs/Resource";
import ProjectViewWork from "../../project/view/tabs/Work";
import TeamList from "../../team";
import {viewPhaseFirstColumns, viewPhaseSecondColumns} from "./columns";
import dayjs from "dayjs";
import SWTabs from "../../../common/tabs";

const PhaseView = () => {
    const {id} = useParams();
    const [phaseData, setPhaseData] = useState({});

    const mapData = (data) => {
        return {
            firstColumn: {
                name: data?.name,
                phaseManages: data?.phaseManages?.map((phaseManage, index) => {
                    return <span key={index}>{phaseManage?.accountName}</span>;
                }),
                status: renderStatus(data?.status),
                date: `${dayjs(data?.startDate).format(
                    DATE_FORMAT,
                )} - ${dayjs(data?.endDate).format(DATE_FORMAT)}`,
            },
            secondColum: {
                projectName: (
                    <Link to={`/project/view/${data?.projectId}`}>
                        {data?.projectName}
                    </Link>
                ),
                status: renderStatus(data?.status),
                description: data?.description,
            },
        };
    };

    useEffect(() => {
        if (id) {
            getPhase(id).then((response) => {
                setPhaseData(mapData(response?.data));
            });
        }
    }, [id]);

    const tabItems = [
        {
            key: "general",
            label: "Thông tin chung",
            children: <>

                <Row gutter={12}>
                    <Col span={12}>
                        <SWDescription
                            span={1}
                            dataSource={phaseData?.firstColumn}
                            columns={viewPhaseFirstColumns}
                        />
                    </Col>
                    <Col span={12}>
                        <SWDescription
                            span={1}
                            dataSource={phaseData?.secondColum}
                            columns={viewPhaseSecondColumns}
                        />
                    </Col>
                </Row>
                <Collapse defaultActiveKey={"work"} className="mt-3">
                    <Collapse.Panel header="Công việc" key={"work"}>
                        <ProjectViewWork
                            projectId={phaseData?.projectId}
                            phaseId={id}
                        />
                    </Collapse.Panel>
                </Collapse>
            </>
        },
        {
            key: "team",
            label: "Đội nhóm",
            children: <TeamList/>
        },
        {
            key: "resource",
            label: "Tài nguyên",
            children: <ProjectViewResource/>
        },
        {
            key: "attach",
            label: "Đính kèm",
            children: "Attach tab"
        }
    ]

    return (
        <SWTabs
            items={tabItems}
        />
    );
};

export default PhaseView;
