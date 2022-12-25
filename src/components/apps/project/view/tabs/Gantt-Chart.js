import React, {useEffect, useMemo, useState} from 'react';
import {getGanttChartDataProject} from "../../../../../api/project";
import {Gantt, ViewMode} from "gantt-task-react";
import {message_error} from "../../../../common/Constant";
import dayjs from "dayjs";
import {progressColorGanttChart, statusColorGanttChart, statusColorGanttChartSelected} from "../../../../common/status";
import {Button, Col, Layout, Radio, Row} from "antd";
import {Content} from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import {CloseOutlined, ProjectOutlined} from "@ant-design/icons";
import {TooltipGanttChart} from "./elements/TooltipGanttChart";
import PhaseViewInfo from "../../../phase/view/info";
import WorkViewInfo from "../../../work/view/info";
import {updateWorkDate} from "../../../../../api/work";
import {useSelector} from "react-redux";

const ProjectViewGanttChart = ({projectId}) => {

    const [tasks, setTasks] = useState([]);
    const [collapsed, setCollapsed] = useState(true);
    const [viewMode, setViewMode] = useState(ViewMode.Day);
    const [selectedProject, setSelectedProject] = useState({});
    const [selectedProjectName, setSelectedProjectName] = useState();
    const {reload} = useSelector(state => state.commonReducer);

    useEffect(() => {
        if (reload && projectId) {
            fetchData();
        }
    }, [reload]);

    useEffect(() => {
        fetchData();
    }, [projectId]);

    const fetchData = () => {
        getGanttChartDataProject(projectId).then(res => {
            const {phases, works} = res.data;
            console.log([...phases.flatMap(mapPhase), ...works.flatMap(mapWork)])
            setTasks([...phases.flatMap(mapPhase), ...works.flatMap(mapWork)]);

        }).catch(message_error)
    }

    const columnWidth = useMemo(() => {
        switch (viewMode) {
            case ViewMode.Day:
                return 60;
            case ViewMode.Week:
                return 200;
            case ViewMode.Month:
                return 300;
            case ViewMode.Year:
                return 540;
            default:
                return 60
        }
    }, [viewMode]);

    const mapPhase = (item) => {

        const workChildren = item.works?.flatMap((work) => mapWork(work, item)) || [];

        return [
            {
                start: dayjs(item.startDate).toDate(),
                end: dayjs(item.endDate).toDate(),
                name: item.name,
                id: `${item.id} - ${item.name}`,
                phaseId: item.id,
                type: 'project',
                progress: item.progress,
                isPhase: true,
                status: item.status,
                styles: {
                    backgroundColor: statusColorGanttChart(item.status),
                    backgroundSelectedColor: statusColorGanttChartSelected(item.status),
                    progressColor: progressColorGanttChart(item.status),
                    progressSelectedColor: statusColorGanttChartSelected(item.status)
                },
                fontSize: '40px'
            },
            ...workChildren
        ]
    }

    const mapWork = (item, parent) => {

        const workChildren = item.works?.flatMap((item) => mapWork(item, parent));
        const {id, name} = parent;
        return [
            {
                start: dayjs(item.startDate).toDate(),
                end: dayjs(item.endDate).toDate(),
                name: item.name,
                id: item.id,
                type: 'task',
                progress: item.progress,
                dependencies: [`${id} - ${name}`],
                status: item.status,
                styles: {
                    backgroundColor: statusColorGanttChart(item.status),
                    backgroundSelectedColor: statusColorGanttChartSelected(item.status),
                    progressColor: progressColorGanttChart(item.status),
                    progressSelectedColor: statusColorGanttChartSelected(item.status)
                },
                parentName: name,
                fontSize: '40px'
            },
            ...workChildren
        ]
    }

    const onDateChange = ({id, start, end, isPhase}) => {
        if (!isPhase) {
            return updateWorkDate(id, start, end).then(() => {
                return true;
            }).catch(message_error);
        }
    }

    const onClick = ({id, name, isPhase, phaseId}) => {
        console.log(id, name, isPhase, phaseId);
        setSelectedProject({isPhase, id, phaseId});
        setSelectedProjectName(name);
        setCollapsed(false);
    }

    const onChangeViewMode = (e) => {
        setViewMode(e.target.value);
    }

    return (tasks.length > 0 && <Layout className={"rounded-[8px]"}>
        <Content className={"bg-white"}>
            <Row className={"ml-2 mb-5"}>
                <Col className={"mr-2"}>Xem theo:</Col>
                <Col>
                    <Radio.Group
                        onChange={onChangeViewMode}
                        value={viewMode}
                    >
                        <Radio value={ViewMode.Day}>Ngày</Radio>
                        <Radio value={ViewMode.Week}>Tuần</Radio>
                        <Radio value={ViewMode.Month}>Tháng</Radio>
                        <Radio value={ViewMode.Year}>Năm</Radio>
                    </Radio.Group>
                </Col>
            </Row>
            <Gantt
                tasks={tasks}
                locale={"vi"}
                onDateChange={onDateChange}
                onDoubleClick={onClick}
                listCellWidth={""}
                ganttHeight={670}
                columnWidth={columnWidth}
                viewMode={viewMode}
                onExpanderClick={() => {
                }}
                TooltipContent={TooltipGanttChart}
            />
        </Content>
        <Sider
            collapsed={collapsed}
            collapsedWidth={0}
            width={350}
            theme={"light"}
            className={"shadow-l"}
            style={{
                borderRadius: 8, boxShadow: "-5px 0 5px -5px #171a1f", marginLeft: !collapsed ? '8px' : 0
            }}
        >
            <Row className={"justify-between items-center p-5"}
                 style={{
                     borderBottom: '1px solid #cccccc66'
                 }}
            >
                <Col>
                    <Row className={"font-bold text-[16px] items-center"} gutter={12}>
                        <Col>
                            <Button type={"primary"}
                                    className={"rounded-3xl h-[40px] flex items-center justify-center"}
                                    style={{
                                        width: '40px'
                                    }}
                                    icon={<ProjectOutlined style={{fontSize: 16}}/>}/>
                        </Col>
                        <Col>{selectedProjectName}</Col>
                    </Row>
                </Col>
                <Col>
                    <Button
                        type={"text"}
                        icon={<CloseOutlined/>}
                        className={"float-right"}
                        onClick={() => setCollapsed(true)}/>
                </Col>
            </Row>
            <div className={"p-5"}>
                {selectedProject.isPhase ? <PhaseViewInfo phaseId={selectedProject.phaseId}/> :
                    <WorkViewInfo workId={selectedProject.id}/>}
            </div>
        </Sider>
    </Layout>);
};

ProjectViewGanttChart.propTypes = {};

export default ProjectViewGanttChart;
