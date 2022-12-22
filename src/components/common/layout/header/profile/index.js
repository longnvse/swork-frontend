import React, {useState} from "react";
import {Avatar, Dropdown, Menu, Space} from "antd";
import {KeyOutlined, LogoutOutlined, UserOutlined} from "@ant-design/icons";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logoutStart} from "../../../../../redux/actions/login/actions";
import {VscAccount} from "react-icons/vsc";
import {RiGitRepositoryPrivateLine} from "react-icons/ri";
import {URIS} from "../../../../../utils/constant";
import {getMe} from "../../../../../api/common";
import ModalChangePassword from "../../../../../page/resetPassword/modal";

const ProfileIcon = (props) => {
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const {avatar} = useSelector(state => state.commonReducer);
    const handleOpenChangePassword = () => {
        setOpen(true);
    };

    const handleCloseChangePassword = () => {
        setOpen(false);
    };

    const handleOnLogout = () => {
        dispatch(logoutStart());
    };

    const menuItems = [
        {
            onClick: () => {
                navigate("/account/info");
            },
            label: (
                <>
                    <Space>
                        <Avatar
                            size={"large"}
                            style={{
                                verticalAlign: "middle",
                            }}
                            icon={<UserOutlined/>}
                            src={avatar}
                        />
                        {getMe().fullName}
                    </Space>
                </>
            ),
            key: "/avatar",
        },
        {
            onClick: () => {
                navigate(URIS.ACCOUNT_INFO);
            },
            label: "Thông tin cá nhân",
            key: "account-info",
            icon: <VscAccount/>,
        },
        {
            onClick: () => {
                navigate(URIS.ACCOUNT_SECURITY);
            },
            label: "Bảo mật",
            key: "account-security",
            icon: <RiGitRepositoryPrivateLine/>,
        },
        {
            label: "Đổi mật khẩu",
            key: "/change-password",
            icon: <KeyOutlined/>,
        },
        {
            label: "Đăng xuất",
            key: "/logout",
            icon: <LogoutOutlined/>,
            style: {
                borderTop: "1px solid #ccc",
            },
            onClick: handleOnLogout,
        },
    ];

    const menu = (
        <Menu
            className={"menu-dropdown-account"}
            items={[
                {
                    onClick: () => {
                        navigate(URIS.ACCOUNT_INFO);
                    },
                    label: (
                        <>
                            <Space>
                                <Avatar
                                    size={"large"}
                                    icon={<UserOutlined/>}
                                    style={{
                                        verticalAlign: "middle",
                                    }}
                                    src={avatar}
                                />
                                {getMe().fullName}
                            </Space>
                        </>
                    ),
                    key: "/avatar",
                },
                {
                    onClick: () => {
                        navigate(URIS.ACCOUNT_INFO);
                    },
                    label: "Thông tin cá nhân",
                    key: "account-info",
                    icon: <VscAccount/>,
                },
                {
                    onClick: () => {
                        navigate(URIS.ACCOUNT_SECURITY);
                    },
                    label: "Bảo mật",
                    key: "account-security",
                    icon: <RiGitRepositoryPrivateLine/>,
                },
                {
                    label: "Đổi mật khẩu",
                    key: "/change-password",
                    icon: <KeyOutlined/>,
                    onClick: handleOpenChangePassword,
                },
                {
                    label: "Đăng xuất",
                    key: "/logout",
                    icon: <LogoutOutlined/>,
                    style: {
                        borderTop: "1px solid #ccc",
                    },
                    onClick: handleOnLogout,
                },
            ]}
        />
    );

    return (
        <>
            <Dropdown
                overlay={menu}
                trigger={["click"]}
                placement={"bottomRight"}
            >
                <div className={"cursor-pointer float-right app__header--item"}>
                    <Avatar
                        size={"default"}
                        icon={<UserOutlined/>}
                        src={avatar}
                    />
                </div>
            </Dropdown>
            <ModalChangePassword
                open={open}
                setOpen={setOpen}
                onCancel={handleCloseChangePassword}
            />
        </>
    );
};

ProfileIcon.propTypes = {};

export default ProfileIcon;
