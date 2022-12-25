import {Button, DatePicker, Form, Input, message, Radio} from "antd";
import React, {useEffect, useState} from "react";
import {BiCheck, BiEditAlt} from "react-icons/bi";
import {VscClose} from "react-icons/vsc";
import classNames from "classnames/bind";
import {getAccountInfo, updateAccountInfo} from "../../api/account/api";
import dayjs from "dayjs";
import {message_error} from "../../components/common/Constant";
import AvatarAccount from "./avatar";
import {useSelector} from "react-redux";

const AccountInfo = () => {
    const [form] = Form.useForm();
    const [isEditing, setIsEditing] = useState(false);
    const [fullName, setFullName] = useState();
    const {reload} = useSelector(state => state.commonReducer);
    useEffect(() => {
        getAccountInfo().then((response) => {
            setFullName(response.data?.fullName);
            form.setFieldsValue({
                ...response.data,
                dateOfBirth: dayjs(response.data?.dateOfBirth),
            });
        });
    }, []);

    useEffect(() => {
        if (reload) {

            getAccountInfo().then((response) => {
                setFullName(response.data?.fullName);
                form.setFieldsValue({
                    ...response.data,
                    dateOfBirth: dayjs(response.data?.dateOfBirth),
                });
            });
        }

    }, [reload]);

    const toggleEdit = () => {
        setIsEditing(!isEditing);
    };

    const onFinish = (values) => {
        updateAccountInfo(values)
            .then((res) => {
                toggleEdit();
                message.success("Cập nhật thông tin thành công!");
            })
            .catch(message_error);
    };

    return (
        <div className="px-20 py-11">
            <div className="flex items-center">
                <AvatarAccount/>
                <div className="ml-14 text-primary text-24/36 font-semibold">
                    Xin chào {fullName}
                </div>
            </div>
            <div className="mt-12 max-w-[781px]">
                <Form form={form} onFinish={onFinish} layout={"vertical"}>
                    <Form.Item
                        name={"fullName"}
                        label={"Họ và tên"}
                        className="text-14/22 font-semibold"
                    >
                        <Input
                            placeholder={"Họ và tên"}
                            className={classNames(
                                "border-0 border-b-2 px-2 bg-white",
                                !isEditing && "pointer-events-none",
                            )}
                        />
                    </Form.Item>

                    <Form.Item
                        name={"email"}
                        label={"Email"}
                        className="text-14/22 font-semibold"
                    >
                        <Input
                            placeholder={"Email"}
                            className={classNames(
                                "border-0 border-b-2 px-2 bg-white",
                                !isEditing && "pointer-events-none",
                            )}
                            type={"email"}
                            disabled={true}
                        />
                    </Form.Item>

                    <Form.Item
                        name={"gender"}
                        className="font-normal"
                        label={"Giới tính"}
                    >
                        <Radio.Group
                            className={classNames(
                                "font-normal pb-1 w-full",
                                !isEditing && "pointer-events-none",
                            )}
                        >
                            <Radio key={"1"} value={true}>
                                Nam
                            </Radio>
                            <Radio key={"2"} value={false}>
                                Nữ
                            </Radio>
                        </Radio.Group>
                    </Form.Item>

                    <Form.Item
                        name={"dateOfBirth"}
                        label={"Ngày sinh"}
                        className="text-14/22 font-semibold"
                    >
                        <DatePicker
                            placeholder={"Ngày sinh"}
                            className={classNames(
                                "w-full border-0 border-b-2 px-2 bg-white",
                                !isEditing && "pointer-events-none",
                            )}
                            format={"DD-MM-YYYY"}
                        />
                    </Form.Item>

                    <Form.Item
                        name={"phoneNumber"}
                        label={"Số điện thoại"}
                        className="text-14/22 font-semibold"
                        rules={[
                            {
                                type: "string",
                                pattern:
                                    /^[\\+]?[(]?[0-9]{3}[)]?[-\\s\\.]?[0-9]{3}[-\\s\\.]?[0-9]{4}$/im,
                                message: "Sai định dạng số điện thoại!",
                            },
                        ]}
                    >
                        <Input
                            placeholder={"(+84) 987 654 321"}
                            className={classNames(
                                "w-full border-0 border-b-2 px-2 bg-white",
                                !isEditing && "pointer-events-none",
                            )}
                        />
                    </Form.Item>

                    <Form.Item
                        name={"address"}
                        label={"Địa chỉ"}
                        className="text-14/22 font-semibold"
                    >
                        <Input
                            placeholder={"Địa chỉ"}
                            className={classNames(
                                "border-0 border-b-2 px-2 bg-white",
                                !isEditing && "pointer-events-none",
                            )}
                        />
                    </Form.Item>

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
