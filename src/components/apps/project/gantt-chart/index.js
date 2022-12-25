import React, {useEffect, useMemo, useState} from "react";
import {Gantt, ViewMode} from "gantt-task-react";
import {getProjectPages, updateDateProject} from "../../../../api/project";
import {message_error} from "../../../common/Constant";
import dayjs from "dayjs";
import {Button, Col, Layout, Row} from "antd";
import {Content} from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import {CloseOutlined, ProjectOutlined} from "@ant-design/icons";
import {progressColorGanttChart, statusColorGanttChart, statusColorGanttChartSelected,} from "../../../common/status";
import {useSearchParams} from "react-router-dom";
import ProjectInfo from "./project-info";
import {TooltipGanttChart} from "../view/tabs/elements/TooltipGanttChart";
import {getWorkPages, updateWorkDate} from "../../../../api/work";
import WorkViewInfo from "../../work/view/info";
import {useSelector} from "react-redux";

const ProjectGanttChart = ({isWork}) => {
    const [tasks, setTasks] = useState([]);
    const [collapsed, setCollapsed] = useState(true);
    const [searchParams] = useSearchParams();
    const [viewMode, setViewMode] = useState(ViewMode.Day);
    const [selectedProject, setSelectedProject] = useState();
    const [selectedProjectName, setSelectedProjectName] = useState();

    const {reload} = useSelector(state => state.commonReducer);

    useEffect(() => {
        if (reload) {
            fetchData();
        }
    }, [reload]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        if (!isWork) {
            getProjectPages({page: 1, pageSize: Number.MAX_VALUE})
                .then((res) => {
                    setTasks(res.data?.items?.map(mapData) || []);
                })
                .catch(message_error);
        } else {
            getWorkPages({page: 1, pageSize: Number.MAX_VALUE, isTree: true})
                .then((res) => {
                    setTasks(res.data?.items?.map(mapData) || []);
                })
                .catch(message_error);
        }
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
                return 60;
        }
    }, [viewMode]);

    useEffect(() => {
        if (
            !!searchParams.get("tab") &&
            isViewMode(searchParams.get("tab")) &&
            searchParams.get("tab") !== viewMode
        ) {
            setViewMode(searchParams.get("tab"));
        }
    }, [searchParams]);

    const isViewMode = (viewMode) => {
        switch (viewMode) {
            case ViewMode.Day:
            case ViewMode.Week:
            case ViewMode.Month:
            case ViewMode.Year:
                return true;
            default:
                return false;
        }
    };

    const mapData = (item) => ({
        start: dayjs(item.startDate).toDate(),
        end: dayjs(item.endDate).toDate(),
        name: item.name,
        id: item.id,
        type: "task",
        progress: item.progress,
        isProject: true,
        status: item.status,
        styles: {
            backgroundColor: statusColorGanttChart(item.status),
            backgroundSelectedColor: statusColorGanttChartSelected(item.status),
            progressColor: progressColorGanttChart(item.status),
            progressSelectedColor: statusColorGanttChartSelected(item.status),
        },
        fontSize: "40px",
    });

    const onDateChange = ({id, start, end}) => {
        if (!isWork) {
            return updateDateProject(id, start, end).then(() => {
                return true;
            }).catch(message_error);
        } else {
            return updateWorkDate(id, start, end).then(() => {
                return true;
            }).catch((err) => {
                message_error(err);
                return false;
            });
        }
    };

    const onClick = ({id, name}) => {
        setSelectedProject(id);
        setSelectedProjectName(name);
        setCollapsed(false);
    };

    return (
        tasks.length > 0 && (
            <Layout className={"rounded-[8px] h-fit"}>
                <Content
                    className={"bg-white"}
                    style={{border: "1px solid #ccc", borderRadius: 8}}
                >
                    <Gantt
                        tasks={tasks}
                        locale={"vi"}
                        onDateChange={onDateChange}
                        onDoubleClick={onClick}
                        listCellWidth={""}
                        ganttHeight={710}
                        columnWidth={columnWidth}
                        viewMode={viewMode}
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
                        borderRadius: 8,
                        boxShadow: "-5px 0 5px -5px #171a1f",
                        marginLeft: !collapsed ? "8px" : 0,
                    }}
                >
                    <Row
                        className={"justify-between items-center p-5"}
                        style={{
                            borderBottom: "1px solid #cccccc66",
                        }}
                    >
                        <Col>
                            <Row
                                className={"font-bold text-[16px] items-center"}
                                gutter={12}
                            >
                                <Col>
                                    <Button
                                        type={"primary"}
                                        className={
                                            "rounded-3xl h-[40px] flex items-center justify-center"
                                        }
                                        style={{
                                            width: "40px",
                                        }}
                                        icon={
                                            <ProjectOutlined
                                                style={{fontSize: 16}}
                                            />
                                        }
                                    />
                                </Col>
                                <Col>{selectedProjectName}</Col>
                            </Row>
                        </Col>
                        <Col>
                            <Button
                                type={"text"}
                                icon={<CloseOutlined/>}
                                className={"float-right"}
                                onClick={() => setCollapsed(true)}
                            />
                        </Col>
                    </Row>
                    <div className={"p-5"}>
                        {!isWork ? <ProjectInfo projectId={selectedProject}/> :
                            <WorkViewInfo workId={selectedProject}/>}
                    </div>
                </Sider>
            </Layout>
        )
    );
};

ProjectGanttChart.propTypes = {};

export default ProjectGanttChart;
