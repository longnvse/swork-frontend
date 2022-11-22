import React, {useEffect, useState} from 'react';
import {Tabs} from "antd";
import ProjectViewGeneral from "./tabs/General";
import {getProject} from "../../../../api/project";
import ProjectViewPhase from "./tabs/Phase";
import ProjectViewResource from "./tabs/Resource";
import ProjectViewWork from "./tabs/Work";
import {useParams} from "react-router-dom";

function ProjectView(props) {
    const [data, setData] = useState({});
    const {id} = useParams();

    useEffect(() => {
        getProject(id).then(response => {
            setData(response?.data)
        })
    }, [id])

    const tabItems = [
        {
            label: "Chi tiết",
            key: "general",
            children: <ProjectViewGeneral data={data}/>
        },
        {
            label: "Giai đoạn",
            key: "phase",
            children: <ProjectViewPhase projectId={data.id}/>
        },
        {
            label: "Tài nguyên",
            key: "resource",
            children: <ProjectViewResource/>
        },
        {
            label: "Công việc",
            key: "work",
            children: <ProjectViewWork/>
        },

    ]

    return (
        <div>
            <Tabs
                items={tabItems}
            />
        </div>
    );
}

export default ProjectView;