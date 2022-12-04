import {Col, Row} from "antd";
import React from "react";
import ProjectViewGeneral from "./elements/General";
import ProjectViewSummary from "./elements/Summary";
import DashboardStatusWork from "../../dashboard/status-work";

const ProjectViewDetail = ({data, teamData, phaseData}) => {
    return (
        <Row gutter={12}>
            <ProjectViewGeneral data={data}/>
            <Col span={17}>
                <Row>
                    <ProjectViewSummary
                        data={data}
                        teamData={teamData}
                        phaseData={phaseData}
                    />
                </Row>
                <Row className={"mt-1.5"}>
                    <Col span={8}>
                        <div style={{
                            paddingTop: 13,
                            paddingLeft: 26,
                        }}>
                        <span>
                            <strong>Công việc</strong>
                        </span>
                            {/*<Link to={`/workplace/work/project/all/view/${id}?tabKey=work`}*/}
                            {/*      style={{fontSize: 12, paddingLeft: 7}}>*/}
                            {/*    <i>Chi tiết</i>*/}
                            {/*</Link>*/}
                        </div>
                        <div style={{
                            paddingTop: 15,
                            width: '100%'
                        }}>
                            <DashboardStatusWork projectId={data?.id}/>
                        </div>
                    </Col>
                </Row>
            </Col>
        </Row>
    );
};

export default ProjectViewDetail;
