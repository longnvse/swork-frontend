import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
import {Button, message, Popconfirm, Progress} from "antd";
import React, {useCallback, useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {Link} from "react-router-dom";
import {deletePhase, getPhasePages} from "../../../api/phase";
import {isReload} from "../../../redux/actions/common/actions";
import {URIS} from "../../../utils/constant";
import ButtonDrawer from "../../common/button/ButtonDrawer";
import {ADD, PENDING, UPDATE} from "../../common/Constant";
import CommonList from "../../common/list";
import {renderStatus} from "../../common/status";
import {columns} from "./common/columns";
import PhaseForm from "./form";

const status = ["pending", "doing", "completed", "pause", "cancel"];

const PhaseList = () => {
    const [filter, setFilter] = useState(null);
    const dispatch = useDispatch();

    const onConfirmDelete = (id) => {
        deletePhase(id).then((value) => {
            message.success("Xoá thành công!");
        });
    };

    useEffect(() => {
        if (filter !== null) {
            dispatch(isReload(true));
        }
    }, [filter]);

    const onLoad = useCallback(
        (params) => {
            params.filter = filter;

            return getPhasePages(params);
        },
        [filter],
    );

    const mapData = (item, index) => {
        return {
            key: item.id,
            ...item,
            name: <Link to={`${URIS.VIEW_PHASE}/${item.id}`}>{item.name}</Link>,
            status: renderStatus(item.status),
            progress: <Progress percent={item.progress} size="small" />,
            action: (
                <div className={"flex justify-evenly"}>
                    <ButtonDrawer
                        title={"Cập nhật giai đoạn"}
                        formId={"project-form"}
                        mode={UPDATE}
                        buttonProps={{
                            icon: <EditOutlined />,
                            type: "link",
                            value: null,
                        }}
                    >
                        <PhaseForm id={item.id} />
                    </ButtonDrawer>
                    <Popconfirm
                        disabled={item.status !== PENDING}
                        title={"Chắc chắn chứ!"}
                        onConfirm={() => onConfirmDelete(item.id)}
                    >
                        <Button
                            type={"link"}
                            disabled={item.status !== PENDING}
                            icon={<DeleteOutlined />}
                        />
                    </Popconfirm>
                </div>
            ),
            index: index + 1,
        };
    };

    const buttonAdd = (
        <ButtonDrawer
            title={"Thêm mới giai đoạn"}
            formId={"phase-form"}
            mode={ADD}
            buttonProps={{
                value: "Thêm mới",
            }}
        >
            <PhaseForm />
        </ButtonDrawer>
    );

    return (
        <div>
            <CommonList
                mapData={mapData}
                load={onLoad}
                columns={columns}
                buttonAdd={buttonAdd}
            />
        </div>
    );
};

export default PhaseList;
