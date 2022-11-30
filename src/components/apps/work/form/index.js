import {
    Col,
    Collapse,
    DatePicker,
    Form,
    Input,
    message,
    Row,
    Select,
} from "antd";
import React, { useEffect } from "react";
import { addWork, getWork, updateWork } from "../../../../api/work";
import SelectAccount from "../../../common/select/account";

const WorkForm = ({ workId, phaseId, projectId }) => {
    const [form] = Form.useForm();
    const priorities = [
        {
            label: "Cao",
            value: "high",
        },
        {
            label: "Trung bình",
            value: "medium",
        },
        {
            label: "Thấp",
            value: "low",
        },
    ];

    useEffect(() => {
        getWork(workId).then((response) => {
            form.setFieldsValue(response?.data);
        });
    }, [workId]);

    const onFinish = (values) => {
        if (!workId) {
            addWork(values)
                .then(() => {
                    message.success("Thêm công việc thành công!");
                })
                .catch(() => {
                    message.error("Thêm công việc thất bại!");
                });
        } else {
            updateWork(workId, values)
                .then(() => {
                    message.success("Cập nhật công việc thành công!");
                })
                .catch(() => {
                    message.error("Cập nhật công việc thất bại!");
                });
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
                                <SelectAccount />
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
                                <SelectAccount />
                            </Form.Item>
                        </Col>
                        {/* <Col span={24}>
                            <Form.Item name="priority" label="Độ ưu tiên">
                                <Select
                                    options={priorities}
                                    className="w-full"
                                    placeholder="Độ ưu tiên"
                                />
                            </Form.Item>
                        </Col> */}
                        <Col span={24}>
                            <Form.Item name="description" label="Mô tả">
                                <Input.TextArea
                                    className="w-full"
                                    placeholder="Mô tả"
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                </Collapse.Panel>
                <Collapse.Panel header="Nâng cao" key="advance">
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
                            >
                                <Select placeholder="Chọn cách tính tiến độ">
                                    <Select.Option value="byUpdated">
                                        <b>Theo % người dùng tự cập nhật</b>
                                        <div className="ml-3">
                                            Người dùng tự nhập % hoàn thành công
                                            việc
                                        </div>
                                    </Select.Option>
                                    <Select.Option value="byTask">
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
                                    <Select.Option value="byChecklist">
                                        <b>Theo tỷ lệ hoàn thành đầu việc</b>
                                        <div className="ml-3">
                                            <div>
                                                Ví dụ công việc có 10 đầu việc ,
                                                khi người dùng
                                            </div>
                                            <div>
                                                tích chọn đầu việc đã hoàn thành
                                                là 5 ,
                                            </div>
                                            <div>
                                                thì hệ thống sẽ tính ra kết quả
                                                công việc là 50%
                                            </div>
                                        </div>
                                    </Select.Option>
                                    <Select.Option value="byChildrenTask">
                                        <b>Theo tỷ trọng công việc con</b>
                                        <div className="ml-3">
                                            <div>
                                                Ví dụ Công việc X gồm 2 công
                                                việc A và B .
                                            </div>
                                            <div>
                                                Công việc A có tỷ trọng là 40 ,
                                                tiến độ là 50%
                                            </div>
                                            <div>
                                                Công việc B có tỷ trọng là 30 ,
                                                tiến độ là 40%
                                            </div>
                                            <div>
                                                Tiến độ Công việc X là
                                                [(40*50)+(30*40)]/(40+30) = 35%
                                            </div>
                                        </div>
                                    </Select.Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item label="Dự án" name="projectId">
                                <Select
                                    className="w-full"
                                    placeholder="Chọn dự án"
                                >
                                    <Select.Option value="du an 1">
                                        Du an 1
                                    </Select.Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item label="Giai đoạn" name="phaseId">
                                <Select
                                    className="w-full"
                                    placeholder="Chọn giai đoạn"
                                >
                                    <Select.Option value="giai doan 1">
                                        Giai doan 1
                                    </Select.Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item
                                label="Công việc cha"
                                name="parentTaskId"
                            >
                                <Select
                                    className="w-full"
                                    placeholder="Chọn công việc cha"
                                >
                                    <Select.Option value="cong viec 1">
                                        Cong viec 1
                                    </Select.Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                </Collapse.Panel>
            </Collapse>
        </Form>
    );
};

export default WorkForm;
