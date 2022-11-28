import React from 'react';
import {Button, message, Popconfirm} from "antd";
import {columns} from "./common/columns";
import {deleteBusiness} from "../../../api/business/api";
import CommonList from "../../common/list";
import ButtonDrawer from "../../common/button/ButtonDrawer";
import ResourceTypeForm from "./form";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
import {ADD, PENDING, UPDATE} from "../../common/Constant";
import {renderStatus} from "../../common/status";
import {getResourceTypePages} from "../../../api/resource/resource-type";

const ResourceTypeList = (props) => {
    const onConfirmDelete = (id) => {
        deleteBusiness(id).then(value => {
            message.success("Xoá thành công!");
        })
    }


    const mapData = (item) => {
        return {
            key: item.id,
            ...item,
            status: renderStatus(item.status),
            children: item.resourceTypes?.length > 0 ? item.resourceTypes.map(mapData) : null,
            action: <div className={"flex justify-evenly"}>
                <ButtonDrawer
                    title={"Cập nhật nguồn tài nguyên"}
                    formId={"resource-type-form"}
                    mode={UPDATE}
                    buttonProps={{
                        icon: <EditOutlined/>,
                        type: "link",
                        value: null
                    }}
                >
                    <ResourceTypeForm id={item.id}/>
                </ButtonDrawer>
                <Popconfirm disabled={item.status !== PENDING}
                            title={"Chắc chắn chứ!"}
                            onConfirm={() => onConfirmDelete(item.id)}>
                    <Button type={"link"} disabled={item.status !== PENDING} icon={<DeleteOutlined/>}/>
                </Popconfirm>
            </div>
        }
    }

    const buttonAdd = <ButtonDrawer
        title={"Thêm mới nguồn tài nguyên"}
        formId={"resource-type-form"}
        mode={ADD}
        buttonProps={{
            value: "Thêm mới"
        }}
    >
        <ResourceTypeForm/>
    </ButtonDrawer>

    return (
        <div>
            <CommonList
                mapData={mapData}
                load={getResourceTypePages}
                columns={columns}
                buttonAdd={buttonAdd}
            />
        </div>
    );
};

ResourceTypeList.propTypes = {};

export default ResourceTypeList;
