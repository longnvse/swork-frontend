import React from 'react';
import {Avatar, Dropdown, Menu, Space} from "antd";
import {KeyOutlined, LogoutOutlined, UserOutlined} from "@ant-design/icons";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {logoutStart} from "../../../../../redux/actions/login/actions";
import {getMe} from "../../../../../api/common";

const ProfileIcon = props => {
    let navigate = useNavigate();
    const dispatch = useDispatch()

    const handleOnLogout = () => {
        dispatch(logoutStart())
    }

    const menu = (
        <Menu
            className={"menu-dropdown-account"}
            items={[
                {
                    onClick: () => {
                        navigate("/system/user/account")
                    },
                    label: (
                        <>
                            <Space>
                                <Avatar
                                    size={"large"}
                                    icon={<UserOutlined/>}
                                    style={{
                                        verticalAlign: 'middle'
                                    }}
                                    // src={`${base_url}${portraitThumbnail}`}
                                />
                                {getMe().fullName}
                            </Space>
                        </>
                    ),
                    key: '/avatar',
                },
                {
                    label: "Đổi mật khẩu",
                    key: '/change-password',
                    icon: <KeyOutlined/>

                },
                {
                    label: "Đăng xuất",
                    key: '/logout',
                    icon: <LogoutOutlined/>,
                    style: {
                        borderTop: "1px solid #ccc"
                    },
                    onClick: handleOnLogout
                },
            ]}
        />
    );


    return (

        <Dropdown
            overlay={menu}
            trigger={["click"]}
            placement={"bottomRight"}
        >
            <div style={{
                padding: 10,
                marginRight: 8
            }} className={"cursor-pointer float-right app__header--item"}>
                <Avatar
                    size={"default"}
                    icon={<UserOutlined/>}
                    // src={`${base_url}${portraitThumbnail}`}
                />
            </div>

        </Dropdown>
    );
};

ProfileIcon.propTypes = {};

export default ProfileIcon;
