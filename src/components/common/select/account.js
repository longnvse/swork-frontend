import React, {useEffect, useState} from 'react';
import {Select} from "antd";
import {getAccountPages} from "../../../api/account/api";
import {SearchOutlined} from "@ant-design/icons";

const SelectAccount = ({value = [], onChange, placeholder, simple = false, withExt = false}) => {
    const [options, setOptions] = useState([]);
    const [values, setValues] = useState([]);

    useEffect(() => {
        getAccountPages({page: 1, pageSize: 1000}).then(response => {
            setOptions(response.data?.items?.map(mapOption));
        })
    }, []);

    useEffect(() => {
        if (!simple) {
            setValues(value.map(item => item.memberId));
        } else {
            setValues(value);
        }
    }, [JSON.stringify(value)]);

    const mapOption = (item) => ({
        value: item.id, label: item.fullName || item.email, ext: item.externalReferenceCode
    })


    const onChangeSelect = (value, option) => {
        if (withExt) {
            onChange(option.map(item => ({
                memberReferenceCode: item.ext, memberId: item.value
            })))

            return;
        }
        if (!simple) {
            onChange(value.map(item => ({
                memberId: item
            })));
        } else {
            onChange(value);
        }

    }

    return (<Select
            allowClear={true}
            showSearch={true}
            options={options}
            value={values}
            onChange={onChangeSelect}
            mode={"multiple"}
            placeholder={placeholder || "Chọn tài khoản"}
            suffixIcon={<SearchOutlined/>}
        />);
};

export default SelectAccount;
