import React, {useEffect, useState} from 'react';
import {message} from "antd";
import {columns} from "./common/columns";
import {deleteBusiness, getBusinessPages} from "../../../api/business/api";
import {Link, useNavigate, useSearchParams} from "react-router-dom";
import CommonList from "../../common/list";

const BusinessList = props => {
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    useEffect(() => {
        // console.log(searchParams.get('status'))
    }, [searchParams]);


    const mapData = (item, index) => {
        return {
            key: item.id,
            ...item,
            action: <div className={"flex justify-evenly"}><Link to={`/business/update/${item.id}`}>Cập nhật</Link><Link
                onClick={() => onDeleteBusiness(item.id)} to={``}>Xóa</Link></div>,
            index: index + 1
        }
    }

    const onDeleteBusiness = (businessId) => {
        deleteBusiness(businessId).then(response => {
            message.success("Xóa thành công!");
            setData(data.filter(value => value.id !== businessId));
        })
    }

    useEffect(() => {
        getBusinessPages().then(response => {
                setData(response?.data?.items?.map(mapData) || [])
            }
        )
    }, []);

    const onClickAdd = () => {
        navigate('/business/add')
    }

    return (
        <div>
            {/*<Row className={"mb-4"}>*/}
            {/*    <Button icon={<BsPlusLg/>} onClick={onClickAdd}>Thêm mới</Button>*/}
            {/*</Row>*/}
            {/*<Table*/}
            {/*    columns={columns}*/}
            {/*    dataSource={data}*/}
            {/*    bordered={true}*/}
            {/*/>*/}
            <CommonList mapData={mapData} load={getBusinessPages} columns={columns}/>
        </div>
    );
};

BusinessList.propTypes = {};

export default BusinessList;
