import React from 'react'
// import { Rule } from 'antd/lib/form'
// import Form, { Field } from 'rc-field-form'
import Form, { Field } from '../components/my-rc-field-form'
import Input from '../components/Input'

const nameRules = [{
	required: true, message: '请输入姓名'
}]

const passwordRules = [{
	required: true, message: '请输入密码'
}]

// export default function RCFieldForm() {

// 	const [form] = Form.useForm()

// 	console.log(form)

// 	const onFinish = (data: any) => {
// 		console.log('onFinish', data)
// 	}

// 	const onFinishFailed = (err: any, data: any) => {
// 		console.log('onFinishFailed', err, data)
// 	}

// 	return (
// 		<div>
// 			<Form form={form} onFinish={onFinish} onFinishFailed={onFinishFailed}>
// 				<Field name="username" rules={nameRules}>
// 					<Input placeholder='username' />
// 				</Field>
// 				<Field name="password" rules={passwordRules}>
// 					<Input placeholder='password' />
// 				</Field>
// 				<button>submit</button>
// 			</Form>
// 		</div>
// 	)
// }

export default class RCFieldForm extends React.Component {
	formRef = React.createRef()

	componentDidMount() {
		console.log(this.formRef.current)
		this.formRef.current.setFieldsValue({ username: "jerry" })
	}
	onFinish = (data) => {
		console.log('onFinish', data)
	}

	onFinishFailed = (err, data) => {
		console.log('onFinishFailed', err, data)
	}

	render() {
		return (
			<div>
				<Form ref={this.formRef} onFinish={this.onFinish} onFinishFailed={this.onFinishFailed}>
					<Field name="username" rules={nameRules}>
						<Input placeholder='username' />
					</Field>
					<Field name="password" rules={passwordRules}>
						<Input placeholder='password' />
					</Field>
					<button>submit</button>
				</Form>
			</div>
		)
	}

}