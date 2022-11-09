import { Button, Form, Input } from "antd";
import React from "react";
import { VscClose } from "react-icons/vsc";
import classNames from "classnames/bind";

function FormAuthentication(props) {
    const {
        type,
        title,
        fieldsData,
        buttonLabel,
        onSubmit,
        className,
        onClose,
    } = props;
    const InputType = type ? Input : Input.Password;

    return (
        <div
            className={
                "w-full rounded-lg flex flex-col h-fit px-12 py-10 " + className
            }
            style={{ border: "2px solid #57AAE5FF" }}
        >
            {!onClose && (
                <img
                    src={require("../../../images/myLogo.jpg")}
                    alt=""
                    className="w-[30%] mx-auto"
                />
            )}
            {onClose && (
                <div className="text-right">
                    <VscClose
                        size={40}
                        className="cursor-pointer"
                        onClick={onClose}
                    />
                </div>
            )}
            <div
                className={classNames(
                    !onClose && "mt-8",
                    "text-primary text-32/48 text-center font-secondary",
                )}
            >
                {title}
            </div>
            <div className={classNames(!onClose ? "mt-8" : "mt-12")}>
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
                                <InputType
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
                            "h-10 bg-primary text-white hover:border-primary hover:text-primary focus:border-primary focus:text-primary"
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
