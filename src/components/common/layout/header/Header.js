import React, {useRef} from "react";
import {Input, Layout} from "antd";
import ProfileIcon from "./profile";
import {IoMdNotificationsOutline} from "react-icons/io";
import {FiSearch} from "react-icons/fi";
import {useSelector} from "react-redux";
import {debounce} from "lodash";
import {useNavigate, useSearchParams} from "react-router-dom";

const {Header} = Layout;

function CommonHeader(props) {
    const {title} = useSelector(state => state.commonReducer);
    const [searchParams, setSearchParams] = useSearchParams();
    let navigate = useNavigate();

    const onChangeSearch = (e) => {
        const {value} = e.target;
        searchBounce(value);
    }


    const searchBounce = useRef(debounce((nextValue) => {
        if (!nextValue) {
            searchParams.delete("keyword");
        } else {
            searchParams.set("keyword", nextValue);
        }
        navigate(`?${searchParams.toString()}`)
    }, 500)).current;

    return (<Header
        className={"flex flex-row justify-between items-center"}
        style={{
            background: "#57AAE5FF", padding: 0, borderLeft: "1px solid inherit",
        }}
    >
        <div className="flex items-center justify-between w-full">
            <div className={"text__header pl-4"}>{title}</div>
            <div className="mr-2">
                <div className="flex items-center">
                    <Input
                        prefix={<FiSearch/>}
                        className="mr-4 w-[302px]"
                        placeholder="Tìm kiếm"
                        onChange={onChangeSearch}
                        defaultValue={searchParams.get("keyword")}
                    />
                    <div className="app__header--item cursor-pointer flex items-center mr-2">
                        <IoMdNotificationsOutline className="text-white w-6 h-6"/>
                    </div>
                    <ProfileIcon/>
                </div>
            </div>
        </div>
    </Header>);
}

export default CommonHeader;
