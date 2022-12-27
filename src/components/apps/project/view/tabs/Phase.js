import React from "react";
import CommonList from "../../../../common/list";
import {columnPhase} from "../../common/columns";
import {deletePhase, getPhasePages} from "../../../../../api/phase";
import ButtonDrawer from "../../../../common/button/ButtonDrawer";
import {DATE_FORMAT, message_error, PENDING, PROJECT_ROLE, UPDATE,} from "../../../../common/Constant";
import PhaseForm from "../../../phase/form";
import {Button, message, Popconfirm, Progress} from "antd";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
import {Link} from "react-router-dom";
import dayjs from "dayjs";
import {getMe} from "../../../../../api/common";
import AccountGroup from "../../../../common/account/group";
import {renderStatus} from "../../../../common/status";

function ProjectViewPhase({projectId, role}) {
    const load = (params) => {
        return getPhasePages(projectId, params);
    };

    const onConfirmDelete = (id) => {
        deletePhase(id)
            .then((value) => {
                message.success("Xoá thành công!");
            })
            .catch(message_error);
    };

    const isDisable = (role, item) => {
        if (role === PROJECT_ROLE.MANAGE) {
            return false;
        }

        return item.phaseManages.findIndex(account => account.accountId === getMe().accountId) === -1;
    }

    const mapData = (item) => ({
        key: item.id,
        ...item,
        name: <Link to={`/project/view-phase/${item?.id}`}>{item?.name}</Link>,
        status: <div className={"flex justify-center"}>{renderStatus(item.status)}</div>,
        progress: <Progress percent={item.progress}/>,
        startDate: dayjs(item.startDate).format(DATE_FORMAT),
        endDate: dayjs(item.endDate).format(DATE_FORMAT),
        manages: <AccountGroup accountIds={item.phaseManages.map(manage => manage.accountId)}/>,
        action: (
            <div className={"flex justify-evenly"}>
                <ButtonDrawer
                    title={"Cập nhật giai đoạn"}
                    formId={"phase-form"}
                    mode={UPDATE}
                    buttonProps={{
                        icon: <EditOutlined/>,
                        type: "link",
                        value: null,
                        disabled: isDisable(role, item)
                    }}
                >
                    <PhaseForm projectId={projectId} id={item.id}/>
                </ButtonDrawer>
                <Popconfirm
                    disabled={item.status !== PENDING || isDisable(role, item)}
                    title={"Chắc chắn chứ!"}
                    onConfirm={() => onConfirmDelete(item.id)}
                >
                    <Button
                        type={"link"}
                        disabled={item.status !== PENDING || isDisable(role, item)}
                        icon={<DeleteOutlined/>}
                    />
                </Popconfirm>
            </div>
        ),
    });

    return <CommonList
        mapData={mapData}
        load={load}
        columns={columnPhase}/>;
}

export default ProjectViewPhase;
