import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import React, { useState } from "react";
import { getMe } from "../../api/common";
import ModalChangePassword from "../resetPassword/modal";

const AccountSecurity = () => {
    const [open, setOpen] = useState(false);

    const handleOpenPopup = () => {
        setOpen(true);
    };

    const handleClosePopup = () => {
        setOpen(false);
    };

    return (
        <div className="px-20 py-11">
            <div className="flex items-center">
                <div>
                    <Avatar size={64} icon={<UserOutlined />} />
                    <img
                        src={require("../../images/icon-edit.png")}
                        alt=""
                        className="-translate-x-6 translate-y-4 cursor-pointer"
                    />
                </div>
                <div className="ml-14 text-primary text-24/36 font-semibold">
                    Xin chào {getMe()?.fullName}
                </div>
            </div>
            <div className="mt-8 max-w-[781px]">
                <div
                    className="py-4 text-14/22"
                    style={{ borderBottom: "1px solid #DEE1E6FF" }}
                >
                    <div className="font-semibold">Account</div>
                    <div className="mt-1">
                        {getMe()?.username?.toLowerCase()}
                    </div>
                </div>
                <div className="py-4 text-14/22 flex justify-between items-center">
                    <div>
                        <div className="font-semibold">Mật khẩu</div>
                        <div className="mt-1">********</div>
                    </div>
                    <div
                        className="underline cursor-pointer"
                        onClick={handleOpenPopup}
                    >
                        Thay đổi mật khẩu
                    </div>
                </div>
            </div>

            <ModalChangePassword
                open={open}
                setOpen={setOpen}
                onCancel={handleClosePopup}
            />
        </div>
    );
};

export default AccountSecurity;
