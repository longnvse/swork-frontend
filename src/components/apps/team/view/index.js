import { Col, Descriptions, Row } from "antd";
import React from "react";
import ProjectViewResource from "../../project/view/tabs/Resource";

const TeamView = () => {
    return (
        <>
            <Row gutter={12}>
                <Col span={12}>
                    <Descriptions title="Thông tin chung" bordered column={1}>
                        <Descriptions.Item label="Tên đội nhóm">
                            Doi 1
                        </Descriptions.Item>
                        <Descriptions.Item label="Quản trị nhóm">
                            Nguyen Viet Long
                        </Descriptions.Item>
                        <Descriptions.Item label="Danh sách thành viên">
                            Nguyen Viet Long, ...
                        </Descriptions.Item>
                        <Descriptions.Item label="Số lượng thành viên">
                            10
                        </Descriptions.Item>
                    </Descriptions>
                </Col>
                <Col span={12}>
                    <Descriptions bordered column={1}>
                        <Descriptions.Item label="Dự án/Giai đoạn">
                            Du an 1
                        </Descriptions.Item>
                        <Descriptions.Item label="Trạng thái">
                            Dang hoat dong
                        </Descriptions.Item>
                        <Descriptions.Item label="Thời gian bắt đầu">
                            17:37 28-11-2022
                        </Descriptions.Item>
                        <Descriptions.Item label="Mô tả">
                            Mo ta
                        </Descriptions.Item>
                    </Descriptions>
                </Col>
            </Row>
            <div className="mt-3">
                <h3>Tài nguyên</h3>
                <ProjectViewResource />
            </div>
        </>
    );
};

export default TeamView;
