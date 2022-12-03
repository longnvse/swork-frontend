import {Button, Col, Input, message, Popconfirm, Row, Table} from "antd";
import React, {useEffect, useState} from "react";
import {FiSearch} from "react-icons/fi";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
import ButtonDrawer from "../../../../common/button/ButtonDrawer";
import {ADD, DATE_FORMAT, INACTIVE, UPDATE} from "../../../../common/Constant";
import ResourceForm from "../../../resource/form";
import {columnsResource} from "../../../resource/common/columns";
import {deleteResource, getResourcePages,} from "../../../../../api/resource/resource";
import {useSelector} from "react-redux";
import moment from "moment";

function ProjectViewResource({resourceData, projectId, phaseId, teamId}) {
    const [dataSources, setDataSources] = useState([]);
    const {reload} = useSelector(state => state.commonReducer);
    useEffect(() => {
        if (!resourceData) {
            getResourcePages({projectId: projectId, phaseId: phaseId}).then((response) => {
                setDataSources(mapData(response?.data?.items));
            });
        }
        setDataSources(resourceData);
    }, [resourceData, reload]);

    const onConfirmDelete = (id) => {
        deleteResource(id)
            .then(() => {
                message.success("Xoá thành công!");
            })
            .catch((err) => {
                message.error(
                    err.response?.data?.detail ||
                    "Đã có lỗi xảy ra. Vui lòng thử lại sau ít phút!",
                );
            });
    };

    const mapData = (data) => {
        if (data?.length <= 0) return [];
        return data?.map((item) => {
            return {
                key: item.id,
                ...item,
                name: item?.resourceTypeName,
                quantity: item?.quantity,
                totalAmount: item?.totalAmount,
                team: item?.teamName,
                parent: item?.parentName,
                date: item?.dateResource && moment(item.dateResource).format(DATE_FORMAT),
                creator: item?.creator,
                action: (
                    <div className={"flex justify-evenly"}>
                        <ButtonDrawer
                            title={"Cập nhật tài nguyên"}
                            formId={"resource-form"}
                            mode={UPDATE}
                            buttonProps={{
                                icon: <EditOutlined/>,
                                type: "link",
                                value: null,
                            }}
                        >
                            <ResourceForm
                                resourceId={item?.id}
                                projectId={projectId}
                                phaseId={phaseId}
                                teamId={teamId}
                            />
                        </ButtonDrawer>
                        <Popconfirm
                            disabled={item.status !== INACTIVE}
                            title={"Chắc chắn chứ!"}
                            onConfirm={() => onConfirmDelete(item.id)}
                        >
                            <Button
                                type={"link"}
                                disabled={item.status !== INACTIVE}
                                icon={<DeleteOutlined/>}
                            />
                        </Popconfirm>
                    </div>
                ),
            };
        });
    };

    return (
        <div>
            <Row gutter={12} className={"mb-4"}>
                <Col>
                    <ButtonDrawer
                        title={"Thêm mới tài nguyên"}
                        formId={"resource-form"}
                        mode={ADD}
                        buttonProps={{
                            value: "Thêm mới",
                        }}
                    >
                        <ResourceForm
                            projectId={projectId}
                            phaseId={phaseId}
                            teamId={teamId}
                        />
                    </ButtonDrawer>
                </Col>
                <Col span={6}>
                    <Input prefix={<FiSearch/>}/>
                </Col>
            </Row>
            <Table dataSource={dataSources} columns={columnsResource}/>
        </div>
    );
}

export default ProjectViewResource;
