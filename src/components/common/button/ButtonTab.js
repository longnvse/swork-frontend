import React from 'react';
import {Button} from "antd";

const ButtonTab = ({icon, title, buttonProps}) => {
    return (
        <Button
            icon={icon}
            className={"flex flex-col items-center justify-center h-fit w-fit border-0" +
                " btn--tab"}
            style={{
                fontSize: 10,
                lineHeight: '16px'
            }}
            {...buttonProps}
        >
            {title || "Button"}
        </Button>
    );
};

export default ButtonTab;
