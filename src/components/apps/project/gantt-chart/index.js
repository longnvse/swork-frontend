import React, {useEffect, useState} from 'react';
import {Gantt} from "gantt-task-react";
import {getProjectPages} from "../../../../api/project";
import {message_error} from "../../../common/Constant";
import dayjs from "dayjs";

const ProjectGanttChart = (props) => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        getProjectPages({page: 1, pageSize: Number.MAX_VALUE}).then(res => {
            setTasks(res.data?.items?.map(mapData) || []);
        }).catch(message_error)
    }, []);

    useEffect(() => {
        console.log(JSON.stringify(tasks));
    }, [tasks])

    const mapData = (item) => ({
        start: dayjs(item.startDate).toDate(),
        end: dayjs(item.endDate).toDate(),
        name: item.name,
        id: item.id,
        type: 'task',
        progress: item.progress,
    })

    return (tasks.length > 0 && <Gantt
        tasks={tasks}
        locale={"vi"}
        listCellWidth={""}
    />);
};

ProjectGanttChart.propTypes = {};

export default ProjectGanttChart;
