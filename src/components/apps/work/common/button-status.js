import React, {useEffect} from 'react';
import {Button, Dropdown, message} from "antd";
import {PauseCircleOutlined, PlayCircleOutlined} from "@ant-design/icons";
import {approvalWork} from "../../../../api/work";

const ButtonStatus = ({workId, status}) => {
        const items = [
            {label: "Chờ thực hiện", key: "pending"},
            {label: "Đang thực hiện", key: "active"},
            {label: "Hoàn thành", key: "completed"},
            {label: "Tạm dừng", key: "inactive"},
            {label: "Huỷ", key: "denied"},
        ]

        useEffect(() => {
            console.log("status", status);
        }, [status]);


        const onSelectStatus = ({key}) => {
            console.log(key)
            approvalWork(workId, key).then(res => {
                message.success("Cập nhật trạng thái thành công!");
            }).catch(err => {
                message.error(err.response?.data?.detail || err.response?.data?.title || "Đã có lỗi xảy ra. Vui lòng thử lại!");
            })
        }

        return (
            <Dropdown
                menu={{
                    items,
                    selectable: true,
                    selectedKeys: [status],
                    onSelect: onSelectStatus
                }}
                overlayClassName={"w-[10rem]"}
            >
                <Button
                    icon={!status || status === 'pending' ? <PlayCircleOutlined style={{fontSize: 20}}/> :
                        <PauseCircleOutlined style={{fontSize: 20}}/>}
                    className={"flex flex-col items-center justify-center h-fit w-fit border-0" +
                        " btn--tab"}
                    style={{
                        fontSize: 10,
                        lineHeight: '16px'
                    }}
                >
                    Trạng thái
                </Button>
            </Dropdown>
        )
            ;
    }
;

export default ButtonStatus;
