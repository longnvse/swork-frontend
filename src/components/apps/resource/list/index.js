import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, message, Popconfirm, Table } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
    deleteResource,
    getResourcePages,
} from "../../../../api/resource/resource";
import ButtonDrawer from "../../../common/button/ButtonDrawer";
import { DATE_FORMAT, INACTIVE, UPDATE } from "../../../common/Constant";
import { columnsResource } from "../common/columns";
import ResourceForm from "../form";

const ResourceList = ({ resourceData, projectId, phaseId, teamId }) => {
    const [dataSources, setDataSources] = useState([]);
    const { reload } = useSelector((state) => state.commonReducer);

    useEffect(() => {
        if (!resourceData) {
            getResourcePages({ projectId: projectId, phaseId: phaseId }).then(
                (response) => {
                    setDataSources(mapData(response?.data?.items));
                },
            );
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
                        err.response?.data?.title ||
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
                team: (
                    <Link to={`/project/view-team/${item?.teamId}`}>
                        {item?.teamName}
                    </Link>
                ),
                parent: item?.parentName,
                date:
                    item?.dateResource &&
                    moment(item.dateResource).format(DATE_FORMAT),
                creator: item?.creator,
                action: (
                    <div className={"flex justify-evenly"}>
                        <ButtonDrawer
                            title={"Cập nhật tài nguyên"}
                            formId={"resource-form"}
                            mode={UPDATE}
                            buttonProps={{
                                icon: <EditOutlined />,
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
                                icon={<DeleteOutlined />}
                            />
                        </Popconfirm>
                    </div>
                ),
            };
        });
    };

    return (
        <div>
            <Table
                dataSource={dataSources}
                columns={columnsResource}
                // onChange={onChangeTable}
            />
        </div>
    );
};

export default ResourceList;
