import { ReactElement } from "react";


export type InternalNamePath = (string | number)[];
export type NamePath = string

export type StoreValue = any
export type Store = Record<string, StoreValue>

export interface Meta {
  touched: boolean;
  validating: boolean;
  errors: string[];
  warnings: string[];
  name: NamePath;
}

export interface InternalFieldData extends Meta {
  value: StoreValue;
}

/**
 * Used by `setFields` config
 */
export interface FieldData extends Partial<Omit<InternalFieldData, 'name'>> {
  name: NamePath;
}


export type RuleType =
  | 'string'
  | 'number'
  | 'boolean'
  | 'method'
  | 'regexp'
  | 'integer'
  | 'float'
  | 'object'
  | 'enum'
  | 'date'
  | 'url'
  | 'hex'
  | 'email';

type Validator = (
  rule: RuleObject,
  value: StoreValue,
  callback: (error?: string) => void,
) => Promise<void | any> | void;

export type RuleRender = (form: FormInstance) => RuleObject;

export interface ValidatorRule {
  warningOnly?: boolean;
  message?: string | ReactElement;
  validator: Validator;
}

interface BaseRule {
  warningOnly?: boolean;
  enum?: StoreValue[];
  len?: number;
  max?: number;
  message?: string | ReactElement;
  min?: number;
  pattern?: RegExp;
  required?: boolean;
  transform?: (value: StoreValue) => StoreValue;
  type?: RuleType;
  whitespace?: boolean;

  /** Customize rule level `validateTrigger`. Must be subset of Field `validateTrigger` */
  validateTrigger?: string | string[];
}

type AggregationRule = BaseRule & Partial<ValidatorRule>;

interface ArrayRule extends Omit<AggregationRule, 'type'> {
  type: 'array';
  defaultField?: RuleObject;
}

export type RuleObject = AggregationRule | ArrayRule;

export type Rule = RuleObject | RuleRender;

export interface ValidateErrorEntity<Values = any> {
  values: Values;
  errorFields: { name: NamePath; errors: string[] }[];
  outOfDate: boolean;
}

export interface InternalHooks {
  // dispatch: (action: ReducerAction) => void;
  // initEntityValue: (entity: FieldEntity) => void;
  registerField: (entity: FieldEntity) => () => void;
  // useSubscribe: (subscribable: boolean) => void;
  // setInitialValues: (values: Store, init: boolean) => void;
  // destroyForm: () => void;
  setCallbacks: (callbacks: Callbacks) => void;
  // registerWatch: (callback: WatchCallBack) => () => void;
  // getFields: (namePathList?: InternalNamePath[]) => FieldData[];
  // setValidateMessages: (validateMessages: ValidateMessages) => void;
  // setPreserve: (preserve?: boolean) => void;
  // getInitialValue: (namePath: InternalNamePath) => StoreValue;
}


type RecursivePartial<T> = T extends object
  ? {
    [P in keyof T]?: T[P] extends (infer U)[]
    ? RecursivePartial<U>[]
    : T[P] extends object
    ? RecursivePartial<T[P]>
    : T[P];
  }
  : any;

export type ValidateFields<Values = any> = (nameList?: NamePath[]) => Promise<Values>;


export interface FieldEntity {
  props: {
    name?: NamePath;
    rules?: Rule[];
    dependencies?: NamePath[];
    initialValue?: any;
  };
}

export interface Callbacks<Values = any> {
  onValuesChange?: (changedValues: any, values: Values) => void;
  onFieldsChange?: (changedFields: FieldData[], allFields: FieldData[]) => void;
  onFinish?: (values: Values) => void;
  onFinishFailed?: (errorInfo: ValidateErrorEntity<Values>) => void;
}


export interface FormInstance<Values = any> {
  getFieldValue: (name: NamePath) => StoreValue;
  getFieldsValue: (() => Values) &
  ((nameList: NamePath[] | true, filterFunc?: (meta: Meta) => boolean) => any);
  // getFieldError: (name: NamePath) => string[];
  // getFieldsError: (nameList?: NamePath[]) => FieldError[];
  // getFieldWarning: (name: NamePath) => string[];
  // isFieldsTouched: ((nameList?: NamePath[], allFieldsTouched?: boolean) => boolean) &
  // ((allFieldsTouched?: boolean) => boolean);
  // isFieldTouched: (name: NamePath) => boolean;
  // isFieldValidating: (name: NamePath) => boolean;
  // isFieldsValidating: (nameList: NamePath[]) => boolean;
  // resetFields: (fields?: NamePath[]) => void;
  // setFields: (fields: FieldData[]) => void;
  // setFieldValue: (name: NamePath, value: any) => void;
  // setFieldsValue: (values: RecursivePartial<Values>) => void;
  // validateFields: ValidateFields<Values>;
  setFieldsValue: (newStore: Partial<Store>) => void
  // New API
  submit: () => void;
}

export type InternalFormInstance = FormInstance & {
  // validateFields: InternalValidateFields;

  // /**
  //  * Passed by field context props
  //  */
  // prefixName?: InternalNamePath;

  // validateTrigger?: string | string[] | false;

  /**
   * Form component should register some content into store.
   * We pass the `HOOK_MARK` as key to avoid user call the function.
   */
  getInternalHooks: (secret: string) => InternalHooks | null;

  // /** @private Internal usage. Do not use it in your production */
  // _init?: boolean;
};
