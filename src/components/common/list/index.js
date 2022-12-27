import React, {useEffect, useState} from 'react';
import {Col, Row, Table} from "antd";
import PropTypes from "prop-types";
import {useSelector} from "react-redux";
import {useSearchParams} from "react-router-dom";
import {message_error} from "../Constant";

function CommonList({
                        mapData,
                        buttonAdd = <></>,
                        load,
                        columns = [],
                        isSelections = false,
                        rowSelection = {},
                        hiddenButton = false,
                        maxHeight = 650
                    }) {
    const [params, setParams] = useState({page: 1, pageSize: 10});
    const [totalCount, setTotalCount] = useState();
    const [data, setData] = useState([]);
    const {reload} = useSelector(state => state.commonReducer);
    const [sort, setSort] = useState({});
    const [searchParams] = useSearchParams();

    useEffect(() => {
        fetchData(params)
    }, [params]);

    useEffect(() => {
        if (reload) {
            fetchData(params)
        }
    }, [reload]);

    useEffect(() => {
        setParams(prevState => ({
            ...prevState, search: searchParams.get("keyword")
        }))
    }, [searchParams.get("keyword")]);

    useEffect(() => {
        setParams(prevState => {
            const newSort = Object.keys(sort).map(item => `${item}:${sort[item]}`)
            return {
                ...prevState,
                sort: newSort.join(",")
            }
        })
    }, [sort])

    const fetchData = (params) => {
        load(params).then(response => {
            setData(response.data?.items?.map((item, index) => ({
                ...mapData(item), index: (params.page - 1) * 10 + index + 1,
            })));
            setTotalCount(response.data?.totalCount);
        }).catch(message_error);
    }

    const changeSort = (sorter) => {
        if (Object.keys(sorter).length === 0) {
            return;
        }
        const {field, order} = sorter;
        setSort(prevState => ({
            ...prevState,
            [field]: order === "ascend" ? "asc" : "desc"
        }))
    }

    const onChangeTable = ({current, pageSize}, filters, {field, order}, extra) => {
        // changeSort(sorter)
        setParams(prevState => ({
            ...prevState,
            page: current,
            sort: field && order && `${field}:${order === "ascend" ? "asc" : "desc"}`
        }))
    }

    return (<div>
        {!hiddenButton && <Row gutter={12} className={"mb-4"}>
            <Col>
                {buttonAdd}
            </Col>
        </Row>}
        <Table
            columns={columns}
            dataSource={data}
            onChange={onChangeTable}
            rowSelection={isSelections && rowSelection}
            onHeaderRow={() => {
                return {
                    style: {
                        fontWeight: 'bold'
                    }
                }
            }}
            scroll={{
                y: maxHeight
            }}
            pagination={{
                defaultCurrent: 1, defaultPageSize: 10, total: totalCount, showTotal: (total) => `${total} kết quả`,
            }}
        />
    </div>);
}

CommonList.propTypes = {
    mapData: PropTypes.func.isRequired,
    columns: PropTypes.arrayOf(PropTypes.object).isRequired,
    load: PropTypes.func.isRequired
};


export default CommonList;