import React, {useEffect, useState} from 'react';
import {Col, Form, InputNumber, message, Row} from "antd";
import {useForm} from "antd/es/form/Form";
import FormItem from "antd/es/form/FormItem";
import {getWork, reportProgressByAmount} from "../../../../api/work";
import {message_error} from "../../../common/Constant";

const ReportAmountForm = ({workId}) => {
    const [totalAmount, setTotalAmount] = useState(0);
    const [unit, setUnit] = useState();
    const [form] = useForm();

    useEffect(() => {
        getWork(workId).then(res => {
            setTotalAmount(res.data?.incompleteAmount);
            setUnit(res.data?.unit);
        }).catch(message_error)
    }, [workId])

    const onFinish = (values) => {
        const {completeAmount} = values;
        reportProgressByAmount(workId, completeAmount).then(res => {
            message.success("Thành công!");
        }).catch(message_error)
    }

    return (
        <Form
            id={"report-progress-form"}
            form={form}
            layout={"vertical"}
            onFinish={onFinish}
        >
            <Row gutter={12} className={"w-full"}>
                <Col span={12}>
                    <FormItem
                        name={"completeAmount"}
                        label={"Hoàn thành"}
                        required={true}
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng nhập khối lượng đã hoàn thành!"
                            }
                        ]}
                    >
                        <InputNumber
                            className={"w-full"}
                            controls={false}
                            addonAfter={unit}
                        />
                    </FormItem>
                </Col>
                <Col span={12}>
                    <FormItem
                        className={"w-full"}
                        label={"Tổng"}
                    >
                        <InputNumber
                            className={"w-full"}
                            value={totalAmount}
                            disabled={true}
                            controls={false}
                            addonAfter={unit}
                        />
                    </FormItem>
                </Col>
            </Row>

        </Form>
    );
};

export default ReportAmountForm;
