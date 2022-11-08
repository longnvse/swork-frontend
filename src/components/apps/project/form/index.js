import { Button, Col, DatePicker, Form, Input, Row } from "antd";
import React from "react";

const ProjectForm = () => {
	const [form] = Form.useForm();

	const onFinish = (values) => {
		console.log(values);
	};

	return (
		<Form
			onFinish={onFinish}
			layout={"vertical"}
			style={{ width: "70%" }}
			form={form}
		>
			<Row gutter={12}>
				<Col span={3}>
					<Form.Item
						name="code"
						label="Mã dự án"
						rules={[
							{
								required: true,
								message: "Chưa nhập mã dự án",
							},
						]}
					>
						<Input placeholder="Mã dự án" />
					</Form.Item>
				</Col>
				<Col span={5}>
					<Form.Item
						name="name"
						label="Tên dự án"
						rules={[
							{
								required: true,
								message: "Chưa nhập tên dự án",
							},
						]}
					>
						<Input placeholder="Tên dự án" />
					</Form.Item>
				</Col>
			</Row>
			<Row gutter={12}>
				<Col span={4}>
					<Form.Item
						name="startDate"
						label="Thời gian bắt đầu"
						rules={[
							{
								required: true,
								message: "Chưa chọn thời gian bắt đầu",
							},
						]}
					>
						<DatePicker className="w-full" />
					</Form.Item>
				</Col>
				<Col span={4}>
					<Form.Item
						name="endDate"
						label="Thời gian kết thúc"
						rules={[
							{
								required: true,
								message: "Chưa chọn thời gian kết thúc",
							},
						]}
					>
						<DatePicker className="w-full" />
					</Form.Item>
				</Col>
			</Row>
			<Row gutter={12}>
				<Col span={8}>
					<Form.Item
						name="assignor"
						label="Người quản trị"
						rules={[
							{
								required: true,
								message: "Chưa chọn người quản trị",
							},
						]}
					>
						<Input placeholder="Chọn người quản trị" />
					</Form.Item>
				</Col>
			</Row>
			<Row gutter={12}>
				<Col span={8}>
					<Form.Item
						name="assignee"
						label="Người thực hiện"
						rules={[
							{
								required: true,
								message: "Chưa chọn người thực hiện",
							},
						]}
					>
						<Input placeholder="Chọn người quản trị" />
					</Form.Item>
				</Col>
			</Row>
			<Row gutter={12}>
				<Col span={8}>
					<Form.Item
						name="follower"
						label="Người theo dõi"
						rules={[
							{
								required: true,
								message: "Chưa chọn người theo dõi",
							},
						]}
					>
						<Input placeholder="Chọn người theo dõi" />
					</Form.Item>
				</Col>
			</Row>
			<Row gutter={12}>
				<Col span={6}>
					<Form.Item
						name="budget"
						label="Ngân sách"
						rules={[
							{
								required: true,
								message: "Chưa nhập ngân sách",
							},
						]}
					>
						<Input placeholder="Nhập ngân sách" />
					</Form.Item>
				</Col>
				<Col span={2}>
					<Form.Item name="unit" label="Đơn vị">
						<Input placeholder="VNĐ" />
					</Form.Item>
				</Col>
			</Row>
			<Row gutter={12}>
				<Col span={8}>
					<Form.Item name="description" label="Mô tả">
						<Input.TextArea placeholder="Nhập mô tả" />
					</Form.Item>
				</Col>
			</Row>
			<Button htmlType="submit">Submit</Button>
		</Form>
	);
};

export default ProjectForm;
