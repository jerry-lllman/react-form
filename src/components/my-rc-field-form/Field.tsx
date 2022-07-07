import React from "react"
import FieldContext from "./FieldContext"

interface Rules {
	required: boolean,
	message: string
}

interface FieldProps {
	name: string,
	rules: Rules[]
	children: React.ReactElement
}

export default function Field(props: FieldProps) {

	const context = React.useContext(FieldContext)

	const getControlled = () => {
		return {
			value: context?.getFieldValue(props.name),
			onChange: (e: any) => {
				const value = e.target.value
				context?.setFieldValue({
					[props.name]: value
				})
			}
		}
	}

	const returnChildNode = React.cloneElement(props.children, getControlled())

	return <div>
		{returnChildNode}
	</div>
}