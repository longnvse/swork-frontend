import React from 'react';
import {Button} from "antd";

const ButtonTab = props => {
    return (
        <Button
            icon={props.icon}
            className={"flex flex-col items-center justify-center h-fit w-fit border-0" +
                " btn--tab"}
            style={{
                fontSize: 10,
                lineHeight: '16px'
            }}
        >
            {props.title || "Button"}
        </Button>
    );
};

export default ButtonTab;
