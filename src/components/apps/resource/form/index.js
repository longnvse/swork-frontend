import {Col, DatePicker, Form, Input, InputNumber, message, Row, Select,} from "antd";
import React, {useEffect, useState} from "react";
import {addResource, getResource, updateResource,} from "../../../../api/resource/resource";
import {getTeamPages} from "../../../../api/team";
import {DATE_FORMAT, message_error} from "../../../common/Constant";
import dayjs from "dayjs";

const ResourceForm = ({resourceId, projectId, phaseId, workId, teamId}) => {
    const [form] = Form.useForm();
    const [teams, setTeams] = useState([]);

    const mapDataTeams = (data) => {
        if (data?.length <= 0) return [];
        return data?.map((item) => {
            return {
                label: item?.name,
                value: item?.id,
            };
        });
    };

    useEffect(() => {
        if (projectId) {
            getTeamPages({projectId, phaseId, params: {page: 1, pageSize: 10000}}).then((response) => {
                setTeams(mapDataTeams(response?.data?.items));
            });
        }
    }, [projectId, phaseId]);

    useEffect(() => {
        if (resourceId) {
            getResource(resourceId).then((response) => {
                form.setFieldsValue({
                    ...response?.data,
                    dateResource:
                        response.data.dateResource &&
                        dayjs(response?.data?.dateResource),
                });
            });
        }
    }, [resourceId]);

    useEffect(() => {
        if (teamId) {
            form.setFieldValue({teamId: teamId});
        }
    }, [teamId]);

    const onFinish = (values) => {
        if (!resourceId) {
            addResource(projectId, phaseId, workId, values)
                .then(() => {
                    message.success("Thêm tài nguyên thành công!");
                })
                .catch(message_error);
        } else {
            updateResource(resourceId, values)
                .then(() => {
                    message.success("Cập nhật tài nguyên thành công!");
                })
                .catch(message_error);
        }
    };

    return (
        <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            id="resource-form"
        >
            <Row gutter={12} wrap>
                <Col span={24}>
                    <Form.Item
                        name="resourceTypeName"
                        label="Tên tài nguyên"
                        rules={[
                            {
                                required: true,
                                message: "Chưa nhập tên tài nguyên",
                            },
                        ]}
                    >
                        <Input placeholder="Tên tài nguyên"/>
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Form.Item name="unit" label="Đơn vị">
                        <Input placeholder="Đơn vị" className="w-full"/>
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Form.Item name="teamId" label="Đội nhóm" disabled={teamId}>
                        <Select
                            options={teams}
                            className="w-full"
                            placeholder="Đội nhóm"
                        />
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Form.Item name="quantity" label="Số lượng">
                        <InputNumber
                            placeholder="Số lượng"
                            className="w-full"
                        />
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Form.Item name="dateResource" label="Ngày">
                        <DatePicker
                            format={DATE_FORMAT}
                            className="w-full"
                            placeholder="Ngày"
                        />
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Form.Item name="totalAmount" label="Thành tiền">
                        <InputNumber
                            placeholder="Thành tiền"
                            className="w-full"
                        />
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    );
};

export default ResourceForm;
