import { useRef } from "react"

class FormStore{
	private store: {
		[name: string]: any
	}
	constructor(store = { }) {
		this.store = store
	}

	// get
	getFieldsValue = () => {
		return { ...this.store }
	}

	getFieldValue = (name: keyof typeof this.store) => {
		return this.store[name]
	}

	// set
	setFieldValue = (newStore: Partial<typeof this.store>) => {
		this.store = {
			...this.store,
			...newStore
		}
		console.log(this.store)
	}

	validate = () => {
		const err: any[] = []

		return err
	}

	submit = (onFinish: any, onFinishFailed: any) => {
		console.log('submit')
		let err = this.validate()

		if (err.length === 0) {
			// 校验通过
			onFinish(this.getFieldsValue())
		} else {
			// 校验失败
			onFinishFailed(err, this.getFieldsValue())
		}
	}

	getForm = () => {
		const { getFieldValue, getFieldsValue, setFieldValue, submit } = this
		return {
			getFieldValue,
			getFieldsValue,
			setFieldValue,
			submit
		}
	}
}

export type FormType = ReturnType<InstanceType<typeof FormStore>['getForm']> 

export default function useForm() {

	const formRef = useRef<FormType>()

	if (!formRef.current) {
		const formStore = new FormStore()
		// 使用 getForm 拿方法，避免 class 被修改
		formRef.current = formStore.getForm()
	}

	return [formRef.current]
}