import { Col, Collapse, Row } from "antd";
import React, { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { getPhase } from "../../../../api/phase";
import { ADD, DATE_FORMAT, MODULE_ID } from "../../../common/Constant";
import SWDescription from "../../../common/description";
import { renderStatus } from "../../../common/status";
import ProjectViewResource from "../../project/view/tabs/Resource";
import ProjectViewWork from "../../project/view/tabs/Work";
import TeamList from "../../team";
import { viewPhaseFirstColumns, viewPhaseSecondColumns } from "./columns";
import dayjs from "dayjs";
import SWTabs from "../../../common/tabs";
import AccountGroup from "../../../common/account/group";
import SWFile from "../../../common/file";
import TeamForm from "../../team/form";
import ResourceForm from "../../resource/form";
import ButtonDrawer from "../../../common/button/ButtonDrawer";
import ButtonTab from "../../../common/button/ButtonTab";
import { PlusOutlined } from "@ant-design/icons";
import WorkForm from "../../work/form";

const ADD_BTN = {
    team: "đội nhóm",
    resource: "tài nguyên",
};

const PhaseView = () => {
    const { id } = useParams();
    const [phaseData, setPhaseData] = useState({});
    const [searchParams] = useSearchParams();
    let tabKey = searchParams.get("tab");

    const mapData = (data) => {
        return {
            firstColumn: {
                name: data?.name,
                phaseManages: (
                    <AccountGroup
                        accountIds={data?.phaseManages?.map(
                            (item) => item.accountId,
                        )}
                    />
                ),
                status: renderStatus(data?.status),
                date: `${dayjs(data?.startDate).format(DATE_FORMAT)} - ${dayjs(
                    data?.endDate,
                ).format(DATE_FORMAT)}`,
            },
            secondColum: {
                projectName: (
                    <Link to={`/project/view/${data?.projectId}`}>
                        {data?.projectName}
                    </Link>
                ),
                status: renderStatus(data?.status),
                description: data?.description,
            },
            ...data,
        };
    };

    useEffect(() => {
        if (id) {
            getPhase(id).then((response) => {
                setPhaseData(mapData(response?.data));
            });
        }
    }, [id]);

    const tabItems = [
        {
            key: "general",
            label: "Thông tin chung",
            children: (
                <>
                    <Row gutter={12}>
                        <Col span={12}>
                            <SWDescription
                                span={1}
                                dataSource={phaseData?.firstColumn}
                                columns={viewPhaseFirstColumns}
                            />
                        </Col>
                        <Col span={12}>
                            <SWDescription
                                span={1}
                                dataSource={phaseData?.secondColum}
                                columns={viewPhaseSecondColumns}
                            />
                        </Col>
                    </Row>
                    <Collapse defaultActiveKey={"work"} className="mt-3">
                        <Collapse.Panel
                            header="Công việc"
                            key={"work"}
                            collapsible="icon"
                            extra={
                                <ButtonDrawer
                                    title={`Thêm công việc`}
                                    formId={`work-form`}
                                    mode={ADD}
                                    button={
                                        <ButtonTab
                                            icon={
                                                <PlusOutlined
                                                    style={{ fontSize: 20 }}
                                                />
                                            }
                                            title={"Thêm công việc"}
                                        />
                                    }
                                >
                                    <WorkForm
                                        phaseId={id || phaseData?.id}
                                        projectId={phaseData?.projectId}
                                    />
                                </ButtonDrawer>
                            }
                        >
                            <ProjectViewWork
                                hiddenBtn={true}
                                projectId={phaseData?.projectId}
                                phaseId={id}
                            />
                        </Collapse.Panel>
                    </Collapse>
                </>
            ),
        },
        {
            key: "team",
            label: "Đội nhóm",
            children: (
                <TeamList projectId={phaseData?.projectId} phaseId={id} />
            ),
        },
        {
            key: "resource",
            label: "Tài nguyên",
            children: (
                <ProjectViewResource
                    hiddenBtn={true}
                    projectId={phaseData?.projectId}
                    phaseId={id}
                />
            ),
        },
        {
            key: "attach",
            label: "Đính kèm",
            children: (
                <SWFile
                    projectId={phaseData?.projectId}
                    phaseId={phaseData?.id}
                    moduleId={MODULE_ID.PHASE}
                    appId={`${phaseData?.id}`}
                />
            ),
        },
    ];

    const renderForm = (tabKey) => {
        switch (tabKey) {
            case "team":
                return (
                    <TeamForm
                        phaseId={id || phaseData?.id}
                        projectId={phaseData?.projectId}
                    />
                );
            case "resource":
                return (
                    <ResourceForm
                        phaseId={id || phaseData?.id}
                        projectId={phaseData?.projectId}
                    />
                );
            default:
                break;
        }
    };

    const tabExtra = (
        <Row gutter={8}>
            {tabKey !== "general" && tabKey !== "attach" ? (
                <Col>
                    <ButtonDrawer
                        title={`Thêm ${ADD_BTN[tabKey]}`}
                        formId={`${tabKey}-form`}
                        mode={ADD}
                        button={
                            <ButtonTab
                                icon={<PlusOutlined style={{ fontSize: 20 }} />}
                                title={
                                    <span className="capitalize">
                                        {ADD_BTN[tabKey]}
                                    </span>
                                }
                            />
                        }
                    >
                        {renderForm(tabKey)}
                    </ButtonDrawer>
                </Col>
            ) : null}
        </Row>
    );

    return <SWTabs items={tabItems} tabBarExtraContent={tabExtra} />;
};

export default PhaseView;
