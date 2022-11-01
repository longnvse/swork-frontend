import React from 'react';
import {Button, message, Popconfirm} from "antd";
import {columns} from "./common/columns";
import {approvalBusiness, deleteBusiness, getBusinessPages} from "../../../api/business/api";
import CommonList from "../../common/list";
import ButtonDrawer from "../../common/button/ButtonDrawer";
import BusinessForm from "./form";
import {CheckOutlined, DeleteOutlined, EditOutlined, StopOutlined} from "@ant-design/icons";
import {ACTIVE, INACTIVE, UPDATE, PENDING} from "../../common/Constant";
import {renderStatus} from "../../common/status";

const BusinessList = props => {
    const onConfirmStatus = (id, status) => {
        approvalBusiness(id, status).then(status => {
            message.success("Thành công!");
        })
    }

    const onConfirmDelete = (id) => {
        deleteBusiness(id).then(value => {
            message.success("Xoá thành công!");
        })
    }


    const mapData = (item, index) => {
        return {
            key: item.id,
            ...item,
            status: renderStatus(item.status),
            action: <div className={"flex justify-evenly"}>
                <ButtonDrawer
                    title={"Cập nhật Công ty/Doanh nghiệp"}
                    formId={"business-form"}
                    mode={UPDATE}
                    buttonProps={{
                        icon: <EditOutlined/>,
                        type: "link",
                        value: null
                    }}
                >
                    <BusinessForm id={item.id}/>
                </ButtonDrawer>
                <Popconfirm title={"Chắc chắn chứ!"}
                            onConfirm={() => onConfirmStatus(item.id, item.status === ACTIVE ? INACTIVE : ACTIVE)}>
                    <Button type={"link"} icon={item.status === ACTIVE ? <StopOutlined/> : <CheckOutlined/>}/>
                </Popconfirm>
                <Popconfirm disabled={item.status !== PENDING}
                            title={"Chắc chắn chứ!"}
                            onConfirm={() => onConfirmDelete(item.id)}>
                    <Button type={"link"} disabled={item.status !== PENDING} icon={<DeleteOutlined/>}/>
                </Popconfirm>
            </div>,
            index: index + 1
        }
    }

    return (
        <div>
            <CommonList
                mapData={mapData}
                load={getBusinessPages}
                columns={columns}
            />
        </div>
    );
};

BusinessList.propTypes = {};

export default BusinessList;
