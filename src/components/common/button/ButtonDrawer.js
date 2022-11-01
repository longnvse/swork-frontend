import React, {useEffect, useMemo, useState} from 'react';
import {Button, Col, Drawer, Row, Switch, Tooltip} from "antd";
import {ADD, UPDATE} from "../Constant";
import {useDispatch, useSelector} from "react-redux";
import {closeDrawer} from "../../../redux/actions/common/actions";

const ButtonDrawer = ({
                          children = React.createElement("div"),
                          title = "",
                          formId = undefined,
                          mode = "",
                          drawerProps = {},
                          buttonProps = {}
                      }) => {
    const [open, setOpen] = useState(false);
    const [toggle, setToggle] = useState(false);
    const [afterSubmit, setAfterSubmit] = useState(false);
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


    useEffect(() => {
        if (mode === UPDATE) {
            dispatch(closeDrawer(true));
        }
    }, [mode]);


    useEffect(() => {
        if (afterSubmit && !toggle && isCloseDrawer) {
            onClose();
        }
    }, [isCloseDrawer]);

    const buttonTitle = useMemo(() => {
        if (mode === ADD) {
            return <span>Thêm mới </span>;
        } else if (mode === UPDATE) {
            return <span>Cập nhật </span>;
        }

        return undefined;
    }, [mode]);

    const onClickSubmit = (e) => {
        setAfterSubmit(true);
    }

    const footer = (
        <Row gutter={12}>
            <Col>
                <Button type={"primary"} onClick={onClickSubmit} form={formId}
                        htmlType={"submit"}>{buttonTitle}</Button>
            </Col>
            <Col>
                <Button type={"default"} onClick={onClose}>Hủy bỏ</Button>
            </Col>
        </Row>
    )

    return (
        <div>
            <Button onClick={onOpen} {...buttonProps}>{buttonProps.value}</Button>
            <Drawer
                open={open}
                title={title || ""}
                placement="right"
                onClose={onClose}
                footer={footer}
                destroyOnClose={true}
                drawerStyle={{
                    borderRadius: 8
                }}
                getContainer={document.getElementById('content')}
                style={{
                    position: 'absolute'
                }}
                contentWrapperStyle={{
                    borderRadius: 8
                }}
                extra={formId && mode === ADD ? <Tooltip
                    title={!toggle ? "Đóng lại sau khi hoàn thành tác vụ" : "Giữ lại sau khi hoàn thành tác vụ"}
                    placement={"left"}
                >
                    <Switch checked={toggle} onChange={(value) => setToggle(value)}/>
                </Tooltip> : null}
                {...drawerProps}
            >
                {React.cloneElement(children)}
            </Drawer>
        </div>
    );
};

ButtonDrawer.propTypes = {};

export default ButtonDrawer;
