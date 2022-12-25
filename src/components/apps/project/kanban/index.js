import React, { useEffect, useState } from "react";
import Kanban from "../../kanban";
import { approvalProject, getProjectPages } from "../../../../api/project";
import {
    DATE_FORMAT,
    message_error,
    STATUS_ARRAY,
} from "../../../common/Constant";
import {
    statusBgColorKanban,
    statusColor,
    statusColorKanban,
    statusString,
} from "../../../common/status";
import { Badge, Col, message, Progress, Row } from "antd";
import { CommentOutlined, PaperClipOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { isReload } from "../../../../redux/actions/common/actions";
import { getWorkPages } from "../../../../api/work";

const ProjectKanban = ({ isWork }) => {
    const [data, setData] = useState({ lanes: [] });
    const { reload } = useSelector((state) => state.commonReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!isWork) {
            getProjectPages({ page: 1, pageSize: Number.MAX_VALUE })
                .then((res) => {
                    setData(mapDataKanban(res.data?.items || []));
                })
                .catch(message_error);
        } else {
            getWorkPages({ page: 1, pageSize: Number.MAX_VALUE })
                .then((res) => {
                    setData(mapDataKanban(res.data?.items || []));
                })
                .catch(message_error);
        }
    }, [reload]);

    const mapDataKanban = (items) => ({
        lanes: STATUS_ARRAY.map((status) => {
            const projects = items.filter((item) => item.status === status);

            return {
                id: status,
                title: statusString(status),
                label: (
                    <Badge
                        count={projects.length}
                        color={statusColorKanban(status)}
                        showZero={true}
                    />
                ),
                cards: projects.map(mapCard),
                titleStyle: {
                    color: statusColorKanban(status),
                    fontWeight: "bold",
                },
                style: {
                    background: statusBgColorKanban(status),
                },
            };
        }),
    });

    const mapCard = (item) => ({
        id: item.id,
        title: (
            <>
                <span style={{ color: "#333" }}>
                    {item.code} - {item.name}
                </span>
            </>
        ),
        label: <Progress type="circle" percent={item.progress} width={40} />,
        description: (
            <Row className={"pt-[10px] justify-between"}>
                <Col>
                    <span>
                        <CommentOutlined style={{ fontSize: 20 }} />{" "}
                        {item.commentNumber || 0}{" "}
                    </span>
                    <span>
                        <PaperClipOutlined
                            style={{ fontSize: 20 }}
                            rotate={180}
                        />{" "}
                        {item.attachNumber || 0}
                    </span>
                </Col>
                <Col>
                    <span>{dayjs(item.endDate).format(DATE_FORMAT)}</span>
                </Col>
            </Row>
        ),
        cardDroppable: false,
    });

    const onUpdateStatus = (projectId, status) => {
        approvalProject(projectId, status)
            .then((res) => {
                message.success("Cập nhật trạng thái thành công!");
            })
            .catch((error) => {
                message_error(error);
                dispatch(isReload(true));
            });
    };

    return <Kanban data={data} onUpdateStatus={onUpdateStatus} />;
};

ProjectKanban.propTypes = {};

export default ProjectKanban;
