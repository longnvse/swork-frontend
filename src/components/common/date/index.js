import React from 'react';
import {DatePicker} from "antd";
import {DATE_FORMAT} from "../Constant";

const SWDatePicker = props => {
    return (
        <DatePicker format={DATE_FORMAT} {...props}/>
    );
};

export default SWDatePicker;
