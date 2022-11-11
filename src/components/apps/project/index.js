import React from "react";
import CommonList from "../../common/list";
import {columns} from "./common/columns";
import {deleteProject, getProjectPages} from "../../../api/project";
import {Button, message, Popconfirm} from "antd";
import {renderStatus} from "../../common/status";
import ButtonDrawer from "../../common/button/ButtonDrawer";
import {PENDING, UPDATE} from "../../common/Constant";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
import ProjectForm from "./form";

function ProjectList(props) {
    const onConfirmDelete = (id) => {
        deleteProject(id).then(value => {
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
                    title={"Cập nhật dự án"}
                    formId={"project-form"}
                    mode={UPDATE}
                    buttonProps={{
                        icon: <EditOutlined/>,
                        type: "link",
                        value: null
                    }}
                >
                    <ProjectForm id={item.id}/>
                </ButtonDrawer>
                <Popconfirm disabled={item.status !== PENDING}
                            title={"Chắc chắn chứ!"}
                            onConfirm={() => onConfirmDelete(item.id)}>
                    <Button type={"link"} disabled={item.status !== PENDING} icon={<DeleteOutlined/>}/>
                </Popconfirm>
            </div>,
            index: index + 1
        };
    };

    return (
        <div>
            <CommonList
                mapData={mapData}
                load={getProjectPages}
                columns={columns}
            />
        </div>
    );
}

export default ProjectList;
