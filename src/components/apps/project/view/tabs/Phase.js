import React from "react";
import CommonList from "../../../../common/list";
import { columnPhase } from "../../common/columns";
import { deletePhase, getPhasePages } from "../../../../../api/phase";
import ButtonDrawer from "../../../../common/button/ButtonDrawer";
import { ADD, INACTIVE, UPDATE } from "../../../../common/Constant";
import PhaseForm from "../../../phase/form";
import { renderStatus } from "../../../../common/status";
import { Button, message, Popconfirm, Progress } from "antd";
import moment from "moment";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

function ProjectViewPhase({ projectId }) {
    const load = (params) => {
        return getPhasePages(projectId, params);
    };

    const onConfirmDelete = (id) => {
        deletePhase(id)
            .then((value) => {
                message.success("Xoá thành công!");
            })
            .catch((err) => {
                message.error(
                    err.response?.data?.detail ||
                        "Đã có lỗi xảy ra. Vui lòng thử lại sau ít phút!",
                );
            });
    };

    const mapData = (item) => ({
        key: item.id,
        ...item,
        name: <Link to={`/project/view-phase/${item?.id}`}>{item?.name}</Link>,
        status: renderStatus(item.status),
        progress: <Progress percent={item.progress} />,
        startDate: moment(item.startDate).format("DD/MM/YYYY"),
        endDate: moment(item.endDate).format("DD/MM/YYYY"),
        action: (
            <div className={"flex justify-evenly"}>
                <ButtonDrawer
                    title={"Cập nhật giai đoạn"}
                    formId={"phase-form"}
                    mode={UPDATE}
                    buttonProps={{
                        icon: <EditOutlined />,
                        type: "link",
                        value: null,
                    }}
                >
                    <PhaseForm projectId={projectId} id={item.id} />
                </ButtonDrawer>
                <Popconfirm
                    disabled={item.status !== INACTIVE}
                    title={"Chắc chắn chứ!"}
                    onConfirm={() => onConfirmDelete(item.id)}
                >
                    <Button
                        type={"link"}
                        disabled={item.status !== INACTIVE}
                        icon={<DeleteOutlined />}
                    />
                </Popconfirm>
            </div>
        ),
    });

    const buttonAdd = (
        <ButtonDrawer
            title={"Thêm mới giai đoạn"}
            formId={"phase-form"}
            mode={ADD}
            buttonProps={{
                value: "Thêm mới",
            }}
        >
            <PhaseForm projectId={projectId} />
        </ButtonDrawer>
    );

    return (
        <CommonList
            mapData={mapData}
            load={load}
            columns={columnPhase}
            buttonAdd={buttonAdd}
        />
    );
}

export default ProjectViewPhase;
