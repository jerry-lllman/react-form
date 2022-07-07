import { ReactElement } from "react";


export type InternalNamePath = (string | number)[];
export type NamePath = string | number | InternalNamePath;

export type StoreValue = any
export type Store = Record<string, StoreValue>


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


export interface FormInstance<Values = any> {

}

export interface FieldEntity {
  props: {
    name?: NamePath;
    rules?: Rule[];
    dependencies?: NamePath[];
    initialValue?: any;
  };
}