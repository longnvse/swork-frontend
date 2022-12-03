import { Col, Row } from "antd";
import React from "react";
import ProjectViewGeneral from "./elements/General";
import ProjectViewSummary from "./elements/Summary";

const ProjectViewDetail = ({ data, teamData, phaseData }) => {
    return (
        <Row gutter={12}>
            <ProjectViewGeneral data={data} />
            <Col span={17}>
                <ProjectViewSummary
                    data={data}
                    teamData={teamData}
                    phaseData={phaseData}
                />
            </Col>
        </Row>
    );
};

export default ProjectViewDetail;
