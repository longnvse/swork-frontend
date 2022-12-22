import {Button, Form, Input, Radio} from "antd";
import React, {useState} from "react";
import {BiCheck, BiEditAlt} from "react-icons/bi";
import {VscClose} from "react-icons/vsc";
import classNames from "classnames/bind";
import AvatarAccount from "./avatar";

const changePasswordFields = [
    {
        label: "Họ và tên",
        name: "fullname",
        rules: [
            {
                required: true,
                message: "Họ và tên là bắt buộc",
            },
        ],
        placeholder: "Họ và tên",
    },
    {
        label: "Email",
        name: "email",
        rules: [
            {
                required: true,
                message: "Email là bắt buộc",
            },
        ],
        placeholder: "Email",
    },
    {
        type: "radio-group",
        label: "Giới tính",
        name: "gender",
        groupData: [
            {
                label: "Nam",
                value: true,
            },
            {
                label: "Nữ",
                value: false,
            },
        ],
    },
    {
        label: "Ngày sinh",
        name: "birthday",
        placeholder: "Ngày sinh",
    },
    {
        label: "Số điện thoại",
        name: "phone",
        placeholder: "Số điện thoại",
    },
    {
        label: "Địa chỉ",
        name: "address",
        placeholder: "Địa chỉ",
    },
    {
        label: "Phòng ban",
        name: "department",
        placeholder: "Phòng ban",
    },
];

const AccountInfo = () => {
    const account = {
        username: "DatNQ30",
    };

    const [fields, setFields] = useState([
        {name: "fullname", value: "King Wisdom"},
        {name: "email", value: "kingwisdom.dev@gmail.com"},
        {name: "gender", value: true},
        {name: "birthday", value: "1/1/2000"},
        {name: "phone", value: "0123456789"},
        {name: "address", value: "Ha Noi - Viet Nam"},
        {name: "department", value: "phong ban a"},
    ]);

    const [isEditing, setIsEditing] = useState(false);

    const toggleEdit = () => {
        setIsEditing(!isEditing);
    };

    const onSubmit = (values) => {
        console.log("values :>> ", values);
        toggleEdit();
    };

    return (
        <div className="px-20 py-11">
            <div className="flex items-center">
                <AvatarAccount/>
                <div className="ml-14 text-primary text-24/36 font-semibold">
                    Xin chào {account.username}
                </div>
            </div>
            <div className="mt-12 px-10 max-w-[781px] mx-auto">
                <Form onFinish={onSubmit} layout={"vertical"} fields={fields}>
                    {changePasswordFields.map((field) => (
                        <Form.Item
                            key={field.name}
                            label={field.label}
                            className="text-14/22 font-semibold mb-0"
                        >
                            {field.type === "radio-group" ? (
                                <Radio.Group
                                    className={classNames(
                                        "font-normal px-10 pb-1 mb-6 w-full",
                                        !isEditing && "pointer-events-none",
                                    )}
                                    defaultValue={field.groupData[0].value}
                                    style={{
                                        borderBottom: "2px solid #cccccc",
                                    }}
                                >
                                    {field.groupData.map((groupItem, index) => (
                                        <Radio
                                            key={groupItem.value}
                                            value={groupItem.value}
                                            className="last:ml-28"
                                        >
                                            {groupItem.label}
                                        </Radio>
                                    ))}
                                </Radio.Group>
                            ) : (
                                <Form.Item
                                    name={field.name}
                                    className="font-normal"
                                    rules={field.rules}
                                >
                                    <Input
                                        placeholder={field.placeholder}
                                        className={classNames(
                                            "border-0 border-b-2 px-0 bg-white",
                                            !isEditing && "pointer-events-none",
                                        )}
                                    />
                                </Form.Item>
                            )}
                        </Form.Item>
                    ))}

                    <div className="mt-8 flex">
                        {!isEditing && (
                            <Button
                                className={
                                    "h-10 flex items-center bg-primary text-white hover:border-primary hover:text-primary focus:border-primary focus:text-primary"
                                }
                                icon={<BiEditAlt size={20} className="mr-2"/>}
                                onClick={toggleEdit}
                            >
                                Chỉnh sửa
                            </Button>
                        )}
                        {isEditing && (
                            <>
                                <Button
                                    htmlType="submit"
                                    className={
                                        "h-10 flex items-center justify-center text-primary border-primary hover:border-white hover:bg-primary hover:text-white focus:border-white focus:bg-primary focus:text-white"
                                    }
                                    icon={
                                        <BiCheck size={20} className="mr-2"/>
                                    }
                                >
                                    Cập nhật
                                </Button>
                                <Button
                                    onClick={toggleEdit}
                                    className={
                                        "ml-5 h-10 flex items-center justify-center w-[120px] text-primary border-0 hover:border hover:border-primary hover:text-primary focus:border-primary focus:text-primary"
                                    }
                                    icon={
                                        <VscClose size={20} className="mr-2"/>
                                    }
                                >
                                    Hủy
                                </Button>
                            </>
                        )}
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default AccountInfo;
