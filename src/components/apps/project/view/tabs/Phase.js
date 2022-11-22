import React from 'react';
import CommonList from "../../../../common/list";
import {getProjectPages} from "../../../../../api/project";
import {columnPhase} from "../../common/columns";

function ProjectViewPhase({projectId}) {

    const load = (params) => {
        params.filter = `projectId eq '${projectId}'`;

        return getProjectPages(params);
    }

    const mapData = (item) => ({
        key: item.id,
        ...item
    })

    return (
        <CommonList mapData={mapData} load={load} columns={columnPhase}/>
    );
}

export default ProjectViewPhase;