import React, {useEffect, useMemo, useState} from 'react';
import {Button, Modal} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {closeDrawer} from "../../../redux/actions/common/actions";
import {ADD, UPDATE} from "../Constant";

const ButtonDrawer = ({
                          children = React.createElement("div"),
                          title = "",
                          formId = undefined,
                          mode = "",
                          modalProps = {},
                          buttonProps = {}
                      }) => {
    const [open, setOpen] = useState(false);
    const {isCloseDrawer} = useSelector(state => state.commonReducer);
    const dispatch = useDispatch();

    const onOpen = () => {
        setOpen(true);
    }

    const onClose = () => {
        setOpen(false);
    }

    useEffect(() => {
        return () => {
            dispatch(closeDrawer(false));
        };
    }, []);

    const buttonTitle = useMemo(() => {
        if (mode === ADD) {
            return <span>Thêm mới </span>;
        } else if (mode === UPDATE) {
            return <span>Cập nhật </span>;
        }

        return <></>;
    }, [mode]);

    useEffect(() => {
        if (isCloseDrawer) {
            onClose();
        }
    }, [isCloseDrawer]);


    return (
        <div>
            <Button onClick={onOpen} {...buttonProps}>{buttonProps.value}</Button>
            <Modal
                open={open}
                title={title || ""}
                onCancel={onClose}
                okButtonProps={{htmlType: "submit", form: formId, type: "primary"}}
                okText={buttonTitle}
                destroyOnClose={true}
                {...modalProps}
            >
                {React.cloneElement(children)}
            </Modal>
        </div>
    );
};

ButtonDrawer.propTypes = {};

export default ButtonDrawer;
