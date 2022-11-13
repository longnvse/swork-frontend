import React, {useEffect, useState} from 'react';
import {Tabs} from "antd";
import ProjectViewGeneral from "./tabs/General";
import {getProject} from "../../../../api/project";
import ProjectViewPhase from "./tabs/Phase";
import ProjectViewResource from "./tabs/Resource";
import ProjectViewWork from "./tabs/Work";
import ProjectViewAttach from "./tabs/Attach";

const {TabPane} = Tabs;

function ProjectView({id}) {
    const [projectData, setProjectData] = useState({});

    useEffect(() => {
        getProject(id).then(response => {
            setProjectData(response?.data)
        })
    }, [id])

    return (
        <div>
            <Tabs defaultActiveKey={"general"}>
                <TabPane tab={"Chi tiết giai đoạn"} tabKey={"general"}>
                    <ProjectViewGeneral/>
                </TabPane>
                <TabPane tab={"Giai đoạn"} tabKey={"phase"}>
                    <ProjectViewPhase/>
                </TabPane>
                <TabPane tab={"Tài nguyên"} tabKey={"resource"}>
                    <ProjectViewResource/>
                </TabPane>
                <TabPane tab={"Công việc"} tabKey={"work"}>
                    <ProjectViewWork/>
                </TabPane>
                <TabPane tab={"Đính kèm"} tabKey={"attach"}>
                    <ProjectViewAttach/>
                </TabPane>
            </Tabs>
        </div>
    );
}

export default ProjectView;