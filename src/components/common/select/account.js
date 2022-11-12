import React, {useEffect, useState} from 'react';
import {Select} from "antd";
import {getAccountPages} from "../../../api/account/api";
import {SearchOutlined} from "@ant-design/icons";

const SelectAccount = ({value, onChange, placeholder}) => {
    const [accounts, setAccounts] = useState([]);

    useEffect(() => {
        getAccountPages({page: 1, pageSize: 1000}).then(response => {
            setAccounts(response.data?.items);
        })
    }, []);


    const mapOption = (item) => ({
        value: item.id,
        label: item.fullName
    })

    return (
        <Select
            allowClear={true}
            showSearch={true}
            options={accounts.map(mapOption)}
            value={value}
            onChange={onChange}
            mode={"multiple"}
            placeholder={placeholder || "Chọn tài khoản"}
            suffixIcon={<SearchOutlined/>}
        />
    );
};

export default SelectAccount;
