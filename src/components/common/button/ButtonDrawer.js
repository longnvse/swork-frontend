import React, {useState} from 'react';
import {Button, Col, Drawer, Form, Row, Switch, Tooltip} from "antd";

const ButtonDrawer = ({
                          children = React.createElement("div"),
                          title = "",
                          formId = undefined,
                          drawerProps = {}
                      }) => {
    const [open, setOpen] = useState(false);
    const [form] = Form.useForm();
    const [toggle, setToggle] = useState(false);

    const onOpen = () => {
        setOpen(true);
    }

    const onClose = () => {
        setOpen(false);
    }

    const onClickSubmit = () => {
        form.validateFields().then(() => {
            form.submit();
            if (!toggle) {
                onClose();
            }
        }).catch(() => {

        });
    }

    const footer = (
        <Row gutter={12}>
            <Col>
                <Button type={"primary"} onClick={onClickSubmit}>Thêm mới</Button>
            </Col>
            <Col>
                <Button type={"default"} onClick={onClose}>Hủy bỏ</Button>
            </Col>
        </Row>
    )

    return (
        <div>
            <Button type={"default"} onClick={onOpen}>Thêm mới</Button>
            <Drawer
                open={open}
                title={title || ""}
                placement="right"
                onClose={onClose}
                footer={footer}
                destroyOnClose
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
                extra={formId ? <Tooltip
                    title={!toggle ? "Đóng lại sau khi hoàn thành tác vụ" : "Giữ lại sau khi hoàn thành tác vụ"}
                    placement={"left"}
                >
                    <Switch checked={toggle} onChange={(value) => setToggle(value)}/>
                </Tooltip> : null}
                {...drawerProps}
            >
                {React.cloneElement(children, formId ? {form} : undefined)}
            </Drawer>
        </div>
    );
};

ButtonDrawer.propTypes = {};

export default ButtonDrawer;
