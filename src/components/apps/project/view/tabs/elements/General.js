import {Col, Divider, Progress, Row} from "antd";
import React, {useMemo} from "react";
import ButtonDrawer from "../../../../../common/button/ButtonDrawer";
import {UPDATE} from "../../../../../common/Constant";
import {convertMoney} from "../../../../../common/convert";
import {renderStatus} from "../../../../../common/status";
import ProjectForm from "../../../form";
import dayjs from "dayjs";
import AccountGroup from "../../../../../common/account/group";

const ProjectViewGeneral = ({data}) => {
    const dayDiffTime = useMemo(() => {
        return dayjs(data.endDate).diff(dayjs(data.startDate), "day");
    }, [data.startDate, data.endDate]);

    return (
        <div className={"w-full"}>
            <Row className={"justify-center text-[20px] font-bold p-[17px]"}>
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
                    {`${dayjs(data?.startDate).format(
                        "DD/MM/YYYY",
                    )} - ${dayjs(data.endDate).format(
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
                <Col span={16}>{`${convertMoney(data.budget)} VNĐ`}</Col>
            </Row>
            <Row className={"p-[17px]"}>
                <Col span={8} className={"font-bold"}>
                    Người quản trị:
                </Col>
                <Col span={16}>
                    <AccountGroup accountIds={data.manages?.map(item => item.memberId)}/>
                </Col>
            </Row>
            <Row className={"p-[17px]"}>
                <Col span={8} className={"font-bold"}>
                    Người theo dõi:
                </Col>
                <Col span={16}>
                    <AccountGroup accountIds={data.participates?.map(item => item.memberId)}/>
                </Col>
            </Row>
            <Row className={"p-[17px]"}>
                <Col span={8} className={"font-bold"}>
                    Người thực hiện:
                </Col>
                <Col span={16}>
                    <AccountGroup accountIds={data.handles?.map(item => item.memberId)}/>
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
        </div>
    );
};

export default ProjectViewGeneral;
