import React from 'react';
import CommonList from "../../common/list";
import {columns} from "./common/columns";
import {ADD, UPDATE} from "../../common/Constant";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
import {Button, message, Popconfirm} from "antd";
import {deleteDepartment, getDepartmentPages} from "../../../api/department/api";
import ButtonModal from "../../common/button/ButtonModal";
import DepartmentForm from "./form";

const DepartmentList = props => {

    const onConfirmDelete = (id) => {
        deleteDepartment(id).then(() => {
            message.success("Xoá phòng ban thành công!");
        })
    }

    const mapData = (item, index) => {
        return {
            key: item.id,
            index: index + 1,
            ...item,
            quantityMember: item.accounts?.length || 0,
            action: <div className={"flex justify-evenly"}>
                <ButtonModal
                    formId={"department-form"}
                    mode={UPDATE}
                    title={"Cập nhật phòng ban"}
                    buttonProps={{
                        icon: <EditOutlined/>,
                        type: "link",
                        value: null
                    }}
                >
                    <DepartmentForm id={item.id}/>
                </ButtonModal>
                <Popconfirm
                    title={"Chắc chắn chứ!"}
                    onConfirm={() => onConfirmDelete(item.id)}>
                    <Button type={"link"} icon={<DeleteOutlined/>}/>
                </Popconfirm>
            </div>,
        }
    }

    const buttonAdd = <ButtonModal
        formId={"department-form"}
        mode={ADD}
        title={"Thêm phòng ban"}
        buttonProps={{
            value: "Thêm mới"
        }}
    >
        <DepartmentForm/>
    </ButtonModal>;

    return (
        <div>
            <CommonList
                mapData={mapData}
                load={getDepartmentPages}
                columns={columns}
                buttonAdd={buttonAdd}
            />
        </div>
    );
};


export default DepartmentList;
