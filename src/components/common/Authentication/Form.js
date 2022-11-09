import { Button, Form, Input } from "antd";
import React from "react";

function FormAuthentication(props) {
    const { title, fieldsData, buttonLabel, onSubmit } = props;

    return (
        <div
            className="ml-[137px] w-full rounded-lg flex flex-col h-fit px-12 py-10 "
            style={{ border: "2px solid #57AAE5FF" }}
        >
            <img
                src={require("../../../images/myLogo.jpg")}
                alt=""
                className="w-[30%] mx-auto"
            />
            <div className="mt-8 text-[#57AAE5FF] text-32/48 text-center font-secondary">
                {title}
            </div>
            <div className="mt-8">
                <Form onFinish={onSubmit} layout={"vertical"}>
                    {fieldsData.map((field) => (
                        <Form.Item
                            key={field.name}
                            label={field.label}
                            className="text-14/22 font-semibold mb-0"
                        >
                            <Form.Item
                                name={field.name}
                                className="font-normal"
                                rules={field.rules}
                            >
                                <Input
                                    placeholder={field.placeholder}
                                    className="border-0 border-b-2 px-0"
                                />
                            </Form.Item>
                        </Form.Item>
                    ))}

                    <Button
                        htmlType="submit"
                        block
                        className={
                            "h-10 bg-[#57AAE5FF] text-white hover:border-[#57AAE5FF] hover:text-[#57AAE5FF] focus:border-[#57AAE5FF] focus:text-[#57AAE5FF]"
                        }
                    >
                        {buttonLabel}
                    </Button>
                </Form>
            </div>
        </div>
    );
}

export default FormAuthentication;
