import { Collapse, Tabs } from "antd";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getWork } from "../../../../api/work";
import ProjectViewWork from "../../project/view/tabs/Work";
import ViewWorkGeneral from "./item/General";

const ViewWork = () => {
    const { id } = useParams();
    const [workData, setWorkData] = useState({});

    useEffect(() => {
        getWork(id).then((response) => {
            console.log("jtadd", response?.data);
            setWorkData(response?.data);
        });
    }, [id]);

    return (
        <Tabs defaultActiveKey="general" type="card">
            <Tabs.TabPane key={"general"} tab="Thông tin chung">
                <ViewWorkGeneral />
                <Collapse className="mt-3" defaultActiveKey={"work"}>
                    <Collapse.Panel header="Công việc" key={"work"}>
                        <ProjectViewWork
                            projectId={workData?.projectId}
                            phaseId={workData?.phaseId}
                        />
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
