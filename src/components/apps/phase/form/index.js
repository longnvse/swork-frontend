import React, {useEffect} from "react";
import {Col, Form, Input, message, Row, Select} from "antd";
import FormItem from "antd/es/form/FormItem";
import SWDatePicker from "../../../common/date";
import SelectAccount from "../../../common/select/account";
import {addPhase, getPhase, updatePhase} from "../../../../api/phase";
import dayjs from "dayjs";
import {message_error} from "../../../common/Constant";

const PhaseForm = ({projectId, id}) => {
    const [form] = Form.useForm();

    useEffect(() => {
        if (id) {
            getPhase(id).then((response) => {
                form.setFieldsValue({
                    ...response?.data,
                    startDate: dayjs(response.data.startDate),
                    endDate: dayjs(response.data.endDate),
                    manages: response.data.phaseManages.map(
                        (item) => item.accountId,
                    ),
                });
            });
        }
    }, [id]);

    const onFinish = (values) => {
        values.projectId = projectId;
        if (!id) {
            addPhase(values)
                .then(() => {
                    message.success("Thêm giai đoạn thành công!");
                })
                .catch(message_error);
        } else {
            updatePhase(id, values)
                .then(() => {
                    message.success("Cập nhật giai đoạn thành công!");
                })
                .catch(message_error);
        }
    };

    return (
        <Form
            form={form}
            onFinish={onFinish}
            layout={"vertical"}
            id={"phase-form"}
            style={{width: "100%"}}
        >
            <Form.Item
                name="name"
                label="Tên giai đoạn"
                rules={[
                    {
                        required: true,
                        message: "Vui lòng nhập tên giai đoạn",
                    },
                ]}
            >
                <Input placeholder="Tên giai đoạn"/>
            </Form.Item>
            <FormItem
                name={"manages"}
                label={"Người quản trị"}
                rules={[
                    {
                        required: true,
                        message: "Chọn người quản trị",
                    },
                ]}
            >
                <SelectAccount simple={true}/>
            </FormItem>
            <Row gutter={12}>
                <Col span={12}>
                    <Form.Item
                        name="startDate"
                        label="Thời gian bắt đầu"
                        rules={[
                            {
                                required: true,
                                message: "Chưa chọn thời gian bắt đầu",
                            },
                        ]}
                    >
                        <SWDatePicker className="w-full"/>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name="endDate"
                        label="Thời gian kết thúc"
                        rules={[
                            {
                                required: true,
                                message: "Chưa chọn thời gian kết thúc",
                            },
                        ]}
                    >
                        <SWDatePicker className="w-full"/>
                    </Form.Item>
                </Col>
            </Row>
            <Form.Item name="status" label="Trạng thái" initialValue={"active"}>
                <Select
                    placeholder={"Chọn trạng thái"}
                    options={[
                        {label: "Đang hoạt động", value: "active"},
                        {label: "Chờ hoạt động", value: "inactive"},
                    ]}
                />
            </Form.Item>

            <Form.Item name="description" label="Mô tả">
                <Input.TextArea placeholder="Nhập mô tả"/>
            </Form.Item>
        </Form>
    );
};

export default PhaseForm;
