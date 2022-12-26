import React, {useEffect, useState} from "react";
import {Col, Form, InputNumber, Row, Slider} from "antd";
import {getWork, reportProgressManual} from "../../../../api/work";
import {message_error} from "../../../common/Constant";

const ReportManual = ({workId}) => {
    const [form] = Form.useForm();
    const [value, setValue] = useState(0);

    useEffect(() => {
        if (workId) {
            getWork(workId).then(res => {
                setValue(res.data?.progress || 0);
            }).catch(message_error)
        }
    }, [workId]);

    const onFinish = () => {
        reportProgressManual(workId, value).catch(message_error);
    };

    return (
        <Form
            id={"report-progress-form"}
            form={form}
            layout={"vertical"}
            onFinish={onFinish}
        >
            <Row gutter={8}>
                <Col span={20}>
                    <Slider
                        min={0}
                        max={100}
                        value={value}
                        range={false}
                        onChange={(value) => setValue(value)}
                    />
                </Col>
                <Col span={4}>
                    <InputNumber min={0}
                                 max={100}
                                 value={value}
                                 onChange={(value) => setValue(value)}
                                 className={"w-full"}/>
                </Col>
            </Row>
        </Form>
    );
};

export default ReportManual;
