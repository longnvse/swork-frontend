import React from "react";
import CommonList from "../../common/list";
import {columns} from "./common/columns";
import {ADD, DATE_FORMAT, message_error, UPDATE} from "../../common/Constant";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
import {Button, message, Popconfirm} from "antd";
import {deleteTeam, getTeamPages} from "../../../api/team";
import TeamForm from "./form";
import ButtonDrawer from "../../common/button/ButtonDrawer";
import {Link} from "react-router-dom";
import dayjs from "dayjs";
import {convertMoney} from "../../common/convert";

const TeamList = ({projectId, phaseId}) => {
    const onConfirmDelete = (id) => {
        deleteTeam(id)
            .then(() => {
                message.success("Xoá đội nhóm thành công!");
            })
            .catch(message_error);
    };

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
            manages: item.admins.map((admin) => (
                <span>{admin.memberName}</span>
            )),
            quantityMembers: countMembers(item),
            inoutcoming: `${convertMoney(item.totalSpending)} VNĐ/${convertMoney(item.totalIncoming)} VNĐ`,
            parent: item.projectName || item.phaseName || "",
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
                    >
                        <Button type={"link"} icon={<DeleteOutlined/>}/>
                    </Popconfirm>
                </div>
            ),
        };
    };

    const buttonAdd = (
        <ButtonDrawer
            formId={"team-form"}
            mode={ADD}
            title={"Thêm đội nhóm"}
            buttonProps={{
                value: "Thêm mới",
            }}
        >
            <TeamForm projectId={projectId} phaseId={phaseId}/>
        </ButtonDrawer>
    );

    return (
        <div>
            <CommonList
                mapData={mapData}
                load={load}
                columns={columns}
                buttonAdd={buttonAdd}
            />
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
