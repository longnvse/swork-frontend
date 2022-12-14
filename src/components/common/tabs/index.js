import React, {useEffect} from 'react';
import {Tabs} from "antd";
import {useSearchParams} from "react-router-dom";
import PropTypes from "prop-types";

const SWTabs = (props) => {
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        if (props.onChange && searchParams.get("tab")) {
            props.onChange(searchParams.get("tab"));
        }
    }, [props.onChange, searchParams.get("tab")]);

    useEffect(() => {
        if (props.items?.[0]?.key && (!searchParams.get("tab") || props.items.findIndex(item => item.key === searchParams.get("tab")) === -1)) {
            searchParams.set("tab", props.items?.[0]?.key);
            setSearchParams(searchParams);
        }

        if (props.items?.length === 0) {
            searchParams.delete("tab");
            setSearchParams(searchParams);
        }

    }, [props.items, searchParams.get("tab")])

    const onChangeTab = (activeKey) => {
        searchParams.set("tab", activeKey);
        setSearchParams(searchParams);
    }

    return (<Tabs
        destroyInactiveTabPane={true}
        {...props}
        onChange={onChangeTab}
        activeKey={searchParams.get("tab") || props.items?.[0]?.key}
        tabBarStyle={{
            height: 48
        }}
    />);
};

SWTabs.propTypes = {
    items: PropTypes.array.isRequired
};


export default SWTabs;
