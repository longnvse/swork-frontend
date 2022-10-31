import React, {useState} from 'react';
import {Button, Col, Drawer, Row} from "antd";

const ButtonDrawer = (props) => {
    const [open, setOpen] = useState(false);

    const onOpen = () => {
        setOpen(true);
    }

    const onClose = () => {
        setOpen(false);
    }

    const footer = (
        <Row gutter={12}>
            <Col>
                <Button type={"primary"} form={props.form} htmlType={"submit"}>Thêm mới</Button>
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
                title="Basic Drawer"
                placement="right"
                onClose={onClose}
                footer={footer}
                destroyOnClose
            >
                {props.children}
            </Drawer>
        </div>
    );
};

ButtonDrawer.propTypes = {};

export default ButtonDrawer;
