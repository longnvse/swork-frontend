import React from 'react';
import {Collapse, Row} from "antd";
import ButtonDrawer from "../../../common/button/ButtonDrawer";
import {ADD} from "../../../common/Constant";
import ButtonTab from "../../../common/button/ButtonTab";
import {PlusOutlined} from "@ant-design/icons";
import WorkForm from "../form";
import ProjectViewWork from "../../project/view/tabs/Work";

const WorkListCollapsible = ({projectId, phaseId, parentId}) => {
    return (
        <Collapse className="mt-3" defaultActiveKey={"work"}>
            <Collapse.Panel
                collapsible={"icon"}
                header={<Row className={"items-center"}>Công việc</Row>}
                key={"work"}
                extra={<>
                    <ButtonDrawer
                        title={"Thêm mới công việc"}
                        formId={"work-form"}
                        mode={ADD}
                        button={<ButtonTab
                            icon={<PlusOutlined style={{fontSize: 20}}/>}
                            title={"Thêm công việc"}
                        />}
                    >
                        <WorkForm/>
                    </ButtonDrawer>
                </>}
            >
                <ProjectViewWork projectId={projectId} phaseId={phaseId} parentId={parentId}/>
            </Collapse.Panel>
        </Collapse>
    );
};

WorkListCollapsible.propTypes = {};

export default WorkListCollapsible;
