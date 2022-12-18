import React, {useEffect, useState} from "react";
import {Col, Row} from "antd";
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
import ButtonStatus from "../../work/common/button-status";
import SWTabs from "../../../common/tabs";
import {useDispatch, useSelector} from "react-redux";
import {setHeader} from "../../../../redux/actions/common/actions";
import ButtonDrawer from "../../../common/button/ButtonDrawer";
import {UPDATE} from "../../../common/Constant";
import {EditOutlined, UsergroupAddOutlined} from "@ant-design/icons";
import ProjectForm from "../form";
import ButtonModal from "../../../common/button/ButtonModal";
import ProjectMemberForm from "../form/update-member-form";

function ProjectView(props) {
    const [data, setData] = useState({});
    const {id} = useParams();
    const [teamData, setTeamData] = useState([]);
    const [phaseData, setPhaseData] = useState([]);
    const {reload} = useSelector(state => state.commonReducer);
    const dispatch = useDispatch();

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

    const tabItems = [{
        label: "Chi tiết", key: "general", children: (<ProjectViewDetail
            data={data}
            teamData={teamData}
            phaseData={phaseData}
        />),
    }, {
        label: "Giai đoạn", key: "phase", children: <ProjectViewPhase projectId={data.id}/>,
    }, {
        label: "Đội nhóm", key: "team", children: <TeamList projectId={data.id}/>,
    }, {
        label: "Tài nguyên", key: "resource", children: <ProjectViewResource projectId={data.id || id}/>,
    }, {
        label: "Công việc", key: "work", children: <ProjectViewWork projectId={data.id || id} phaseId={0}/>,
    },];

    const tabExtra = (<Row gutter={8}>
        <Col>
            <ButtonStatus status={data?.status} updateStatus={(status) => approvalProject(id, status)}/>
        </Col>
        <Col>
            <ButtonModal
                title={"Thêm người thực hiện"}
                formId={"project-form"}
                mode={UPDATE}
                button={<ButtonTab
                    icon={<UsergroupAddOutlined style={{fontSize: 20}}/>}
                    title={"Người thực hiện"}
                />}
            >
                <ProjectMemberForm projectData={data}/>
            </ButtonModal>
        </Col>
        <Col>
            <ButtonDrawer
                title={"Cập nhật dự án"}
                formId={"project-form"}
                mode={UPDATE}
                button={<ButtonTab
                    icon={<EditOutlined style={{fontSize: 20}}/>}
                    title={"Sửa dự án"}
                />}
            >
                <ProjectForm id={id}/>
            </ButtonDrawer>
        </Col>
    </Row>)

    return (<div>
        <SWTabs
            items={tabItems}
            tabBarExtraContent={tabExtra}
        />
    </div>);
}

export default ProjectView;
