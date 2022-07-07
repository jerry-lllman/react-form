import Field from "./Field"
import FieldContext from "./FieldContext"
import useForm, { FormType } from "./useForm"

interface FormProps {
	form: FormType
	onFinish: (data: any) => void
	onFinishFailed: (err: any[], data: any) => void
	children: React.ReactNode
}

export default function Form(props: FormProps) {
	const { form, onFinish, onFinishFailed } = props

	const onSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		form.submit(onFinish, onFinishFailed)
	}

	return (
		<form onSubmit={onSubmit}>
			<FieldContext.Provider value={form}>
				{props.children}
			</FieldContext.Provider>
		</form>
	)
}

Form.Field = Field
Form.useForm = useForm