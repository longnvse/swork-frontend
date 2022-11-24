import React from 'react';
import CommonList from "../../common/list";
import {columns} from "./common/columns";
import {ADD, DATE_FORMAT, UPDATE} from "../../common/Constant";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
import {Button, message, Popconfirm} from "antd";
import {deleteTeam, getTeamPages} from "../../../api/team";
import TeamForm from "./form";
import ButtonDrawer from "../../common/button/ButtonDrawer";
import moment from "moment";

const TeamList = ({projectId, phaseId}) => {

    const onConfirmDelete = (id) => {
        deleteTeam(id).then(() => {
            message.success("Xoá đội nhóm thành công!");
        }).catch(err => {
            message.error(err.response?.data?.detail || "Đã xảy ra lỗi. Vui lòng thử lại.");
        })
    }

    const load = (params) => {
        return getTeamPages({projectId, phaseId, params});
    }

    const countMembers = (team) => {
        const numberAdmins = team?.admins?.length || 0;

        const numberMember = team?.members?.filter(member => {
            if (member.memberId === 0) {
                return true;
            }

            return !team?.admins?.some(admin => admin.memberId === member.memberId);
        }).length || 0;

        return numberAdmins + numberMember;
    }

    const mapData = (item, index) => {
        return {
            key: item.id,
            index: index + 1,
            ...item,
            quantityMembers: countMembers(item),
            inoutcoming: `${item.totalIncoming}/${item.totalSpending}`,
            parent: item.projectName || item.phaseName || "",
            time: `${moment(item.createDate).format(DATE_FORMAT)}${!item.isActive ? "/" + moment(item.modifiedDate).format(DATE_FORMAT) : ""}`,
            action: <div className={"flex justify-evenly"}>
                <ButtonDrawer
                    formId={"team-form"}
                    mode={UPDATE}
                    title={"Cập nhập đội nhóm"}
                    buttonProps={{
                        icon: <EditOutlined/>,
                        type: "link",
                        value: null
                    }}
                >
                    <TeamForm projectId={projectId} phaseId={phaseId} id={item.id}/>
                </ButtonDrawer>
                <Popconfirm
                    title={"Chắc chắn chứ!"}
                    onConfirm={() => onConfirmDelete(item.id)}>
                    <Button type={"link"} icon={<DeleteOutlined/>}/>
                </Popconfirm>
            </div>,
        }
    }

    const buttonAdd = <ButtonDrawer
        formId={"team-form"}
        mode={ADD}
        title={"Thêm đội nhóm"}
        buttonProps={{
            value: "Thêm mới"
        }}
    >
        <TeamForm projectId={projectId} phaseId={phaseId}/>
    </ButtonDrawer>;

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


export default TeamList;
