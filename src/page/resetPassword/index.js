import React from "react";
import FormAuthentication from "../../components/common/Authentication/Form";
import AuthenticationLayout from "../../components/layout/Authentication";

const signUpFields = [
    {
        label: "Tên đăng nhập",
        name: "username",
        rules: [
            {
                required: true,
                message: "Tên đăng nhập là bắt buộc",
            },
        ],
        placeholder: "Tên đăng nhập",
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
];

function ResetPasswordPage() {
    const handleSubmit = (values) => {
        console.log(values);
    };

    return (
        <AuthenticationLayout>
            <FormAuthentication
                title="Lấy lại mật khẩu"
                fieldsData={signUpFields}
                buttonLabel="Xác nhận"
                onSubmit={handleSubmit}
            />
        </AuthenticationLayout>
    );
}

export default ResetPasswordPage;
