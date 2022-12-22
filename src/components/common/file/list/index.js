import React, {useCallback, useMemo, useState} from 'react';
import CommonList from "../../list";
import {columns} from "./columns";
import {deleteFiles, getFilePages} from "../../../../api/file";
import dayjs from "dayjs";
import {defaultStyles, FileIcon} from "react-file-icon";
import {Button, Col, Modal, Row} from "antd";
import {formatBytes, message_error} from "../../Constant";
import UploadFile from "../upload";
import {DeleteOutlined} from "@ant-design/icons";
import {getMe} from "../../../../api/common";
import AccountGroup from "../../account/group";

const FileList = ({projectId, phaseId, workId, moduleId, appId}) => {
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    const load = useCallback((params) => {
        return getFilePages({...params, projectId, phaseId, workId, moduleId, appId});
    }, [projectId, phaseId, workId, moduleId, appId]);

    const mapData = (item) => ({
        ...item,
        key: item.fileId,
        creator: <AccountGroup accountIds={[item.creatorId]}/>,
        fileName: renderFileName(item),
        createDate: dayjs(item.createDate).format("HH:mm DD-MM-YYYY"),
        action: <Row>
            <Col>
                <Button
                    disabled={getMe().accountId !== item.creatorId}
                    type={"link"} icon={<DeleteOutlined/>}
                    onClick={() => onClickButtonDelete([item.fileId])}/>
            </Col>
        </Row>
    })

    const renderFileName = (item) => {
        return (
            <a
                style={{
                    color: 'black'
                }}
                href={item.urlDownload}
                rel={"noreferrer"}
                target={"_self"}
                download={item.fileName}
            >
                <Row className={"items-center"} gutter={20}>
                    <Col
                        className={"w-[50px]"}><FileIcon
                        extension={item.fileType} {...defaultStyles[item.fileType]}/></Col>
                    <Col span={22}>
                        <Row className={"font-bold"}>
                            {item.fileName}
                        </Row>
                        <Row>
                            <span className={"text-[#A5A5A5]"}>{formatBytes(item.fileSize)}</span>
                        </Row>
                    </Col>
                </Row>
            </a>
        )
    }

    const onClickButtonDelete = (fileIds) => {
        Modal.confirm({
            icon: null,
            title: "Xoá tệp đính kèm?",
            content: "Bạn có chắc chắn muốn xoá?",
            okText: "Xoá",
            onOk: () => onDeleteFiles(fileIds),
            closable: true,
            maskClosable: true
        })
    }

    const onDeleteFiles = (ids) => {
        deleteFiles(`fileIds=${ids.join("&fileIds=")}`)
            .then(() => {
                setSelectedRowKeys([]);
            })
            .catch(message_error);
    }

    const rowSelection = useMemo(() => {
        if (getMe().role === "admin") {
            return {
                selectedRowKeys,
                onChange: setSelectedRowKeys,
                preserveSelectedRowKeys: true
            }
        }

        return {};
    }, [selectedRowKeys]);


    return (
        <>
            <Row className={"mb-4 justify-end"} gutter={12}>
                {selectedRowKeys.length > 0 &&
                    <Button type={"text"} icon={<DeleteOutlined/>}
                            onClick={() => onClickButtonDelete(selectedRowKeys)}/>
                }
                <Col>
                    <UploadFile
                        projectId={projectId}
                        phaseId={phaseId}
                        workId={workId}
                        appId={appId}
                        moduleId={moduleId}
                    />
                </Col>
            </Row>
            <CommonList
                columns={columns}
                load={load}
                mapData={mapData}
                hiddenButton={true}
                maxHeight={600}
                isSelections={getMe().role === "admin"}
                rowSelection={rowSelection}
            />
        </>
    );
};

export default FileList;
