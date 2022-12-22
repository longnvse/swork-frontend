import React from 'react';
import {Avatar, Button, Upload} from "antd";
import {CameraOutlined, UserOutlined} from "@ant-design/icons";
import {message_error, MODULE_ID} from "../../components/common/Constant";
import {getMe} from "../../api/common";
import {uploadAvatar} from "../../api/account/api";
import {useDispatch, useSelector} from "react-redux";
import {changeAvatar} from "../../redux/actions/common/actions";

const AvatarAccount = (props) => {
    const {avatar} = useSelector(state => state.commonReducer);
    const dispatch = useDispatch();
    const onUploadAvatar = (options) => {
        const {file} = options;

        const multipartBody = new FormData();

        multipartBody.set("file", file);

        const metadata = JSON.stringify({moduleId: MODULE_ID.USER, appId: getMe().accountId})

        multipartBody.set("metadata", metadata);

        uploadAvatar(multipartBody).then(res => {
            dispatch(changeAvatar(res.data));
        }).catch(message_error);
    }

    return (
        <div>
            <Avatar
                size={128}
                icon={<UserOutlined/>}
                src={avatar}
            />
            <Upload
                accept={"image/*"}
                fileList={[]}
                customRequest={onUploadAvatar}
                directory={false}
            >
                <Button
                    className="-translate-x-8 translate-y-10 rounded-2xl"
                    icon={<CameraOutlined style={{fontSize: 16}}/>}
                />
            </Upload>
        </div>
    );
};

AvatarAccount.propTypes = {};

export default AvatarAccount;
