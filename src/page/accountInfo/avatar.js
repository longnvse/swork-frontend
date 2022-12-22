import React from 'react';
import {Avatar, Button} from "antd";
import {CameraOutlined, UserOutlined} from "@ant-design/icons";

const AvatarAccount = props => {
    return (
        <div>
            <Avatar
                size={128}
                icon={<UserOutlined/>}
                // src={require("../../../../../images/avatar.png")}
                // src={`${base_url}${portraitThumbnail}`}
            />
            <Button
                className="-translate-x-8 translate-y-10 rounded-2xl"
                icon={<CameraOutlined style={{fontSize: 16}}/>}
            />
        </div>
    );
};

AvatarAccount.propTypes = {};

export default AvatarAccount;
