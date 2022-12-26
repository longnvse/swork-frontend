import React from 'react';
import {Button, Col, notification, Progress, Row, Upload} from "antd";
import {UploadOutlined} from "@ant-design/icons";
import {uploadFile} from "../../../../api/file";
import {message_error} from "../../Constant";
import {defaultStyles, FileIcon} from "react-file-icon";

const UploadFile = ({projectId, phaseId, workId, moduleId, appId}) => {

    const progressNotification = ({loaded, total}, file, error) => {
        notification.open({
            key: 'upload',
            placement: "bottomRight",
            message: loaded === total ? "Đã tải xong" : "Đang tải lên",
            description: <>
                <Row className={"items-center"} gutter={8}>
                    <Col span={2}>
                        <FileIcon
                            extension={getExtensionFile(file.name)}
                            {...defaultStyles[getExtensionFile(file.name)]}
                        />
                    </Col>
                    <Col span={20}>
                        {file.name}
                    </Col>
                    <Col span={2}>
                        <Progress type={"circle"}
                                  width={30}
                                  status={error ? "exception" : undefined}
                                  percent={Math.round((loaded * 100) / total)}
                        />
                    </Col>
                </Row>
            </>,
            duration: 0
        })
    }

    const getExtensionFile = (fileName) => {
        return fileName.split('.').pop();
    }
    const onUploadFile = (options) => {
        const {file} = options;

        const multipartBody = new FormData();

        multipartBody.set("file", file);
        multipartBody.set("metadata", JSON.stringify({moduleId, appId}));


        const config = {
            onUploadProgress: (progressEvent) => progressNotification(progressEvent, file)
        }

        uploadFile(projectId, phaseId, workId, multipartBody, config).catch((err) => {
                progressNotification({loaded: 100, total: 100}, file, err);
                message_error(err);
            }
        )
        ;
    }

    return (
        <Upload
            customRequest={onUploadFile}
            directory={false}
            fileList={[]}
        >
            <Button icon={<UploadOutlined/>}>Đính kèm</Button>
        </Upload>
    );
};

UploadFile.propTypes = {};

export default UploadFile;
