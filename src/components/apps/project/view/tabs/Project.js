import {Col, Row} from "antd";
import React from "react";
import ProjectViewGeneral from "./elements/General";
import ProjectViewSummary from "./elements/Summary";
import DashboardStatusWork from "../../dashboard/status-work";
import CommentList from "../../../../common/comment/list";
import {CLASS_PK_NAME} from "../../../../common/Constant";
import DashboardProgressPhase from "../../dashboard/phase-progress";
import {Link} from "react-router-dom";

const ProjectViewDetail = ({data, teamData, phaseData}) => {
    return (
        <Row gutter={12}>
            <Col
                span={7}
            >
                <Row
                    className={"rounded-[8px] border-solid border-[1px] border-[#ccc] w-full h-fit"}>
                    <ProjectViewGeneral data={data}/>
                </Row>
                <Row
                    className={"rounded-[8px] border-solid border-[1px] border-[#ccc] mt-1.5 p-6 w-full"}
                >
                    <Row className={"w-full"}>
                        <strong>Thảo luận</strong>
                    </Row>
                    <Row className={"w-full h-[400px] overflow-auto"}>
                        <CommentList classPkId={data.id} classPkName={CLASS_PK_NAME.PROJECT}/>
                    </Row>
                </Row>
            </Col>
            <Col span={17}>
                <Row>
                    <ProjectViewSummary
                        data={data}
                        teamData={teamData}
                        phaseData={phaseData}
                    />
                </Row>
                <Row className={"mt-1.5 h-fit"}>
                    <Col className={"rounded-[8px] border-solid border-[1px] border-[#ccc] p-6 w-full"}>
                        <div>
                        <span>
                            <strong>Giai đoạn</strong>
                        </span>
                            <Link to={`/project/view/${data.id}?tab=phase`}
                                  style={{fontSize: 12, paddingLeft: 7}}>
                                <i>Chi tiết</i>
                            </Link>
                        </div>
                        <div style={{
                            paddingTop: 15,
                            width: '100%'
                        }}>
                            <DashboardProgressPhase projectId={data.id}/>
                        </div>
                    </Col>
                </Row>
                <Row className={"mt-1.5"}>
                    <Col
                        span={10}
                        className={"rounded-[8px] border-solid border-[1px] border-[#ccc] p-6 w-full"}>
                        <div>
                        <span>
                            <strong>Công việc</strong>
                        </span>
                            <Link to={`/project/view/${data.id}?tab=work`}
                                  style={{fontSize: 12, paddingLeft: 7}}>
                                <i>Chi tiết</i>
                            </Link>
                        </div>
                        <div style={{
                            paddingTop: 15,
                            width: '100%'
                        }}>
                            <DashboardStatusWork projectId={data?.id}/>
                        </div>
                    </Col>
                </Row>
                {/*<Row*/}
                {/*    className={"rounded-[8px] border-solid border-[1px] border-[#ccc] mt-1.5 p-6 w-full"}*/}
                {/*>*/}
                {/*    <Row className={"w-full"}>*/}
                {/*        <strong>Thảo luận</strong>*/}
                {/*    </Row>*/}
                {/*    <Row className={"w-full"}>*/}
                {/*        <CommentList classPkId={data.id} classPkName={CLASS_PK_NAME.PROJECT}/>*/}
                {/*    </Row>*/}
                {/*</Row>*/}
            </Col>
        </Row>
    );
};

export default ProjectViewDetail;
