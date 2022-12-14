import React from 'react';
import {Button, Dropdown, message} from "antd";
import {PauseCircleOutlined, PlayCircleOutlined} from "@ant-design/icons";
import {message_error} from "../../../common/Constant";

const ButtonStatus = ({updateStatus, status}) => {
    const items = [{label: "Chờ thực hiện", key: "pending"}, {
        label: "Đang thực hiện",
        key: "active"
    }, {label: "Hoàn thành", key: "completed"}, {label: "Tạm dừng", key: "inactive"}, {label: "Huỷ", key: "denied"},]

    const onSelectStatus = ({key}) => {
        updateStatus(key).then(res => {
            message.success("Cập nhật trạng thái thành công!");
        }).catch(message_error)
    }

    return (<Dropdown
            menu={{
                items, selectable: true, selectedKeys: [status], onSelect: onSelectStatus
            }}
            overlayClassName={"w-[10rem]"}
        >
            <Button
                icon={!status || status === 'pending' ? <PlayCircleOutlined style={{fontSize: 20}}/> :
                    <PauseCircleOutlined style={{fontSize: 20}}/>}
                className={"flex flex-col items-center justify-center h-fit w-fit border-0" + " btn--tab"}
                style={{
                    fontSize: 10, lineHeight: '16px'
                }}
            >
                Trạng thái
            </Button>
        </Dropdown>);
};

export default ButtonStatus;
