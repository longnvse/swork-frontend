import React from "react";
import { Avatar, Dropdown, Menu, Space } from "antd";
import { KeyOutlined, LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutStart } from "../../../../../redux/actions/login/actions";
import { VscAccount } from "react-icons/vsc";
import { RiGitRepositoryPrivateLine } from "react-icons/ri";
import { URIS } from "../../../../../utils/constant";

const ProfileIcon = (props) => {
    let navigate = useNavigate();
    const dispatch = useDispatch();

    const handleOnLogout = () => {
        dispatch(logoutStart());
    };

    const menu = (
        <Menu
            className={"menu-dropdown-account"}
            items={[
                {
                    onClick: () => {
                        navigate("/system/user/account");
                    },
                    label: (
                        <>
                            <Space>
                                <Avatar
                                    size={"large"}
                                    icon={<UserOutlined />}
                                    style={{
                                        verticalAlign: "middle",
                                    }}
                                    // src={`${base_url}${portraitThumbnail}`}
                                />
                                {/*{getMe().fullName}*/}
                                {"Nguyễn Văn A"}
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
                    icon: <VscAccount />,
                },
                {
                    onClick: () => {
                        navigate(URIS.ACCOUNT_SERCURITY);
                    },
                    label: "Bảo mật",
                    key: "account-security",
                    icon: <RiGitRepositoryPrivateLine />,
                },
                {
                    label: "Đổi mật khẩu",
                    key: "/change-password",
                    icon: <KeyOutlined />,
                },
                {
                    label: "Đăng xuất",
                    key: "/logout",
                    icon: <LogoutOutlined />,
                    style: {
                        borderTop: "1px solid #ccc",
                    },
                    onClick: handleOnLogout,
                },
            ]}
        />
    );

    return (
        <Dropdown overlay={menu} trigger={["click"]} placement={"bottomRight"}>
            <div
                style={{
                    padding: 10,
                    marginRight: 8,
                }}
                className={"cursor-pointer float-right app__header--item"}
            >
                <Avatar
                    size={"default"}
                    icon={<UserOutlined />}
                    // src={require("../../../../../images/avatar.png")}
                    // src={`${base_url}${portraitThumbnail}`}
                />
            </div>
        </Dropdown>
    );
};

ProfileIcon.propTypes = {};

export default ProfileIcon;
