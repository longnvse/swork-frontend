import React, {useEffect, useState} from 'react';
import {TreeSelect} from "antd";
import {getResourceTypePages} from "../../../../api/resource/resource-type";

const ResourceTypeTree = props => {
    const [resourceOptions, setResourceOptions] = useState([]);

    useEffect(() => {
        getResourceTypePages().then(res => {
            setResourceOptions(mapResourceTypeToTree(res.data?.items));
        })
    }, []);

    const mapResourceTypeToTree = (data, parentName) => {
        return data?.map(item => {
            const searchValue = `${parentName || ""} ${item.name}`
            const children = item.resourceTypes
            return {
                key: item.id,
                value: item.id,
                title: item.name,
                searchValue,
                disabled: props.disabledParent && children.length,
                children: mapResourceTypeToTree(children, searchValue)
            }
        })
    }

    return (
        <TreeSelect
            placeholder={'Chọn loại tài nguyên'}
            {...props}
            treeData={resourceOptions}
            treeLine={{showLeafIcon: false}}
            treeDefaultExpandAll={false}
            showSearch
            filterTreeNode={(search, item) => {
                return item.searchValue.toLowerCase().indexOf(search.trim().replaceAll(/\s+/g, " ").toLowerCase()) >= 0;
            }}
        />
    );
};

ResourceTypeTree.propTypes = {};

export default ResourceTypeTree;
