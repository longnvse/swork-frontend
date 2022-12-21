import React from "react";
import { Button, Checkbox, Form, Input } from "antd";
import logo from "../../images/myLogo.jpg";
import { useDispatch } from "react-redux";
import { loginStart } from "../../redux/actions/login/actions";

function LoginForm(props) {
    const dispatch = useDispatch();

    const onFinish = (values) => {
        console.log(values);
        dispatch(loginStart(values));
    };

    return (
        <div
            className={
                "flex items-center justify-center rounded-lg overflow-hidden"
            }
            style={{ border: "2px solid lightblue" }}
        >
            <div className={"w-full px-20 py-7 bg-white h-full"}>
                <div className="w-full text-center">
                    <img src={logo} alt="logo" />
                </div>

                <h1
                    className={
                        "text-center text-2xl font-bold mb-5 text-blue-500"
                    }
                >
                    Đăng nhập
                </h1>
                <Form onFinish={onFinish} layout={"vertical"}>
                    <Form.Item
                        label={"Tên đăng nhập"}
                        name={"username"}
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng nhập Tên đăng nhập!",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label={"Mật khẩu"}
                        name={"password"}
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng nhập Mật khẩu!",
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <div className="flex items-center justify-between">
                        <Form.Item name={"remember"} valuePropName={"checked"}>
                            <Checkbox>Nhớ mật khẩu</Checkbox>
                        </Form.Item>
                        <Form.Item>
                            <a href="# ">Quên mật khẩu?</a>
                        </Form.Item>
                    </div>
                    <Button
                        htmlType={"submit"}
                        block
                        type="primary"
                        className={"h-10 text-white"}
                    >
                        Đăng nhập
                    </Button>
                </Form>
            </div>
        </div>
    );
}

export default LoginForm;
