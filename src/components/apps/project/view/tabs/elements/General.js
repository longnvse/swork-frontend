import {Col, Divider, Progress, Row} from "antd";
import React, {useMemo} from "react";
import ButtonDrawer from "../../../../../common/button/ButtonDrawer";
import {PROJECT_ROLE, UPDATE} from "../../../../../common/Constant";
import {convertMoney} from "../../../../../common/convert";
import {renderStatus} from "../../../../../common/status";
import ProjectForm from "../../../form";
import dayjs from "dayjs";
import AccountGroup from "../../../../../common/account/group";

const ProjectViewGeneral = ({data, role}) => {
    const dayDiffTime = (startDate, endDate) => {
        if (!startDate || !endDate) {
            return "";
        }

        return dayjs(endDate).diff(dayjs(startDate), "days") + 1;
    }

    const renderActualTime = useMemo(() => {
        const arr = [];
        if (data?.actualStartDate) {
            arr.push(dayjs(data?.actualStartDate).format("DD/MM/YYYY"));
        }
        if (data?.actualEndDate) {
            arr.push(dayjs(data?.actualEndDate).format("DD/MM/YYYY"));
        }

        const dayDiff = dayDiffTime(data?.actualStartDate, data?.actualEndDate);

        return `${arr.join(" - ")}${!dayDiff ? "" : ` (${dayDiff} ngày)`}`;

    }, [data]);

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
                    )} (${dayDiffTime(data?.startDate, data?.endDate)} ngày)`}
                </Col>
            </Row>
            {data?.actualStartDate && <Row className={"p-[17px]"}>
                <Col span={8} className={"font-bold"}>
                    Thời gian thực tế:
                </Col>
                <Col span={16}>
                    {renderActualTime}
                </Col>
            </Row>}
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
                        style: {
                            display: role !== PROJECT_ROLE.MANAGE && "none"
                        }
                    }}
                >
                    <ProjectForm id={data.id}/>
                </ButtonDrawer>
            </Row>
        </div>
    );
};

export default ProjectViewGeneral;
