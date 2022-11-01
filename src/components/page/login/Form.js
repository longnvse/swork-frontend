import React from 'react';
import {Button, Checkbox, Form, Input} from "antd";
import banner from "../../../images/banner.jpg";
import {useDispatch} from "react-redux";
import {loginStart} from "../../../redux/actions/login/actions";

function LoginForm(props) {
    const dispatch = useDispatch();

    const onFinish = (values) => {
        console.log(values)
        dispatch(loginStart(values));
    }

    return (
        <div className={"page__login-form w-1/2 m-auto flex items-center justify-center"}>
            <div className={"w-1/2 p-20 bg-white h-full"}>
                <h1 className={"text-center text-3xl font-bold mb-10"}>Sign in</h1>
                <Form
                    onFinish={onFinish}
                    layout={"vertical"}
                >
                    <Form.Item
                        label={"Tên đăng nhập"}
                        name={"username"}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        label={"Mật khẩu"}
                        name={"password"}
                    >
                        <Input.Password/>
                    </Form.Item>
                    <div className="flex items-center justify-between">
                        <Form.Item
                            name={"remember"}
                            valuePropName={"checked"}
                        >
                            <Checkbox>Nhớ mật khẩu</Checkbox>
                        </Form.Item>
                        <Form.Item>
                            Quên mật khẩu
                        </Form.Item>
                    </div>
                    <Button
                        htmlType={"submit"}
                        block
                        className={"h-10 bg-green-500 text-white hover:border-green-600 hover:text-green-600 focus:border-green-600 focus:text-green-600"}
                    >
                        Đăng nhập
                    </Button>
                </Form>
            </div>
            <img src={banner} alt="banner" className={"page__login-form--banner w-1/2 h-full"}/>
        </div>
    );
}

export default LoginForm;