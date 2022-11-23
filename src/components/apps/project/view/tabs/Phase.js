import React from 'react';
import CommonList from "../../../../common/list";
import {columnPhase} from "../../common/columns";
import {getPhasePages} from "../../../../../api/phase";

function ProjectViewPhase({projectId}) {

    const load = (params) => {
        params.filter = `projectId eq '${projectId}'`;

        return getPhasePages(params);
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