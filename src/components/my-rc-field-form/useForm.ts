import { useRef } from "react"
import { FieldEntity, Store } from "./interface"

class FormStore{
	private store: Store = {}

	private fieldEntities: any[] = []

	constructor() {
	}

	// 注册与卸载
	private registerField = (entity: any) => {
		this.fieldEntities.push(entity)

		return () => {
			this.fieldEntities = this.fieldEntities.filter(item => item !== entity)
			delete this.store[entity.props.name]
		}
	}

	// get
	getFieldsValue = () => {
		return { ...this.store }
	}

	getFieldValue = (name: keyof Store) => {
		return this.store[name]
	}

	// set
	setFieldValue = (newStore: Partial<Store>) => {
		this.store = {
			...this.store,
			...newStore
		}
		console.log(this.store)
		this.fieldEntities.forEach(entity => {
			Object.keys(newStore).forEach(k => {
				if (k === entity.props.name) {
					entity.onStoreChange()
				}
			})
		})
	}

	validate = () => {
		const err: any[] = []

		this.fieldEntities.forEach(entity => {
			const { name, rules } = entity.props
			
			const value = this.getFieldValue(name)
			let rule = rules[0]

			if (rule && rule.required && (value === undefined || value === '')) {
				err.push({ [name]: rule.message, value })
			}
		})
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
		const {registerField, getFieldValue, getFieldsValue, setFieldValue, submit } = this
		return {
			registerField,
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