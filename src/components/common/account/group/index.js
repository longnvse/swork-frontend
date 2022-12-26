import React, {useEffect, useState} from 'react';
import {getListAccount} from "../../../../api/account/api";
import {message_error} from "../../Constant";
import {Avatar} from "antd";
import AccountGroupItem from "./item";

const AccountGroup = ({accountIds = [], positionTooltip = "top"}) => {
    const [accounts, setAccounts] = useState([]);

    useEffect(() => {
        if (accountIds.length > 0) {
            getListAccount(accountIds).then(res => {
                setAccounts(res.data?.items || []);
            }).catch(message_error)
        }
    }, [JSON.stringify(accountIds)]);


    return (
        <Avatar.Group
            maxCount={3}
            size={36}
        >
            {accounts.map(account => <AccountGroupItem positionTooltip={positionTooltip} {...account}/>)}
        </Avatar.Group>
    );
};

AccountGroup.propTypes = {};

export default AccountGroup;
