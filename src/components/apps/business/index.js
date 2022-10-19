import React, {useEffect, useState} from 'react';
import {Button, Row, Table} from "antd";
import {columns} from "./common/columns";
import {getBusinessPages} from "../../../api/business/api";

const BusinessList = props => {

    const [data, setData] = useState([]);


    useEffect(() => {
        getBusinessPages().then(response => {
                setData(response?.data?.items || [])
            }
        )
    }, []);

    const onClickAdd = () => {
        navigator.push('')
    }

    return (
        <div>
            <Row className={"mb-4"}>
                <Button onClick={onClickAdd}>Thêm mới</Button>
            </Row>
            <Table
                columns={columns}
                dataSource={data}
                bordered={true}
            />
        </div>
    );
};

BusinessList.propTypes = {};

export default BusinessList;
