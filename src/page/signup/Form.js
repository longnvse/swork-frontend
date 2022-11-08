import { Button, Form, Input } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { loginStart } from "../../redux/actions/login/actions";

function SignUpForm(props) {
    const dispatch = useDispatch();

    const onFinish = (values) => {
        console.log(values);
        dispatch(loginStart(values));
    };

    return (
        <div
            className="ml-[137px] w-[40%] rounded-lg flex flex-col px-12 py-10 "
            style={{ border: "2px solid #57AAE5FF" }}
        >
            <img
                src={require("../../images/myLogo.jpg")}
                alt=""
                className="w-[30%] mx-auto"
            />
            <div className="mt-8 text-[#57AAE5FF] text-32/48 text-center font-secondary">
                Đăng ký sử dụng
            </div>
            <div className="mt-8">
                <Form onFinish={onFinish} layout={"vertical"}>
                    <Form.Item
                        label="Tên công ty"
                        className="text-14/22 font-semibold mb-0"
                    >
                        <Form.Item
                            name="username"
                            className="font-normal"
                            rules={[
                                {
                                    required: true,
                                    message: "Tên công ty là bắt buộc",
                                },
                            ]}
                        >
                            <Input
                                placeholder="Tên công ty"
                                className="border-0 border-b-2 px-0"
                            />
                        </Form.Item>
                    </Form.Item>
                    <Form.Item
                        label="Email"
                        className="text-14/22 font-semibold mb-0"
                    >
                        <Form.Item
                            name="username"
                            className="font-normal"
                            rules={[
                                {
                                    required: true,
                                    message: "Email là bắt buộc",
                                },
                            ]}
                        >
                            <Input
                                placeholder="Email"
                                className="border-0 border-b-2 px-0"
                            />
                        </Form.Item>
                    </Form.Item>
                    <Form.Item
                        label="Số điện thoại"
                        className="text-14/22 font-semibold mb-0"
                    >
                        <Form.Item
                            name="username"
                            className="font-normal"
                            rules={[
                                {
                                    required: true,
                                    message: "Số điện thoại là bắt buộc",
                                },
                            ]}
                        >
                            <Input
                                placeholder="Số điện thoại"
                                className="border-0 border-b-2 px-0"
                            />
                        </Form.Item>
                    </Form.Item>
                    <Form.Item
                        label="Địa chỉ"
                        className="text-14/22 font-semibold mb-0"
                    >
                        <Form.Item
                            name="username"
                            className="font-normal"
                            rules={[
                                {
                                    required: true,
                                    message: "Địa chỉ là bắt buộc",
                                },
                            ]}
                        >
                            <Input
                                placeholder="Địa chỉ"
                                className="border-0 border-b-2 px-0"
                            />
                        </Form.Item>
                    </Form.Item>

                    <Button
                        htmlType={"submit"}
                        block
                        className={
                            "h-10 bg-[#57AAE5FF] text-white hover:border-[#57AAE5FF] hover:text-[#57AAE5FF] focus:border-[#57AAE5FF] focus:text-[#57AAE5FF]"
                        }
                    >
                        Đăng ký
                    </Button>
                </Form>
            </div>
        </div>
    );
}

export default SignUpForm;
