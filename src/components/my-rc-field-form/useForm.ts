import { useRef } from "react"

class FormStore{
	private store: {
		[name: string]: any
	}
	constructor(store = { name: "" }) {
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
	}

	getForm = () => {
		const { getFieldValue, getFieldsValue, setFieldValue } = this
		return {
			getFieldValue,
			getFieldsValue,
			setFieldValue
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