import {Button, Form, Input} from "antd";
import React from "react";
import {VscClose} from "react-icons/vsc";
import classNames from "classnames/bind";
import FormItem from "antd/es/form/FormItem";

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
    const InputType = type === "password" ? Input.Password : Input;

    return (
        <div
            className={
                "w-full rounded-lg flex flex-col h-fit px-12 py-10 " + className
            }
            style={{border: "2px solid #57AAE5FF"}}
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
                            className="text-14/22"
                            name={field.name}
                            label={field.label}
                            rules={[{
                                required: true,
                                message: "Vui lòng nhập ${label}"
                            }, ...field.rules || []]}
                        >
                            <InputType
                                placeholder={field.placeholder}
                                className="border-0 border-b-2 px-0 hover:shadow-none focus:shadow-none hover:border-r-0 focus:border-r-0"
                            />
                        </Form.Item>
                    ))}

                    <FormItem>
                        <Button
                            htmlType="submit"
                            block
                            className={
                                "h-10 bg-primary text-white hover:border-primary hover:text-primary focus:border-primary focus:text-primary"
                            }
                        >
                            {buttonLabel}
                        </Button>
                    </FormItem>
                </Form>
            </div>
        </div>
    );
}

export default FormAuthentication;
