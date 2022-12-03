import { Col, Input, Row } from "antd";
import React from "react";
import { FiSearch } from "react-icons/fi";
import ButtonDrawer from "../../../../common/button/ButtonDrawer";
import { ADD } from "../../../../common/Constant";
import ResourceForm from "../../../resource/form";
import ResourceList from "../../../resource/list";

function ProjectViewResource({ projectId, phaseId, teamId }) {
    return (
        <div>
            <Row gutter={12} className={"mb-4"}>
                <Col>
                    <ButtonDrawer
                        title={"Thêm mới tài nguyên"}
                        formId={"resource-form"}
                        mode={ADD}
                        buttonProps={{
                            value: "Thêm mới",
                        }}
                    >
                        <ResourceForm
                            projectId={projectId}
                            phaseId={phaseId}
                            teamId={teamId}
                        />
                    </ButtonDrawer>
                </Col>
                <Col span={6}>
                    <Input prefix={<FiSearch />} />
                </Col>
            </Row>
            <ResourceList />
        </div>
    );
}

export default ProjectViewResource;
