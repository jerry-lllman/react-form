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

export default function RCFieldForm() {

	const [form] = Form.useForm()

	console.log(form)

	const onFinish = () => {
		console.log('onFinish')
	}

	const onFinishFailed = ( ) => {
		console.log('onFinishFailed')
	}

	return (
		<div>
			<Form form={form} onFinish={onFinish} onFinishFailed={onFinishFailed}>
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