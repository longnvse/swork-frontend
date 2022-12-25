import {
    DeleteOutlined,
    EditOutlined,
    PlusOutlined,
    FolderOutlined,
    ApartmentOutlined,
    CheckCircleOutlined,
} from "@ant-design/icons";
import { Button, message, Popconfirm, Progress, Col, Row } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteWork, getWorkPages } from "../../../../api/work";
import ButtonDrawer from "../../../common/button/ButtonDrawer";
import {
    ADD,
    DATE_FORMAT,
    DENIED,
    message_error,
    STATUS,
    UPDATE,
} from "../../../common/Constant";
import { columnsWork } from "../common/columns";
import WorkForm from "../form";
import { useDispatch } from "react-redux";
import { isReload, setHeader } from "../../../../redux/actions/common/actions";
import SWTabs from "../../../common/tabs";
import CommonList from "../../../common/list";
import { renderStatus, renderTag } from "../../../common/status";
import dayjs from "dayjs";
import ButtonTab from "../../../common/button/ButtonTab";

const WorkList = ({ projectId, phaseId }) => {
    const [filter, setFilter] = useState(null);
    const dispatch = useDispatch();
    const status = ["pending", "active", "completed", "inactive", "denied"];

    useEffect(() => {
        dispatch(setHeader("Danh sách công việc"));
    }, []);

    useEffect(() => {
        if (filter !== null) {
            dispatch(isReload(true));
        }
    }, [filter]);

    const onLoad = useCallback(
        (params) => {
            params.filter = filter;

            return getWorkPages(params);
        },
        [filter],
    );

    const onConfirmDelete = (id) => {
        deleteWork(id)
            .then((value) => {
                message.success("Xoá thành công!");
            })
            .catch(message_error);
    };

    const getDeadline = (d1, d2) => {
        let ms1 = d1.getTime();
        let ms2 = d2.getTime();

        const deadline = Math.ceil((ms2 - ms1) / (24 * 60 * 60 * 1000));

        if (deadline > 1) {
            return (
                <div className="text-red-500">
                    {renderTag(`Quá hạn ${deadline} ngày`, "error")}
                </div>
            );
        } else if (deadline < 1) {
            return (
                <div className="text-green-500">
                    {renderTag(`Còn ${Math.abs(deadline)} ngày`, "success")}
                </div>
            );
        } else if (deadline === 1) {
            return (
                <div className="text-orange-400">
                    {renderTag(`Đến hạn`, "volcano")}
                </div>
            );
        }
    };

    const mapData = (item) => {
        return {
            key: item.id,
            ...item,
            name: (
                <div>
                    <Link to={`/project/view-work/${item?.id}`}>
                        {item?.name}
                    </Link>
                    <div className="flex items-center">
                        {item?.projectId ? (
                            <div className="flex items-center">
                                <FolderOutlined />
                                <Link
                                    to={`/project/view-project/${item?.projectId}`}
                                    className="ml-2 block text-gray-800 hover:underline"
                                    style={{ fontSize: 13 }}
                                >
                                    {item?.projectName}
                                </Link>
                                {item?.projectId && item?.phaseId ? (
                                    <span className="mx-2">/</span>
                                ) : null}
                            </div>
                        ) : null}
                        {item?.phaseId ? (
                            <div className="flex items-center">
                                <ApartmentOutlined />
                                <Link
                                    to={`/project/view-phase/${item?.phaseId}`}
                                    className="ml-2 block text-gray-800 hover:underline"
                                    style={{ fontSize: 13 }}
                                >
                                    {item?.phaseName}
                                </Link>
                            </div>
                        ) : null}
                        {item?.parentId ? (
                            <div className="flex items-center">
                                <CheckCircleOutlined />
                                <Link
                                    to={`/project/view-work/${item?.parentId}`}
                                    className="ml-2 block text-gray-800 hover:underline"
                                    style={{ fontSize: 13 }}
                                >
                                    {item?.parentName}
                                </Link>
                            </div>
                        ) : null}
                    </div>
                </div>
            ),
            progress: <Progress percent={item?.progress} />,
            admin: item?.admin,
            status: renderStatus(item?.status),
            endDate: dayjs(item?.endDate).format(DATE_FORMAT),
            deadline: getDeadline(new Date(item?.endDate), new Date()),
            action: (
                <div className={"flex justify-evenly"}>
                    <ButtonDrawer
                        title={"Cập nhật công việc"}
                        formId={"work-form"}
                        mode={UPDATE}
                        buttonProps={{
                            icon: <EditOutlined />,
                            type: "link",
                            value: null,
                        }}
                    >
                        <WorkForm workId={item?.id} />
                    </ButtonDrawer>
                    <Popconfirm
                        disabled={item.status !== DENIED}
                        title={"Chắc chắn chứ!"}
                        onConfirm={() => onConfirmDelete(item.id)}
                    >
                        <Button
                            type={"link"}
                            disabled={item.status !== DENIED}
                            icon={<DeleteOutlined />}
                        />
                    </Popconfirm>
                </div>
            ),
        };
    };

    const tabItemsForList = [
        {
            label: "Tất cả",
            key: "all",
        },
        ...status.map((item) => ({ label: STATUS[item], key: item })),
    ];

    const onChangeStatusFilter = (activeKey) => {
        if (!isValidStatus(activeKey)) {
            return;
        }
        if (activeKey === "all") {
            setFilter((prev) => undefined);
            return;
        }
        setFilter((prev) => `status eq '${activeKey}'`);
    };

    const isValidStatus = (activeKey) => {
        return (
            tabItemsForList.findIndex((item) => item.key === activeKey) !== -1
        );
    };

    const tabExtra = (
        <Row gutter={8}>
            <Col>
                <ButtonDrawer
                    title={"Thêm mới công việc"}
                    formId={"work-form"}
                    mode={ADD}
                    button={
                        <ButtonTab
                            icon={<PlusOutlined style={{ fontSize: 20 }} />}
                            title={"Thêm công việc"}
                        />
                    }
                >
                    <WorkForm />
                </ButtonDrawer>
            </Col>
        </Row>
    );

    return (
        <div>
            <SWTabs
                onChange={onChangeStatusFilter}
                items={tabItemsForList}
                tabBarExtraContent={tabExtra}
            />
            <CommonList
                mapData={mapData}
                load={onLoad}
                columns={columnsWork}
                hiddenButton={false}
            />
        </div>
    );
};

export default WorkList;
