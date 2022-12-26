import React from 'react';
import {Button, Card, List, Tabs} from "antd";
import VirtualList from "rc-virtual-list";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";

const {TabPane} = Tabs;
const OverlayNotify = ({data , onOpen}) => {
    let navigate = useNavigate();
    const ContainerHeight = 400;
    const dispatch = useDispatch()

    const handleReadAllNotification = () => {
     
    }

    const onChange = (key) => {
    }

    const button = (
        <>
            <div className={'flex justify-between py-1'}>
                <Button
                    type={"text"}
                    onClick={handleReadAllNotification}
                >
                    Đánh dấu tất cả đã đọc
                </Button>

                <Button
                    type={"text"}
                    onClick={() => {
                        onOpen(false)
                        navigate("workplace/work/system/user/notifications");
                    }}
                >
                    Xem tất cả
                </Button>
            </div>
        </>
    );

    function onHandleChange(item, param2) {
        
    }

    return (
        <>
            <Card className={"shadow__dw_p0 p-1"}>
            <Tabs
                onChange={onChange}
                type="card"
                className={"bg__color--white"}
                style={{width: "400px"}}
            >
                <TabPane tab={"all"} key="all" className={"padding__x--15"}>
                    <List>
                        <VirtualList
                            data={data}
                            height={ContainerHeight}
                            itemHeight={47}
                            itemKey="all"
                        >
                            {(item) => (
                                <List.Item onClick={() => onHandleChange(item, null)} aria-valuemax={2}>
                                    {/*<NotificationItem item={item} />*/}
                                </List.Item>
                            )}
                        </VirtualList>
                    </List>
                    {button}
                </TabPane>
        
            </Tabs>
            </Card>
        </>
    );
};

OverlayNotify.propTypes = {};

export default OverlayNotify;