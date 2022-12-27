import React, {useEffect, useRef, useState} from "react";
import {Avatar, Badge, Button, Dropdown, Input, Layout, List, Tabs} from "antd";
import ProfileIcon from "./profile";
import {FiSearch} from "react-icons/fi";
import {useSelector} from "react-redux";
import {debounce} from "lodash";
import {useNavigate, useSearchParams} from "react-router-dom";
import {getNotification, getNotificationCount, updateStatusNotification} from "../../../../api/notification/api";
import {BellOutlined} from "@ant-design/icons";
import VirtualList from "rc-virtual-list";

const {Header} = Layout;

const {TabPane} = Tabs;
function CommonHeader(props) {
    const {title} = useSelector(state => state.commonReducer);
    const [searchParams, setSearchParams] = useSearchParams();
    const [totalCount, setTotalCount] = useState()
    const [data, setData] = useState([]);
    let navigate = useNavigate();
    const [count, setCount] = useState(1);

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

    useEffect(() => {
        getDataNotification()
    }, [])

    function getDataNotification(){
        getNotification().then((res) => {
            setData(res?.data?.items)
            setTotalCount(res?.data?.totalCount)
        })
    }

    useEffect(() => {
        (async function getStatus() {
            await getNotificationCount().then((res) => {
                if (res?.data !== count){
                    getDataNotification()
                }
                setCount(res?.data);
            })
            setTimeout(getStatus, 15000);
        })();
    }, []);

    const button = (
        <div style={{textAlignLast: "center"}}>
            <Button
                type={"text"}
                onClick={() => {
                    navigate("/system/user/notifications");
                }}
            >
                Xem tất cả
            </Button>
        </div>
    );

    function onHandChange(item) {
        if (item?.status === "noRead"){
            updateStatusNotification(item.id,{status : "read"}).then(r => {
                getDataNotification()
            })
        }
        console.log(item)
        switch (item?.category){
            case "PROJECT":
                navigate("/project/view/" + item?.subjectId);
                break;
            case "WORK":
                navigate("/project/view-work/" + item?.subjectId);
                break;
        }
    }

    const onChange = (key) => {

    }

    const ContainerHeight = 400;

    const onScroll = (e) => {
        if (
            e.currentTarget.scrollHeight - e.currentTarget.scrollTop ===
            ContainerHeight
        ) {
            onChange();
        }
    };

    let urlImage = "https://joeschmoe.io/api/v1/random";

    const menu = (
        <>
            <Tabs
                type="card"
                style={{
                    width: "400px",
                    background: 'white',
                    border: "1px solid lightgray",
                    borderRadius: "5px"
                }}
            >

                <TabPane tab={"Tất cả"} key="all" className={"padding__x--15"}>
                    <List>
                        <VirtualList
                            data={data}
                            height={ContainerHeight}
                            itemHeight={47}
                            itemKey="all"
                            onScroll={onScroll}
                        >
                            {(item) => (
                                <List.Item onClick={() => onHandChange(item)} aria-valuemax={2}>
                                    <div style={{marginLeft: "10px"}}>
                                        {item.status === "noRead" && <Badge dot> </Badge>}
                                    </div>
                                    <List.Item.Meta
                                        avatar={<Avatar src={urlImage}/>}
                                        title={item?.description}
                                        description={item?.totalTime}
                                        className={"cursor--pointer"}
                                    />
                                </List.Item>
                            )}
                        </VirtualList>
                    </List>
                    {/*{button}*/}
                </TabPane>

            </Tabs>
        </>
    );


    return (
        <Header
            className={"flex flex-row justify-between items-center"}
            style={{
                background: "#57AAE5FF",
                padding: 0,
                borderLeft: "1px solid inherit",
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
                            <Dropdown
                                overlay={menu}
                                trigger={["click"]}
                                className={"cursor--pointer"}
                                placement="bottomRight"
                            >
                                <Badge count={count}>
                                    <BellOutlined/>
                                </Badge>
                            </Dropdown>
                        </div>
                        <ProfileIcon/>
                    </div>
                </div>
            </div>
        </Header>
    );
}

export default CommonHeader;
