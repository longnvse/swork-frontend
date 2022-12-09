import {Col, Collapse, DatePicker, Form, Input, InputNumber, message, Row, Select,} from "antd";
import React, {useEffect, useState} from "react";
import {getPhasePages} from "../../../../api/phase";
import {getProjectPages} from "../../../../api/project";
import {addWork, getWork, getWorkPages, updateWork,} from "../../../../api/work";
import SelectAccount from "../../../common/select/account";
import dayjs from "dayjs";
import {message_error} from "../../../common/Constant";

const WorkForm = ({ workId, phaseId, projectId }) => {
    const [form] = Form.useForm();
    const [projectData, setProjectData] = useState([]);
    const [projectChoosed, setProjectChoosed] = useState(0);
    const [showPhase, setShowPhase] = useState(false);
    const [phaseData, setPhaseData] = useState([]);
    const [phaseChoosed, setPhaseChoosed] = useState(0);
    const [workData, setWorkData] = useState([]);
    const [progressType, setProgressType] = useState();
    const mapDataForOptions = (data) => {
        return data?.map((option) => {
            return {
                label: option?.name,
                value: option?.id,
            };
        });
    };

    useEffect(() => {
        if (workId) {
            getWork(workId).then((response) => {
                form.setFieldsValue({
                    ...response?.data,
                    startDate:
                        response.data?.startDate &&
                        dayjs(response.data?.startDate),
                    endDate:
                        response.data?.endDate &&
                        dayjs(response.data?.endDate),
                });
                setProgressType(response.data?.progressType);
            });
        }

        getProjectPages().then((response) => {
            setProjectData(mapDataForOptions(response?.data?.items));
        });
    }, [workId]);

    const onChangeProject = (e) => {
        if (e) {
            setShowPhase(true);
            setProjectChoosed(e);
            getPhasePages(e).then((response) => {
                setPhaseData(mapDataForOptions(response?.data?.items));
            });
        }
    };

    const onChangePhase = (e) => {
        if (e) {
            setPhaseChoosed(e);
            getWorkPages({ projectId: projectChoosed, phaseId: e }).then(
                (response) => {
                    setWorkData(mapDataForOptions(response?.data?.items));
                },
            );
        }
    };

    const onChangeProgressType = (value) => {
        setProgressType(value);
    };

    const onFinish = (values) => {
        values = {
            ...values,
            projectId: values?.projectId || projectId || projectChoosed,
            phaseId: values?.phaseId || phaseId || phaseChoosed,
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
                                <SelectAccount withExt={true}/>
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
                                <SelectAccount withExt={true}/>
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
                                    <Select.Option value="byProportion">
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
                        <Col span={24}>
                            <Form.Item label="Dự án" name="projectId">
                                <Select
                                    className="w-full"
                                    placeholder="Chọn dự án"
                                    defaultValue={projectId}
                                    options={projectData}
                                    onChange={onChangeProject}
                                    onClear={() => setShowPhase(false)}
                                    onDeselect={() => setShowPhase(false)}
                                    allowClear
                                />
                            </Form.Item>
                        </Col>
                        {showPhase ? (
                            <Col span={24}>
                                <Form.Item label="Giai đoạn" name="phaseId">
                                    <Select
                                        className="w-full"
                                        placeholder="Chọn giai đoạn"
                                        defaultValue={phaseId}
                                        options={phaseData}
                                        onChange={onChangePhase}
                                        allowClear
                                    />
                                </Form.Item>
                            </Col>
                        ) : null}
                        <Col span={24}>
                            <Form.Item label="Công việc cha" name="parentId">
                                <Select
                                    className="w-full"
                                    placeholder="Chọn công việc cha"
                                    options={workData}
                                    allowClear
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                </Collapse.Panel>
            </Collapse>
        </Form>
    );
};

export default WorkForm;
