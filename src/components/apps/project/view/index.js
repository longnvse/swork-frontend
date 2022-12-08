import React, {useEffect, useState} from "react";
import {Col, Row, Tabs} from "antd";
import {approvalProject, getProject} from "../../../../api/project";
import ProjectViewPhase from "./tabs/Phase";
import ProjectViewResource from "./tabs/Resource";
import ProjectViewWork from "./tabs/Work";
import {useParams} from "react-router-dom";
import TeamList from "../../team";
import ProjectViewDetail from "./tabs/Project";
import {getTeamPages} from "../../../../api/team";
import {getPhasePages} from "../../../../api/phase";
import ButtonTab from "../../../common/button/ButtonTab";
import {CiViewTimeline} from "react-icons/ci";
import ButtonStatus from "../../work/common/button-status";

function ProjectView(props) {
    const [data, setData] = useState({});
    const {id} = useParams();
    const [teamData, setTeamData] = useState([]);
    const [phaseData, setPhaseData] = useState([]);

    useEffect(() => {
        getProject(id).then((response) => {
            setData(response?.data);
        });

        getTeamPages({projectId: id}).then((response) => {
            setTeamData(response?.data.items);
        });

        getPhasePages(id).then((response) => {
            setPhaseData(response?.data.items);
        });
    }, [id]);

    const tabItems = [
        {
            label: "Chi tiết",
            key: "general",
            children: (
                <ProjectViewDetail
                    data={data}
                    teamData={teamData}
                    phaseData={phaseData}
                />
            ),
        },
        {
            label: "Giai đoạn",
            key: "phase",
            children: <ProjectViewPhase projectId={data.id}/>,
        },
        {
            label: "Đội nhóm",
            key: "team",
            children: <TeamList projectId={data.id}/>,
        },
        {
            label: "Tài nguyên",
            key: "resource",
            children: <ProjectViewResource projectId={data.id || id}/>,
        },
        {
            label: "Công việc",
            key: "work",
            children: <ProjectViewWork projectId={data.id || id} phaseId={0}/>,
        },
    ];

    const tabExtra = (
        <Row gutter={8}>
            <Col>
                <ButtonStatus status={data?.status} updateStatus={(status) => approvalProject(id, status)}/>
            </Col>
            <Col>
                <ButtonTab
                    icon={<CiViewTimeline style={{fontSize: 20}}/>}
                    title={"Gantt chart"}
                />
            </Col>
        </Row>
    )

    return (
        <div>
            <Tabs
                items={tabItems}
                tabBarExtraContent={tabExtra}
                destroyInactiveTabPane={true}
            />
        </div>
    );
}

export default ProjectView;
