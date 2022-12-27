import React from 'react';
import {Button, message, Popconfirm} from "antd";
import {columns} from "./common/columns";
import CommonList from "../../common/list";
import ButtonDrawer from "../../common/button/ButtonDrawer";
import AccountForm from "./form";
import {CheckOutlined, EditOutlined, StopOutlined} from "@ant-design/icons";
import {ACTIVE, ADD, DATE_FORMAT, INACTIVE, UPDATE} from "../../common/Constant";
import {renderStatus} from "../../common/status";
import {approvalAccount, getAccountPages} from "../../../api/account/api";
import dayjs from "dayjs";

const AccountList = props => {
    const onConfirmStatus = (id, status) => {
        approvalAccount(id, status).then(status => {
            message.success("Thành công!");
        })
    }

    const mapData = (item, index) => {
        return {
            key: item.id,
            ...item,
            status: renderStatus(item.status),
            dateOfBirth: dayjs((item.dateOfBirth)).format(DATE_FORMAT),
            action: <div className={"flex justify-evenly"}>
                <ButtonDrawer
                    title={"Cập nhật tài khoản"}
                    formId={"account-form"}
                    mode={UPDATE}
                    buttonProps={{
                        icon: <EditOutlined/>,
                        type: "link",
                        value: null
                    }}
                >
                    <AccountForm id={item.id}/>
                </ButtonDrawer>
                <Popconfirm title={"Chắc chắn chứ!"}
                            onConfirm={() => onConfirmStatus(item.id, item.status === ACTIVE ? INACTIVE : ACTIVE)}>
                    <Button type={"link"} icon={item.status === ACTIVE ? <StopOutlined/> : <CheckOutlined/>}/>
                </Popconfirm>
            </div>,
            index: index + 1
        }
    }

    const buttonAdd = <ButtonDrawer
        title={"Thêm mới tài khoản"}
        formId={"account-form"}
        mode={ADD}
        buttonProps={{
            value: "Thêm mới"
        }}
    >
        <AccountForm/>
    </ButtonDrawer>

    return (
        <div>
            <CommonList
                mapData={mapData}
                load={getAccountPages}
                columns={columns}
                buttonAdd={buttonAdd}
            />
        </div>
    );
};

AccountList.propTypes = {};

export default AccountList;
