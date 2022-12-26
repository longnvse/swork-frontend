import React from 'react';
import {Avatar, Badge, List} from "antd";
import moment from "moment";

function NotificationItem(props) {

    const totalDays = (createDate) => {
        let day = "";
        const currentDate = moment();
        const createMoment = moment.utc(createDate);
        const minute = 60 ;
        const hour = 24 ;
        const month = 30 ;
        const year = 365 ;

        const getDaysDiff = moment.duration(currentDate.diff(createMoment)).asDays();
        const getHourDiff = moment.duration(currentDate.diff(createMoment)).asHours();
        const getMinuteDiff = moment.duration(currentDate.diff(createMoment)).asMinutes();
        const getSecondDiff = moment.duration(currentDate.diff(createMoment)).asSeconds();

        if (getSecondDiff <= minute ){
            day = Math.round(getSecondDiff) + " Giây trước" ;
            return day;
        }else if (getMinuteDiff <= minute ){
            day = Math.round(getMinuteDiff) + " Phút trước";
            return day ;
        }else if (getHourDiff <= hour){
            day = Math.round(getHourDiff) + " Giờ trước" ;
            return day ;
        }else if(getDaysDiff > month && getDaysDiff < year){
            const month = getDaysDiff / 30 ;
            day = Math.round(month) + " Tháng trước ";
            return day ;
        }else if(getDaysDiff >= year){
            const year = getDaysDiff / 365 ;
            day = Math.round(year) + " Năm trước ";
            return day;
        }else {
            day = Math.round(getDaysDiff) + " Ngày trước ";
            return day;
        }
    }

    return (
        <>
            <div style={{marginLeft: "10px"}}>
                {props.item?.status === "noRead" && <Badge dot> </Badge>}
            </div>
            <List.Item.Meta
                avatar={<Avatar src={``}/>}
                // title={(
                //         <>
                //             <span style={{fontWeight: 600}}>{props.item?.senderName}</span> {props.item?.description}
                //         </>
                //     )}
                // description={totalDays(props.item?.createDate)}
                className={"cursor--pointer"}
            />
        </>
    );
}

export default NotificationItem;