import React, {useState} from "react";
import FormAuthentication from "../../components/common/Authentication/Form";
import AvatarAccount from "../accountInfo/avatar";

const changePasswordFields = [
    {
        type: "password",
        label: "Mật khẩu cũ",
        name: "oldPassword",
        placeholder: "Mật khẩu cũ",
    },
    {
        type: "password",
        label: "Mật khẩu mới",
        name: "newPassword",
        placeholder: "Mật khẩu mới",
    },
    {
        type: "password",
        label: "Xác nhận mật khẩu",
        name: "confirmPassword",
        placeholder: "Xác nhận mật khẩu",
    },
];

const AccountSecurity = () => {
    const account = {
        username: "DatNQ30",
    };

    const [open, setOpen] = useState(false);

    const handleOpenPopup = () => {
        setOpen(true);
    };
    const handleClosePopup = () => {
        setOpen(false);
    };
    const handleSubmit = (values) => {
        console.log("values :>> ", values);
    };

    return (
        <div className="px-20 py-11">
            <div className="flex items-center">
                <AvatarAccount/>
                <div className="ml-14 text-primary text-24/36 font-semibold">
                    Xin chào {account.username}
                </div>
            </div>
            <div className="mt-8 px-10 max-w-[781px] mx-auto">
                <div
                    className="py-4 text-14/22"
                    style={{borderBottom: "1px solid #DEE1E6FF"}}
                >
                    <div className="font-semibold">Account</div>
                    <div className="mt-1">{account.username.toLowerCase()}</div>
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
            {open && (
                <div className="modal">
                    <div className="modal-content flex w-[500px] bg-white rounded-lg">
                        <FormAuthentication
                            title="Thay đổi mật khẩu"
                            fieldsData={changePasswordFields}
                            buttonLabel="Xác nhận"
                            onSubmit={handleSubmit}
                            onClose={handleClosePopup}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default AccountSecurity;
