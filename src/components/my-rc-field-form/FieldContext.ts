import React from 'react'
import { InternalFormInstance } from './interface';
// import { FormType } from './useForm'

export const HOOK_MARK = 'RC_FORM_INTERNAL_HOOKS';

const warningFunc: any = () => {
  console.warn (false, 'Can not find FormContext. Please make sure you wrap Field under Form.');
};


const FieldContext = React.createContext<InternalFormInstance>({
	getFieldValue: warningFunc,
  getFieldsValue: warningFunc,
  // getFieldError: warningFunc,
  // getFieldWarning: warningFunc,
  // getFieldsError: warningFunc,
  // isFieldsTouched: warningFunc,
  // isFieldTouched: warningFunc,
  // isFieldValidating: warningFunc,
  // isFieldsValidating: warningFunc,
  // resetFields: warningFunc,
  // setFields: warningFunc,
  // setFieldValue: warningFunc,
  setFieldsValue: warningFunc,
  // validateFields: warningFunc,
  submit: warningFunc,

  getInternalHooks: () => {
    warningFunc();

    return {
      dispatch: warningFunc,
      initEntityValue: warningFunc,
      registerField: warningFunc,
      useSubscribe: warningFunc,
      setInitialValues: warningFunc,
      destroyForm: warningFunc,
      setCallbacks: warningFunc,
      registerWatch: warningFunc,
      getFields: warningFunc,
      setValidateMessages: warningFunc,
      setPreserve: warningFunc,
      getInitialValue: warningFunc,
    };
  },
})

export default FieldContext