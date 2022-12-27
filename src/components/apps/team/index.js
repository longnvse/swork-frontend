import React from "react";
import CommonList from "../../common/list";
import {columns} from "./common/columns";
import {DATE_FORMAT, message_error, PROJECT_ROLE, UPDATE} from "../../common/Constant";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
import {Button, message, Popconfirm} from "antd";
import {deleteTeam, getTeamPages} from "../../../api/team";
import TeamForm from "./form";
import ButtonDrawer from "../../common/button/ButtonDrawer";
import {Link} from "react-router-dom";
import dayjs from "dayjs";
import {convertMoney} from "../../common/convert";
import AccountGroup from "../../common/account/group";

const TeamList = ({projectId, phaseId, role}) => {
    const onConfirmDelete = (id) => {
        deleteTeam(id)
            .then(() => {
                message.success("Xoá đội nhóm thành công!");
            })
            .catch(message_error);
    };

    console.log(role);

    const load = (params) => {
        return getTeamPages({projectId, phaseId, params});
    };

    const mapData = (item, index) => {
        return {
            key: item.id,
            index: index + 1,
            ...item,
            name: (
                <Link to={`/project/view-team/${item?.id}`}>{item?.name}</Link>
            ),
            manages: (
                <AccountGroup
                    accountIds={item.admins.map((item) => item.memberId)}
                />
            ),
            quantityMembers: countMembers(item),
            inoutcoming: `${convertMoney(
                item.totalSpending,
            )} VNĐ/${convertMoney(item.totalIncoming)} VNĐ`,
            parent: getParentLink(item),
            time: `${dayjs(item.createDate).format(DATE_FORMAT)}${
                !item.isActive
                    ? "/" + dayjs(item.modifiedDate).format(DATE_FORMAT)
                    : ""
            }`,
            action: (
                <div className={"flex justify-evenly"}>
                    <ButtonDrawer
                        formId={"team-form"}
                        mode={UPDATE}
                        title={"Cập nhập đội nhóm"}
                        buttonProps={{
                            icon: <EditOutlined/>,
                            type: "link",
                            value: null,
                            disabled: role === PROJECT_ROLE.PARTICIPATE
                        }}
                    >
                        <TeamForm
                            projectId={projectId}
                            phaseId={phaseId}
                            id={item.id}
                        />
                    </ButtonDrawer>
                    <Popconfirm
                        title={"Chắc chắn chứ!"}
                        onConfirm={() => onConfirmDelete(item.id)}
                        disabled={role === PROJECT_ROLE.PARTICIPATE}
                    >
                        <Button
                            disabled={role === PROJECT_ROLE.PARTICIPATE}
                            type={"link"}
                            icon={<DeleteOutlined/>}/>
                    </Popconfirm>
                </div>
            ),
        };
    };

    const getParentLink = (item) => {
        if (item.phaseId) {
            return <Link to={`/project/view-phase/${item.phaseId}`}>{item.phaseName}</Link>
        }

        return <Link to={`/project/view/${item.projectId}`}>{item.projectName}</Link>
    }

    return (
        <div>
            <CommonList
                mapData={mapData}
                load={load}
                columns={columns}/>
        </div>
    );
};

export const countMembers = (team) => {
    const numberAdmins = team?.admins?.length || 0;

    const numberMember =
        team?.members?.filter((member) => {
            if (member.memberId === 0) {
                return true;
            }

            return !team?.admins?.some(
                (admin) => admin.memberId === member.memberId,
            );
        }).length || 0;

    return numberAdmins + numberMember;
};

export default TeamList;
