import {Descriptions} from "antd";
import React from "react";

const SWDescription = ({
    title,
    dataSource = [],
    columns = [],
    bordered,
    span,
    descriptionProps,
}) => {
    return (
        <>
            <h3>{title}</h3>
            <Descriptions
                bordered={bordered || true}
                column={span}
                {...descriptionProps}
            >
                {columns?.map((column, index) => {
                    return (
                        <Descriptions.Item key={index} label={column.title}>
                            {dataSource[0]
                                ? dataSource[0][column.dataIndex]
                                : dataSource[column.dataIndex]}
                        </Descriptions.Item>
                    );
                })}
            </Descriptions>
        </>
    );
};

export default SWDescription;
