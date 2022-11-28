import { Checkbox, Col, Descriptions, Progress, Row } from "antd";
import React from "react";

const ViewWorkGeneral = () => {
    return (
        <Row gutter={12}>
            <Col span={12}>
                <Descriptions bordered column={1}>
                    <Descriptions.Item label="Tên công việc">
                        Công việc ngày 28-11
                    </Descriptions.Item>
                    <Descriptions.Item label="Trạng thái">
                        Đang thực hiện
                    </Descriptions.Item>
                    <Descriptions.Item label="Người thực hiện">
                        Nguyen Viet Long
                    </Descriptions.Item>
                    <Descriptions.Item label="Người quản lý">
                        Nguyen Viet Long
                    </Descriptions.Item>
                    <Descriptions.Item label="Người theo dõi">
                        Nguyen Viet Long
                    </Descriptions.Item>
                    <Descriptions.Item label="Thời gian thực tế">
                        28/11/2022
                    </Descriptions.Item>
                    <Descriptions.Item label="Thời gian dự kiến">
                        28/11/2022 - 29/11/2022
                    </Descriptions.Item>
                    <Descriptions.Item label="Mô tả">Mo ta</Descriptions.Item>
                </Descriptions>
            </Col>
            <Col span={12}>
                <Descriptions bordered column={1}>
                    <Descriptions.Item label="Ưu tiên">Cao</Descriptions.Item>
                    <Descriptions.Item label="Tiến độ">
                        <Progress percent={50} />
                    </Descriptions.Item>
                    <Descriptions.Item label="Dự án">Du an 1</Descriptions.Item>
                    <Descriptions.Item label="Giai đoạn">
                        Giai doan 1
                    </Descriptions.Item>
                    <Descriptions.Item label="Công việc cha">
                        Cong viec cha 1
                    </Descriptions.Item>
                    <Descriptions.Item label="Đầu việc công việc">
                        <Checkbox>Dau viec 1</Checkbox>
                        <Checkbox>Dau viec 2</Checkbox>
                    </Descriptions.Item>
                </Descriptions>
            </Col>
        </Row>
    );
};

export default ViewWorkGeneral;
