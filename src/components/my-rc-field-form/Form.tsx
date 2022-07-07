import Field from "./Field"
import FieldContext from "./FieldContext"
import useForm, { FormType } from "./useForm"

interface FormProps {
	form: FormType
	onFinish: ()=> void
	onFinishFailed: () => void
	children: React.ReactNode
}

export default function Form(props: FormProps) {
	const { form } = props
	return (
		<form>
			<FieldContext.Provider value={form}>
				{props.children}
			</FieldContext.Provider>
		</form>
	)
}

Form.Field = Field
Form.useForm = useForm