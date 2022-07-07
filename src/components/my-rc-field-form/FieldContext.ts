import React from 'react'
import { FormType } from './useForm'

const FieldContext = React.createContext<FormType | null>(null)

export default FieldContext