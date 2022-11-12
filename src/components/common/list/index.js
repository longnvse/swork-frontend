import React, {useEffect, useRef, useState} from 'react';
import {Col, Input, Row, Table} from "antd";
import PropTypes from "prop-types";
import {debounce} from "lodash";
import {FiSearch} from "react-icons/fi";
import {useSelector} from "react-redux";

function CommonList({mapData, buttonAdd = <></>, load, columns = [], isSelections = false}) {
    const [params, setParams] = useState({page: 1, pageSize: 10});
    const [totalCount, setTotalCount] = useState();
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
            setData(response.data?.items?.map((item, index) => ({
                ...mapData(item),
                index: (params.page - 1) * 10 + index + 1,
            })));
            setTotalCount(response.data?.totalCount);
        }).catch(err => {
            console.log(err)
        });
    }

    const onChangeTable = ({current, pageSize}, filters, sorter, extra) => {
        setParams(prevState => ({
            ...prevState,
            page: current,
            pageSize
        }))
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
                onChange={onChangeTable}
                rowSelection={isSelections && {}}
                onHeaderRow={() => {
                    return {
                        style: {
                            fontWeight: 'bold'
                        }
                    }
                }}
                scroll={data?.length > 10 && {
                    y: 650
                }}
                pagination={{
                    defaultCurrent: 1,
                    // hideOnSinglePage: true,
                    defaultPageSize: 10,
                    total: totalCount,
                    showTotal: (total) => `${total} kết quả`,
                    onShowSizeChange: (current, size) => {
                        console.log(current, size);
                    },
                    position: ["topRight"]
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