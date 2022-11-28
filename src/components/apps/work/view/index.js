import { Collapse, Tabs } from "antd";
import React from "react";
import ProjectViewWork from "../../project/view/tabs/Work";
import ViewWorkGeneral from "./item/General";

const ViewWork = () => {
    return (
        <Tabs defaultActiveKey="general" type="card">
            <Tabs.TabPane key={"general"} tab="Thông tin chung">
                <ViewWorkGeneral />
                <Collapse className="mt-3" defaultActiveKey={"work"}>
                    <Collapse.Panel header="Công việc" key={"work"}>
                        <ProjectViewWork />
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
