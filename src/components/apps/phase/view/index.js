import { Collapse, Descriptions, Tabs } from "antd";
import React from "react";
import ProjectViewResource from "../../project/view/tabs/Resource";
import ProjectViewWork from "../../project/view/tabs/Work";
import TeamList from "../../team";

const PhaseView = () => {
    return (
        <Tabs type="card" defaultActiveKey="general">
            <Tabs.TabPane key="general" tab="Thông tin chung">
                <Descriptions bordered column={2}>
                    <Descriptions.Item label="Tên giai đoạn">
                        Giai doan 1
                    </Descriptions.Item>
                    <Descriptions.Item label="Dự án">Du an 1</Descriptions.Item>
                    <Descriptions.Item label="Người quản trị">
                        Nguyen Viet Long
                    </Descriptions.Item>
                    <Descriptions.Item label="Trạng thái">
                        Dang hoat dong
                    </Descriptions.Item>
                    <Descriptions.Item label="Thời gian">
                        28/11/2022 - 30/11/2022
                    </Descriptions.Item>
                    <Descriptions.Item label="Mô tả">Mo ta</Descriptions.Item>
                </Descriptions>
                <Collapse defaultActiveKey={"work"} className="mt-3">
                    <Collapse.Panel header="Công việc" key={"work"}>
                        <ProjectViewWork />
                    </Collapse.Panel>
                </Collapse>
            </Tabs.TabPane>
            <Tabs.TabPane key={"team"} tab="Đội nhóm">
                <TeamList />
            </Tabs.TabPane>
            <Tabs.TabPane key={"resource"} tab="Tài nguyên">
                <ProjectViewResource />
            </Tabs.TabPane>
            <Tabs.TabPane key={"attach"} tab="Đính kèm">
                Attach tab
            </Tabs.TabPane>
        </Tabs>
    );
};

export default PhaseView;
