import React from "react";
import FormAuthentication from "../../components/common/Authentication/Form";
import AuthenticationLayout from "../../components/layout/Authentication";

const signUpFields = [
    {
        label: "Tên công ty",
        name: "companyName",
        placeholder: "Tên công ty",
    },
    {
        label: "Email",
        name: "email",
        rules: [{
            type: "email",
            message: "Email không hợp lệ"
        }],
        placeholder: "Email",
    },
    {
        label: "Số điện thoại",
        name: "phone",
        placeholder: "Số điện thoại",
        rules: [{
            type: 'string',
            pattern: /^[\\+]?[(]?[0-9]{3}[)]?[-\\s\\.]?[0-9]{3}[-\\s\\.]?[0-9]{4}$/im,
            message: 'Số điện thoại không hợp lệ!'
        }]
    },
    {
        label: "Địa chỉ",
        name: "address",
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
