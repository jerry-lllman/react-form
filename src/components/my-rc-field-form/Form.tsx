import React from "react";
import FieldContext, { HOOK_MARK } from "./FieldContext"
import { Callbacks, FieldData, FormInstance, InternalFormInstance, InternalHooks, Store } from "./interface";
import useForm from "./useForm"

type BaseFormProps = Omit<React.FormHTMLAttributes<HTMLFormElement>, 'onSubmit' | 'children'>;

type RenderProps = (values: Store, form: FormInstance) => JSX.Element | React.ReactNode;

export interface FormProps<Values = any> extends BaseFormProps {
	initialValues?: Store;
	form?: FormInstance<Values>;
	children?: RenderProps | React.ReactNode;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	component?: false | string | React.FC<any> | React.ComponentClass<any>;
	fields?: FieldData[];
	name?: string;
	// validateMessages?: ValidateMessages;
	// onValuesChange?: Callbacks<Values>['onValuesChange'];
	// onFieldsChange?: Callbacks<Values>['onFieldsChange'];
	onFinish?: Callbacks<Values>['onFinish'];
	onFinishFailed?: Callbacks<Values>['onFinishFailed'];
	validateTrigger?: string | string[] | false;
	preserve?: boolean;
}


const  Form: React.ForwardRefRenderFunction<FormInstance, FormProps> =(props: FormProps, ref) => {
	const { children, form, onFinish, onFinishFailed } = props

	// 函数组件存在传过来的 form 
	// class 没有，适配一下，这里 使用 useForm
	const [formInstance] = useForm(form)
	const {
		setCallbacks,
		
	} = (formInstance as InternalFormInstance).getInternalHooks(HOOK_MARK) as InternalHooks

	setCallbacks({
		onFinish: (values: Store) => {
			if (onFinish) {
				onFinish(values);
			}
		},
		onFinishFailed,
	});

	const onSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		formInstance.submit()
	}

	const formContextValue = React.useMemo(
		() => ({
			...(formInstance as InternalFormInstance),
		}),
		[formInstance],
	);

	// Prepare children by `children` type
	let childrenNode: React.ReactNode;
	const childrenRenderProps = typeof children === 'function';
	if (childrenRenderProps) {
		const values = formInstance.getFieldsValue(true);
		childrenNode = (children as RenderProps)(values, formInstance);
	} else {
		childrenNode = children;
	}

	return (
		<form onSubmit={onSubmit}>
			<FieldContext.Provider value={formContextValue}>
				{childrenNode}
			</FieldContext.Provider>
		</form>
	)
}

export default Form