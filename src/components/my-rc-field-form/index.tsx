import React from "react";

import FieldForm, { FormProps } from "./Form";
import Field from "./Field";
import useForm from "./useForm";
import { FormInstance} from './interface'

const InternalForm = React.forwardRef<FormInstance, FormProps>(FieldForm) as <Values = any>(
  props: FormProps<Values> & { ref?: React.Ref<FormInstance<Values>> },
) => React.ReactElement;

type InternalFormType = typeof InternalForm;
interface RefFormType extends InternalFormType {
  Field: typeof Field;
  useForm: typeof useForm;
}

const RefForm: RefFormType = InternalForm as RefFormType;

RefForm.Field = Field
RefForm.useForm = useForm

export {
	Field,
	useForm
}

export default RefForm