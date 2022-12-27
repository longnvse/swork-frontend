import React, {useCallback, useEffect, useRef} from "react";
import {Input, Layout} from "antd";
import ProfileIcon from "./profile";
import {IoMdNotificationsOutline} from "react-icons/io";
import {FiSearch} from "react-icons/fi";
import {useSelector} from "react-redux";
import {debounce} from "lodash";
import {useLocation, useNavigate, useSearchParams} from "react-router-dom";

const {Header} = Layout;

function CommonHeader(props) {
    const {title} = useSelector(state => state.commonReducer);
    const [searchParams] = useSearchParams();
    let navigate = useNavigate();
    const {pathname} = useLocation();
    const inputRef = useRef();
    const onChangeSearch = (e) => {
        const {value} = e.target;
        searchBounce(value);
    }

    const searchBounce = useCallback(debounce((nextValue) => {
        if (!nextValue) {
            searchParams.delete("keyword");
        } else {
            searchParams.set("keyword", nextValue);
        }
        navigate(`${pathname}?${searchParams.toString()}`)
    }, 500), [pathname]);

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
                        ref={inputRef}
                        prefix={<FiSearch/>}
                        className="mr-4 w-[302px]"
                        placeholder="Tìm kiếm"
                        onChange={onChangeSearch}
                        defaultValue={searchParams.get("keyword")}
                    />
                    {/*<div className="app__header--item cursor-pointer flex items-center mr-2">*/}
                    {/*    <IoMdNotificationsOutline className="text-white w-6 h-6"/>*/}
                    {/*</div>*/}
                    <ProfileIcon/>
                </div>
            </div>
        </div>
    </Header>);
}

export default CommonHeader;
