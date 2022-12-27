import React, {useEffect, useState} from "react";
import {Col, Row} from "antd";
import {approvalProject, getProject} from "../../../../api/project";
import ProjectViewPhase from "./tabs/Phase";
import ProjectViewResource from "./tabs/Resource";
import ProjectViewWork from "./tabs/Work";
import {useParams, useSearchParams} from "react-router-dom";
import TeamList from "../../team";
import ProjectViewDetail from "./tabs/Project";
import {getTeamPages} from "../../../../api/team";
import {getPhasePages} from "../../../../api/phase";
import ButtonTab from "../../../common/button/ButtonTab";
import ButtonStatus from "../../work/common/button-status";
import SWTabs from "../../../common/tabs";
import {useDispatch, useSelector} from "react-redux";
import {setHeader} from "../../../../redux/actions/common/actions";
import ButtonDrawer from "../../../common/button/ButtonDrawer";
import {ADD, MODULE_ID, UPDATE} from "../../../common/Constant";
import {EditOutlined, PlusOutlined, UsergroupAddOutlined,} from "@ant-design/icons";
import ProjectForm from "../form";
import ButtonModal from "../../../common/button/ButtonModal";
import ProjectMemberForm from "../form/update-member-form";
import SWFile from "../../../common/file";
import ProjectViewKanban from "./tabs/Kanban";
import ProjectViewGanttChart from "./tabs/Gantt-Chart";
import PhaseForm from "../../phase/form";
import WorkForm from "../../work/form";
import ResourceForm from "../../resource/form";
import TeamForm from "../../team/form";

const ADD_BTN = {
    phase: "giai đoạn",
    team: "đội nhóm",
    resource: "tài nguyên",
    work: "công việc",
};

function ProjectView(props) {
    const [data, setData] = useState({});
    const {id} = useParams();
    const [teamData, setTeamData] = useState([]);
    const [phaseData, setPhaseData] = useState([]);
    const {reload} = useSelector((state) => state.commonReducer);
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();
    let tabKey = searchParams.get("tab");
    const keys = ["phase", "team", "resource", "work"];

    useEffect(() => {
        dispatch(setHeader("Chi tiết dự án"));
    }, []);

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
    }, [id, reload]);

    const tabItems = [
        {
            label: "Chi tiết",
            key: "general",
            children: (
                <ProjectViewDetail
                    data={data}
                    teamData={teamData}
                    phaseData={phaseData}
                    role={data?.role}
                />
            ),
        },
        {
            label: "Kanban",
            key: "kanban",
            children: <ProjectViewKanban role={data?.role} projectId={data.id}/>,
        },
        {
            label: "Gantt Chart",
            key: "gantt chart",
            children: <ProjectViewGanttChart role={data?.role} projectId={data.id}/>,
        },
        {
            label: "Giai đoạn",
            key: "phase",
            children: <ProjectViewPhase role={data?.role} projectId={data.id}/>,
        },
        {
            label: "Đội nhóm",
            key: "team",
            children: <TeamList role={data?.role} projectId={data.id}/>,
        },
        {
            label: "Tài nguyên",
            key: "resource",
            children: (
                <ProjectViewResource
                    hiddenBtn={true}
                    projectId={data.id || id}
                    role={data?.role}
                />
            ),
        },
        {
            label: "Công việc",
            key: "work",
            children: (
                <ProjectViewWork
                    hiddenBtn={true}
                    projectId={data.id || id}
                    phaseId={0}
                    role={data?.role}
                    inProject={true}
                />
            ),
        },
        {
            label: "Đính kèm",
            key: "attach",
            children: (
                <SWFile
                    projectId={data.id}
                    appId={`${data.id}`}
                    moduleId={MODULE_ID.PROJECT}
                    role={data?.role}
                />
            ),
        },
    ];

    const renderForm = (tabKey) => {
        switch (tabKey) {
            case "phase":
                return <PhaseForm projectId={id || data?.id}/>;
            case "team":
                return <TeamForm projectId={id || data?.id}/>;
            case "resource":
                return <ResourceForm projectId={id || data?.id}/>;
            case "work":
                return <WorkForm projectId={id || data?.id}/>;
            default:
                break;
        }
    };

    const tabExtra = (
        <Row gutter={8}>
            {keys?.includes(tabKey) ? (
                <Col>
                    <ButtonDrawer
                        title={`Thêm ${ADD_BTN[tabKey]}`}
                        formId={`${tabKey}-form`}
                        mode={ADD}
                        button={
                            <ButtonTab
                                icon={<PlusOutlined style={{fontSize: 20}}/>}
                                title={
                                    <span className="capitalize">
                                        {ADD_BTN[tabKey]}
                                    </span>
                                }
                                disable={data?.role === "participate"}
                            />
                        }
                    >
                        {renderForm(tabKey)}
                    </ButtonDrawer>
                </Col>
            ) : null}
            <Col>
                <ButtonStatus
                    status={data?.status}
                    updateStatus={(status) => approvalProject(id, status)}
                    disable={data?.role === 'participate'}
                />
            </Col>
            <Col>
                <ButtonModal
                    title={"Thêm người thực hiện"}
                    formId={"project-member-form"}
                    mode={UPDATE}
                    button={
                        <ButtonTab
                            icon={
                                <UsergroupAddOutlined
                                    style={{fontSize: 20}}
                                />
                            }
                            disable={data?.role !== "manage"}
                            title={"Người thực hiện"}
                        />
                    }
                >
                    <ProjectMemberForm projectData={data}/>
                </ButtonModal>
            </Col>
            <Col>
                <ButtonDrawer
                    title={"Cập nhật dự án"}
                    formId={"project-form"}
                    mode={UPDATE}
                    button={
                        <ButtonTab
                            icon={<EditOutlined style={{fontSize: 20}}/>}
                            title={"Sửa dự án"}
                            disable={data?.role !== "manage"}
                        />
                    }
                >
                    <ProjectForm id={id}/>
                </ButtonDrawer>
            </Col>
        </Row>
    );

    return (
        <div>
            <SWTabs items={tabItems} tabBarExtraContent={tabExtra}/>
        </div>
    );
}

export default ProjectView;
