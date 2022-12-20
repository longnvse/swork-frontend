import React, { useEffect, useState } from "react";
import { Col, Row, Table } from "antd";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

function CommonList({
    mapData,
    buttonAdd = <></>,
    load,
    columns = [],
    isSelections = false,
    hiddenButton = false,
}) {
    const [params, setParams] = useState({ page: 1, pageSize: 10 });
    const [totalCount, setTotalCount] = useState();
    const [data, setData] = useState([]);
    const { reload } = useSelector((state) => state.commonReducer);
    const [searchParams] = useSearchParams();

    useEffect(() => {
        fetchData(params);
    }, [params]);

    useEffect(() => {
        if (reload) {
            fetchData(params);
        }
    }, [reload]);

    useEffect(() => {
        setParams((prevState) => ({
            ...prevState,
            search: searchParams.get("keyword"),
        }));
    }, [searchParams.get("keyword")]);

    const fetchData = (params) => {
        load(params)
            .then((response) => {
                setData(
                    response.data?.items?.map((item, index) => ({
                        ...mapData(item),
                        index: (params.page - 1) * 10 + index + 1,
                    })),
                );
                setTotalCount(response.data?.totalCount);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const onChangeTable = ({ current, pageSize }, filters, sorter, extra) => {
        setParams((prevState) => ({
            ...prevState,
            page: current,
            pageSize,
        }));
    };

    return (
        <div>
            {!hiddenButton && (
                <Row gutter={12} className={"mb-4"}>
                    <Col>{buttonAdd}</Col>
                </Row>
            )}
            <Table
                columns={columns}
                dataSource={data}
                onChange={onChangeTable}
                rowSelection={isSelections && {}}
                onHeaderRow={() => {
                    return {
                        style: {
                            fontWeight: "bold",
                        },
                    };
                }}
                scroll={
                    data?.length > 10 && {
                        y: 650,
                    }
                }
                pagination={{
                    defaultCurrent: 1,
                    defaultPageSize: 10,
                    total: totalCount,
                    showTotal: (total) => `${total} kết quả`,
                }}
            />
        </div>
    );
}

CommonList.propTypes = {
    mapData: PropTypes.func.isRequired,
    columns: PropTypes.arrayOf(PropTypes.object).isRequired,
    load: PropTypes.func.isRequired,
};

export default CommonList;
