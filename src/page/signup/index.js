import React from "react";
import FormAuthentication from "../../components/common/Authentication/Form";
import AuthenticationLayout from "../../components/layout/Authentication";

const signUpFields = [
    {
        label: "Tên công ty",
        name: "companyName",
        rules: [
            {
                required: true,
                message: "Tên công ty là bắt buộc",
            },
        ],
        placeholder: "Tên công ty",
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
        label: "Số điện thoại",
        name: "phone",
        rules: [
            {
                required: true,
                message: "Số điện thoại là bắt buộc",
            },
        ],
        placeholder: "Số điện thoại",
    },
    {
        label: "Địa chỉ",
        name: "address",
        rules: [
            {
                required: true,
                message: "Địa chỉ là bắt buộc",
            },
        ],
        placeholder: "Địa chỉ",
    },
];

function SignUpPage() {
    const handleSubmit = (values) => {
        console.log(values);
    };

    return (
        <AuthenticationLayout>
            <FormAuthentication
                title="Đăng ký sử dụng"
                fieldsData={signUpFields}
                buttonLabel="Đăng ký"
                onSubmit={handleSubmit}
                className="ml-[137px]"
            />
        </AuthenticationLayout>
    );
}

export default SignUpPage;
