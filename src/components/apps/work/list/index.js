import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
import {Button, message, Popconfirm, Progress, Table} from "antd";
import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {deleteWork, getWorkPages} from "../../../../api/work";
import ButtonDrawer from "../../../common/button/ButtonDrawer";
import {DENIED, UPDATE} from "../../../common/Constant";
import {columnsWork} from "../common/columns";
import WorkForm from "../form";

const WorkList = ({projectId, phaseId}) => {
    const [dataSources, setDataSources] = useState([]);

    useEffect(() => {
        getWorkPages({projectId: projectId, phaseId: phaseId}).then(
            (response) => {
                setDataSources(mapData(response?.data?.items));
            },
        );
    }, [projectId, phaseId]);

    const onConfirmDelete = (id) => {
        deleteWork(id)
            .then((value) => {
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
                name: (
                    <Link to={`/project/view-work/${item?.id}`}>
                        {item?.name}
                    </Link>
                ),
                progress: <Progress percent={item?.progress}/>,
                admin: item?.admin,
                status: item?.status,
                priority: item?.priority,
                intendTime: item?.intendTime,
                deadline: item?.deadline,
                action: (
                    <div className={"flex justify-evenly"}>
                        <ButtonDrawer
                            title={"Cập nhật công việc"}
                            formId={"work-form"}
                            mode={UPDATE}
                            buttonProps={{
                                icon: <EditOutlined/>,
                                type: "link",
                                value: null,
                            }}
                        >
                            <WorkForm workId={item?.id}/>
                        </ButtonDrawer>
                        <Popconfirm
                            disabled={item.status !== DENIED}
                            title={"Chắc chắn chứ!"}
                            onConfirm={() => onConfirmDelete(item.id)}
                        >
                            <Button
                                type={"link"}
                                disabled={item.status !== DENIED}
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
            <Table dataSource={dataSources} columns={columnsWork}/>
        </div>
    );
};

export default WorkList;
