import { useRef } from "react"
import { HOOK_MARK } from "./FieldContext"
import { Callbacks, FieldEntity, FormInstance, InternalFormInstance, InternalHooks, NamePath, Store, ValidateErrorEntity } from "./interface"

class FormStore {
	private formHooked: boolean = false
	private store: Store = {}

	private fieldEntities: any[] = []
  private callbacks: Callbacks = {};

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

	getFieldValue = (name: NamePath) => {
		return this.store[name]
	}

	// set
	setFieldsValue = (newStore: Partial<Store>) => {
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

	submit = () => {
		console.log('submit')
		let err = this.validate()

		if (err.length === 0) {
			// 校验通过
			const { onFinish } = this.callbacks
			if (onFinish) {
				onFinish(this.getFieldsValue())
			}
		} else {
			// 校验失败
			// onFinishFailed(err, this.getFieldsValue())
			const { onFinishFailed } = this.callbacks
			if (onFinishFailed) {
				onFinishFailed(err as any)
			}
		}
	}

	getForm = (): InternalFormInstance => {
		const { getFieldValue, getFieldsValue, setFieldsValue, submit } = this
		return {
			getFieldValue,
			getFieldsValue,
			setFieldsValue,
			submit,

			getInternalHooks: this.getInternalHooks
		}
	}

  private setCallbacks = (callbacks: Callbacks) => {
    this.callbacks = callbacks;
  };

	getInternalHooks = (key: string): InternalHooks | null => {
		if (key === HOOK_MARK) {
      this.formHooked = true;

      return {
        // dispatch: this.dispatch,
        // initEntityValue: this.initEntityValue,
        registerField: this.registerField,
        // useSubscribe: this.useSubscribe,
        // setInitialValues: this.setInitialValues,
        // destroyForm: this.destroyForm,
        setCallbacks: this.setCallbacks,
        // setValidateMessages: this.setValidateMessages,
        // getFields: this.getFields,
        // setPreserve: this.setPreserve,
        // getInitialValue: this.getInitialValue,
        // registerWatch: this.registerWatch,
      };
    }

    console.warn(false, '`getInternalHooks` is internal usage. Should not call directly.');
    return null;
	}
}

// export type FormType = ReturnType<InstanceType<typeof FormStore>['getForm']>

export default function useForm<Values = any>(form?: FormInstance<Values>) {

	const formRef = useRef<FormInstance<Values>>()

	if (!formRef.current) {
		if (form) {
			formRef.current = form
		} else {
			const formStore = new FormStore()
			// 使用 getForm 拿方法，避免 class 被修改
			formRef.current = formStore.getForm()
		}
	}

	return [formRef.current]
}