import React from 'react';
import {Button, theme} from "antd";


const {useToken} = theme;
const ButtonTab = ({icon, title, selected = false, buttonProps}) => {
    const {token} = useToken()

    return (
        <Button
            icon={icon}
            className={"flex flex-col items-center justify-center h-fit w-fit border-0" +
                " btn--tab" + (selected ? "btn--tab__active" : "")}
            style={{
                fontSize: 10,
                lineHeight: '16px',
                color: selected && token.colorPrimary,
                backgroundColor: selected && hexToRGBA(token.colorPrimary)
            }}
            {...buttonProps}
        >
            {title || "Button"}
        </Button>
    );
};

export const hexToRGBA = (h) => {
    let r = 0, g = 0, b = 0;

    // 3 digits
    if (h.length == 4) {
        r = "0x" + h[1] + h[1];
        g = "0x" + h[2] + h[2];
        b = "0x" + h[3] + h[3];

        // 6 digits
    } else if (h.length == 7) {
        r = "0x" + h[1] + h[2];
        g = "0x" + h[3] + h[4];
        b = "0x" + h[5] + h[6];
    }

    return "rgba(" + +r + "," + +g + "," + +b + ",0.08)";
}

export default ButtonTab;
