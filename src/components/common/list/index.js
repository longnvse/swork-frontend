import React, {useEffect, useRef, useState} from 'react';
import {Button, Checkbox, Col, Input, Row, Table} from "antd";
import {BsPlusLg} from "react-icons/bs";
import PropTypes from "prop-types";
import {debounce} from "lodash";
import {FiSearch} from "react-icons/fi";

function CommonList({mapData, load, onClickAdd, columns, buttonAdd}) {
    const [params, setParams] = useState({});
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const searchBounce = useRef(debounce((nextValue) => setParams(prevState => ({
        ...prevState,
        search: nextValue
    })), 500)).current;

    useEffect(() => {
        setLoading(true);
        load(params).then(response => {
            setData(response.data?.items?.map(mapData));
            setLoading(false);
        }).catch(err => {
            console.log(err)
        });
    }, [params]);


    const onChangeSearch = (e) => {
        const {value} = e.target;
        searchBounce(value);
    }

    return (
        <div>
            <Row gutter={12} className={"mb-4"}>
                <Col>
                    {buttonAdd}
                    <Button icon={<BsPlusLg/>} onClick={onClickAdd}>Thêm mới</Button>
                </Col>
                <Col span={6}>
                    <Input
                        prefix={<FiSearch/>}
                        style={{height: 36, fontSize: 16}}
                        onChange={onChangeSearch}/>
                </Col>
                <Col><Checkbox/></Col>
            </Row>
            <Table
                columns={columns}
                dataSource={data}
                loading={loading}
                rowSelection={{}}
                pagination={{
                    defaultCurrent: 1,
                    hideOnSinglePage: true,
                    defaultPageSize: 10
                }}
            />
        </div>
    );
}

CommonList.propTypes = {
    mapData: PropTypes.func.isRequired,
    columns: PropTypes.arrayOf(PropTypes.object).isRequired,
    load: PropTypes.func.isRequired
};


export default CommonList;