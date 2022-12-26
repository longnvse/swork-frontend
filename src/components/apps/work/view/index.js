import { Col, Collapse, Row, Tabs, Dropdown, Button, Modal } from "antd";
import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { approvalWork, getWork } from "../../../../api/work";
import ProjectViewWork from "../../project/view/tabs/Work";
import ViewWorkGeneral from "./item/General";
import ButtonStatus from "../common/button-status";
import ReportProgressModal from "../report-progress";
import { useDispatch, useSelector } from "react-redux";
import { setHeader } from "../../../../redux/actions/common/actions";
import { ADD, CLASS_PK_NAME, MODULE_ID } from "../../../common/Constant";
import ButtonTab from "../../../common/button/ButtonTab";
import { PlusOutlined } from "@ant-design/icons";
import ButtonDrawer from "../../../common/button/ButtonDrawer";
import WorkForm from "../form";
import SWFile from "../../../common/file";
import CommentList from "../../../common/comment/list";
import ProjectViewResource from "../../project/view/tabs/Resource";
import ResourceForm from "../../resource/form";
import UploadFile from "../../../common/file/upload";

const ViewWork = () => {
    const { id } = useParams();
    const [workData, setWorkData] = useState();
    const { reload } = useSelector((state) => state.commonReducer);
    const dispatch = useDispatch();
    const [tabKey, setTabKey] = useState("general");

    useEffect(() => {
        dispatch(setHeader("Chi tiết công việc"));
    }, []);

    useEffect(() => {
        getWork(id).then((response) => {
            setWorkData(response?.data);
        });
    }, [id]);

    useEffect(() => {
        if (reload) {
            getWork(id).then((response) => {
                setWorkData(response?.data);
            });
        }
    }, [reload]);

    const onChange = (tabKey) => {
        setTabKey(tabKey);
    };

    const tabExtra = useMemo(() => {
        return (
            <Row gutter={8}>
                {tabKey === "resources" ? (
                    <Col>
                        <ButtonDrawer
                            title={"Thêm tài nguyên"}
                            formId={"resource-form"}
                            mode={ADD}
                            button={
                                <ButtonTab
                                    icon={
                                        <PlusOutlined
                                            style={{ fontSize: 20 }}
                                        />
                                    }
                                    title={"Thêm tài nguyên"}
                                />
                            }
                        >
                            <ResourceForm
                                projectId={workData?.projectId}
                                phaseId={workData?.phaseId}
                                parentId={workData?.id}
                            />
                        </ButtonDrawer>
                    </Col>
                ) : null}
                <Col>
                    <ButtonStatus
                        status={workData?.status}
                        updateStatus={(status) => approvalWork(id, status)}
                    />
                </Col>
                <Col>
                    <ReportProgressModal
                        workId={id}
                        progressType={workData?.progressType}
                    />
                </Col>
            </Row>
        );
    }, [workData, tabKey]);

    return (
        <>
            <Tabs
                defaultActiveKey="general"
                tabBarExtraContent={tabExtra}
                onChange={onChange}
            >
                <Tabs.TabPane key={"general"} tab="Thông tin chung">
                    <ViewWorkGeneral data={workData} />
                    <Collapse className="mt-3" defaultActiveKey={"work"} ghost>
                        <Collapse.Panel
                            header={
                                <Row className={"items-center"}>
                                    Công việc con
                                </Row>
                            }
                            key={"work"}
                            extra={
                                <>
                                    <ButtonDrawer
                                        title={"Thêm mới công việc"}
                                        formId={"work-form"}
                                        mode={ADD}
                                        button={
                                            <ButtonTab
                                                icon={
                                                    <PlusOutlined
                                                        style={{ fontSize: 20 }}
                                                    />
                                                }
                                                title={"Thêm công việc"}
                                            />
                                        }
                                    >
                                        <WorkForm
                                            // projectId={workData?.projectId}
                                            // phaseId={workData?.phaseId}
                                            parentId={workData?.id}
                                        />
                                    </ButtonDrawer>
                                </>
                            }
                        >
                            <ProjectViewWork
                                parentId={workData?.id}
                                hiddenBtn
                            />
                        </Collapse.Panel>
                    </Collapse>
                    <Row
                        className={
                            "rounded-[8px] border-solid border-[1px] border-[#ccc] mt-1.5 p-6 w-full"
                        }
                    >
                        <Row className={"w-full"}>
                            <strong>Thảo luận</strong>
                        </Row>
                        <Row className={"w-full"}>
                            <CommentList
                                classPkId={workData?.id}
                                classPkName={CLASS_PK_NAME.WORK}
                            />
                        </Row>
                    </Row>
                </Tabs.TabPane>
                {workData?.projectId ? (
                    <Tabs.TabPane key={"resources"} tab="Tài nguyên">
                        <ProjectViewResource
                            hiddenBtn={true}
                            workId={id || workData?.id}
                            phaseId={workData?.phaseId}
                            projectId={workData?.projectId}
                        />
                    </Tabs.TabPane>
                ) : null}
                <Tabs.TabPane key={"attach"} tab="Đính kèm">
                    <SWFile
                        projectId={workData?.projectId}
                        phaseId={workData?.phaseId}
                        workId={workData?.id}
                        moduleId={MODULE_ID.WORK}
                        appId={`${workData?.id}`}
                    />
                </Tabs.TabPane>
            </Tabs>
        </>
    );
};

export default ViewWork;
