import React, {useMemo} from "react";
import {Col, Divider, Progress, Row} from "antd";
import {renderStatus} from "../../../../common/status";
import {UPDATE} from "../../../../common/Constant";
import ProjectForm from "../../form";
import ButtonDrawer from "../../../../common/button/ButtonDrawer";
import moment from "moment";

function ProjectViewGeneral({data}) {
    const dayDiffTime = useMemo(() => {
        return moment(data.endDate).diff(moment(data.startDate), "day");
    }, [data.startDate, data.endDate]);

    return (
        <Row>
            <Col
                span={7}
                className={
                    "rounded-[8px] border-solid border-[1px] border-[#ccc]"
                }
            >
                <Row
                    className={"justify-center text-[20px] font-bold p-[17px]"}
                >
                    {data.name}
                </Row>
                <Row className={"justify-center pb-[17px]"}>
                    {renderStatus(data.status)}
                </Row>
                <Row className={"p-[17px] justify-between"}>
                    <Col span={3}>Tiến độ:</Col>
                    <Col span={20}>
                        <Progress percent={data.progress}/>
                    </Col>
                </Row>
                <Divider style={{fontSize: 14}} orientation="left">
                    Chi tiết
                </Divider>
                <Row className={"p-[17px]"}>
                    <Col span={8} className={"font-bold"}>
                        Thời gian dự kiến:
                    </Col>
                    <Col span={16}>
                        {`${moment(data?.startDate).format(
                            "DD/MM/YYYY",
                        )} - ${moment(data.endDate).format(
                            "DD/MM/YYYY",
                        )} (${dayDiffTime} ngày)`}
                    </Col>
                </Row>
                <Row className={"p-[17px]"}>
                    <Col span={8} className={"font-bold"}>
                        Thời gian thực tế:
                    </Col>
                    <Col span={16}>{data.actualStartDate}</Col>
                </Row>
                <Row className={"p-[17px]"}>
                    <Col span={8} className={"font-bold"}>
                        Ngân sách:
                    </Col>
                    <Col span={16}>{`${data.budget} VNĐ`}</Col>
                </Row>
                <Row className={"p-[17px]"}>
                    <Col span={8} className={"font-bold"}>
                        Người quản trị:
                    </Col>
                    <Col span={16}>
                        {data.manages?.map((item) => item.memberName)}
                    </Col>
                </Row>
                <Row className={"p-[17px]"}>
                    <Col span={8} className={"font-bold"}>
                        Người theo dõi:
                    </Col>
                    <Col span={16}>
                        {data.participates?.map((item) => item.memberName)}
                    </Col>
                </Row>
                <Row className={"p-[17px]"}>
                    <Col span={8} className={"font-bold"}>
                        Người thực hiện:
                    </Col>
                    <Col span={16}>
                        {data.handles?.map((item) => item.memberName)}
                    </Col>
                </Row>
                <Row className={"justify-center mb-[17px]"}>
                    <ButtonDrawer
                        title={"Thêm mới dự án"}
                        formId={"project-form"}
                        mode={UPDATE}
                        buttonProps={{
                            value: "Cập nhật",
                        }}
                    >
                        <ProjectForm id={data.id}/>
                    </ButtonDrawer>
                </Row>
            </Col>
        </Row>
    );
}

export default ProjectViewGeneral;
