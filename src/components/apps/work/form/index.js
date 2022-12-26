import {
    Col,
    Collapse,
    DatePicker,
    Form,
    Input,
    InputNumber,
    message,
    Row,
    Select,
} from "antd";
import React, { useEffect, useState } from "react";
import {
    addWork,
    getWork,
    getWorkPages,
    updateWork,
} from "../../../../api/work";
import SelectAccount from "../../../common/select/account";
import dayjs from "dayjs";
import { message_error } from "../../../common/Constant";

const WorkForm = ({ workId, phaseId, projectId, parentId }) => {
    const [form] = Form.useForm();
    const [workData, setWorkData] = useState([]);
    const [progressType, setProgressType] = useState();

    useEffect(() => {
        if (workId) {
            getWork(workId).then((response) => {
                form.setFieldsValue({
                    ...response?.data,
                    startDate:
                        response.data?.startDate &&
                        dayjs(response.data?.startDate),
                    endDate:
                        response.data?.endDate && dayjs(response.data?.endDate),
                });
                setProgressType(response.data?.progressType);
            });
        }
    }, [workId]);

    useEffect(() => {
        if (projectId || phaseId) {
            getWorkPages({ projectId, phaseId }).then((res) => {
                setWorkData(res.data?.items?.map(mapOptionWork) || []);
            });
        }
    }, [projectId, phaseId]);

    const mapOptionWork = (item) => ({
        label: item.name,
        value: item.id,
    });

    const onChangeProgressType = (value) => {
        setProgressType(value);
    };

    const onFinish = (values) => {
        values = {
            ...values,
            projectId: Number(projectId) || 0,
            phaseId: Number(phaseId) || 0,
            parentId: Number(parentId) || 0,
        };

        if (!workId) {
            addWork(values)
                .then(() => {
                    message.success("Thêm công việc thành công!");
                })
                .catch(message_error);
        } else {
            updateWork(workId, values)
                .then(() => {
                    message.success("Cập nhật công việc thành công!");
                })
                .catch(message_error);
        }
    };

    return (
        <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            id="work-form"
            className="work-form"
        >
            <Collapse ghost defaultActiveKey={["general"]}>
                <Collapse.Panel header={"Thông tin chung"} key="general">
                    <Row gutter={12} wrap className="pt-3">
                        <Col span={24}>
                            <Form.Item
                                name="name"
                                label="Tên công việc"
                                rules={[
                                    {
                                        required: true,
                                        message: "Chưa nhập tên công việc",
                                    },
                                ]}
                            >
                                <Input placeholder="Tên công việc" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="startDate"
                                label="Thời gian bắt đầu"
                                rules={[
                                    {
                                        required: true,
                                        message: "Chưa chọn thời gian bắt đầu",
                                    },
                                ]}
                            >
                                <DatePicker
                                    format={"DD/MM/YYYY"}
                                    placeholder="Bắt đầu"
                                    className="w-full"
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="endDate"
                                label="Thời gian kết thúc"
                                rules={[
                                    {
                                        required: true,
                                        message: "Chưa chọn thời gian kết thúc",
                                    },
                                ]}
                            >
                                <DatePicker
                                    className="w-full"
                                    format={"DD/MM/YYYY"}
                                    placeholder="Kết thúc"
                                />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item name="handles" label="Người thực hiện">
                                <SelectAccount withExt={true} />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item name="manages" label="Người quản trị">
                                <SelectAccount />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item
                                name="participates"
                                label="Người theo dõi/phối hợp thực hiện"
                            >
                                <SelectAccount withExt={true} />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item name="description" label="Mô tả">
                                <Input.TextArea
                                    className="w-full"
                                    placeholder="Mô tả"
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={12} wrap className="pt-3">
                        <Col span={24}>
                            <Form.Item
                                label="Cách tính tiến độ"
                                name="progressType"
                                rules={[
                                    {
                                        required: true,
                                        message: "Chưa chọn cách tính tiến độ",
                                    },
                                ]}
                                initialValue="manual"
                            >
                                <Select
                                    placeholder="Chọn cách tính tiến độ"
                                    onChange={onChangeProgressType}
                                >
                                    <Select.Option value="manual">
                                        <b>Theo % người dùng tự cập nhật</b>
                                        <div className="ml-3">
                                            Người dùng tự nhập % hoàn thành công
                                            việc
                                        </div>
                                    </Select.Option>
                                    <Select.Option value="byAmount">
                                        <b>
                                            Theo tỷ lệ hoàn thành khối lượng
                                            công việc
                                        </b>
                                        <div className="ml-3">
                                            <div>
                                                Ví dụ công việc cần hoàn thành
                                                100 sản phẩm,
                                            </div>
                                            <div>
                                                người dùng nhập số lượng sản
                                                phẩm
                                            </div>
                                            <div>
                                                đã hoàn thành là 10 , thì hệ
                                                thống
                                            </div>
                                            <div>
                                                sẽ tính ra kết quả công việc là
                                                10%
                                            </div>
                                        </div>
                                    </Select.Option>
                                    <Select.Option value="proportionDate">
                                        <b>Theo tỷ trọng ngày thực hiện </b>
                                        <div>
                                            Ví dụ dự án gồm 2 công việc A và B .
                                        </div>
                                        <div>
                                            Công việc A yêu cầu thời gian thực
                                            hiện trong 4 ngày , tiến độ 40%, gồm
                                            4 người thực hiện
                                        </div>
                                        <div>
                                            thì tổng khối lượng công việc là
                                            4*4=16, khối lượng công việc đã hoàn
                                            thành là 4*4*40%=6.4
                                        </div>
                                        <div>
                                            Công việc B yêu cầu thời gian thực
                                            hiện trong 6 ngày , tiến độ 50%, gồm
                                            2 nguời thực hiện
                                        </div>
                                        <div>
                                            thì tổng khối lượng công việc là
                                            6*2=12, khối lượng công việc đã hoàn
                                            thành là 6*2*50%=6
                                        </div>
                                        <div>
                                            Tiến độ dự án là ((6+6.4) / (16+12))
                                            * 100 = 45% (44.28%)
                                        </div>
                                    </Select.Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        {progressType === "byAmount" && (
                            <>
                                <Col span={17}>
                                    <Form.Item
                                        name={"incompleteAmount"}
                                        label={"Khối lượng cần hoàn thành"}
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    "Vui lòng nhập khối lượng cần hoàn thành!",
                                            },
                                        ]}
                                    >
                                        <InputNumber
                                            placeholder={"100"}
                                            className={"w-full"}
                                            controls={false}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={7}>
                                    <Form.Item
                                        name={"unit"}
                                        label={"Đơn vị"}
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    "Vui lòng nhập đơn vi đo khối lượng!",
                                            },
                                        ]}
                                    >
                                        <Input placeholder={"Chiếc"} />
                                    </Form.Item>
                                </Col>
                            </>
                        )}
                        {!parentId ? (
                            <Col span={24}>
                                <Form.Item
                                    label="Công việc cha"
                                    name="parentId"
                                >
                                    <Select
                                        className="w-full"
                                        placeholder="Chọn công việc cha"
                                        options={workData}
                                        allowClear
                                    />
                                </Form.Item>
                            </Col>
                        ) : null}
                    </Row>
                </Collapse.Panel>
            </Collapse>
        </Form>
    );
};

export default WorkForm;
