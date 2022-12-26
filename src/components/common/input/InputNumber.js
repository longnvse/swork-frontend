import { InputNumber } from "antd";
import React from "react";

const InputNumberCustom = (props) => {
    return (
        <InputNumber
            formatter={(value) =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
            onChange={props.onChange}
            {...props}
        />
    );
};

export default InputNumberCustom;
