import { Col, Collapse, Row, Tabs } from "antd";
import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { approvalWork, getWork } from "../../../../api/work";
import ProjectViewWork from "../../project/view/tabs/Work";
import ViewWorkGeneral from "./item/General";
import ButtonStatus from "../common/button-status";
import ReportProgressModal from "../report-progress";
import { useSelector } from "react-redux";

const ViewWork = () => {
    const { id } = useParams();
    const [workData, setWorkData] = useState();
    const { reload } = useSelector((state) => state.commonReducer);

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

    const tabExtra = useMemo(() => {
        return (
            <Row gutter={8}>
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
    }, [workData]);

    console.log("jtadd", workData);

    return (
        <Tabs defaultActiveKey="general" tabBarExtraContent={tabExtra}>
            <Tabs.TabPane key={"general"} tab="Thông tin chung">
                <ViewWorkGeneral data={workData} />
                <Collapse className="mt-3" defaultActiveKey={"work"}>
                    <Collapse.Panel header="Công việc" key={"work"}>
                        <ProjectViewWork parentId={workData?.id} />
                    </Collapse.Panel>
                </Collapse>
            </Tabs.TabPane>
            <Tabs.TabPane key={"attach"} tab="Đính kèm">
                Attach tab
            </Tabs.TabPane>
        </Tabs>
    );
};

export default ViewWork;
