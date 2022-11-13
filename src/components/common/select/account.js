import React, {useEffect, useState} from 'react';
import {Select} from "antd";
import {getAccountPages} from "../../../api/account/api";
import {SearchOutlined} from "@ant-design/icons";

const SelectAccount = ({value = [], onChange, placeholder, withExt = false}) => {
    const [accounts, setAccounts] = useState([]);
    const [options, setOptions] = useState([]);
    const [values, setValues] = useState([]);

    useEffect(() => {
        getAccountPages({page: 1, pageSize: 1000}).then(response => {
            setAccounts(response.data?.items);
        })
    }, []);

    useEffect(() => {
        setOptions(accounts.map(mapOption));
    }, [accounts])

    useEffect(() => {
        setValues(value.map(item => item.memberId));
    }, [value]);


    const mapOption = (item) => ({
        value: item.id,
        label: item.fullName,
        ext: item.externalReferenceCode
    })


    const onChangeSelect = (value, option) => {
        if (withExt) {
            onChange(option.map(item => ({
                memberReferenceCode: item.ext,
                memberId: item.value
            })))

            return;
        }
        onChange(value.map(item => ({
            memberId: item
        })));
    }

    return (
        <Select
            allowClear={true}
            showSearch={true}
            options={options}
            value={values}
            onChange={onChangeSelect}
            mode={"multiple"}
            placeholder={placeholder || "Chọn tài khoản"}
            suffixIcon={<SearchOutlined/>}
        />
    );
};

export default SelectAccount;
