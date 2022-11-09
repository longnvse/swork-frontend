import React, {useEffect, useRef, useState} from 'react';
import {Col, Input, Row, Table} from "antd";
import PropTypes from "prop-types";
import {debounce} from "lodash";
import {FiSearch} from "react-icons/fi";
import ButtonDrawer from "../button/ButtonDrawer";
import BusinessForm from "../../apps/business/form";
import {ADD} from "../Constant";
import {useSelector} from "react-redux";

function CommonList({mapData, buttonAdd = <></>, load, columns = [], isSelections = false}) {
    const [params, setParams] = useState({});
    const [data, setData] = useState([]);
    const {reload} = useSelector(state => state.commonReducer);

    const searchBounce = useRef(debounce((nextValue) => setParams(prevState => ({
        ...prevState,
        search: nextValue
    })), 500)).current;

    useEffect(() => {
        fetchData(params)
    }, [params]);

    useEffect(() => {
        if (reload) {
            fetchData(params)
        }
    }, [reload]);

    const fetchData = (params) => {
        load(params).then(response => {
            setData(response.data?.items?.map(mapData));
        }).catch(err => {
            console.log(err)
        });
    }


    const onChangeSearch = (e) => {
        const {value} = e.target;
        searchBounce(value);
    }

    return (
        <div>
            <Row gutter={12} className={"mb-4"}>
                <Col>
                    {
                        buttonAdd
                    }

                </Col>
                <Col span={6}>
                    <Input
                        prefix={<FiSearch/>}
                        onChange={onChangeSearch}/>
                </Col>
            </Row>
            <Table
                columns={columns}
                dataSource={data}
                rowSelection={isSelections && {}}
                onHeaderRow={() => {
                    return {
                        style: {
                            fontWeight: 'bold'
                        }
                    }
                }}
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