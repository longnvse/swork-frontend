import React, {useEffect} from 'react';
import {Form, message} from "antd";
import {updateMemberProject} from "../../../../api/project";
import {message_error} from "../../../common/Constant";
import FormItem from "antd/es/form/FormItem";
import SelectAccount from "../../../common/select/account";

const ProjectMemberForm = ({projectData}) => {
    const [form] = Form.useForm();

    useEffect(() => {
        const {handles, participates} = projectData;

        form.setFieldsValue({handles, participates})
    }, [projectData]);


    const onFinish = (values) => {
        const {id} = projectData;
        updateMemberProject(id, values).then(() => {
            message.success("Cập nhật người tham gia!");
        }).catch(message_error)
    };

    return (<Form
        form={form}
        onFinish={onFinish}
        layout={"vertical"}
        id={"project-member-form"}
        style={{width: "100%"}}
    >
        <FormItem
            name={"handles"}
            label={"Người thực hiện"}
            rules={[{
                required: true, message: "Vui lòng thêm người thực hiện"
            }]}
        >
            <SelectAccount withExt={true}/>
        </FormItem>
        <FormItem
            name={"participates"}
            label={"Người theo dõi"}
            rules={[{
                required: true, message: "Vui lòng thêm người theo dõi"
            }]}
        >
            <SelectAccount withExt={true}/>
        </FormItem>
    </Form>);
};

ProjectMemberForm.propTypes = {};

export default ProjectMemberForm;
