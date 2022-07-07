import React, { Component, useEffect } from "react"
import FieldContext, { HOOK_MARK } from "./FieldContext"

export default class Field extends React.Component {
	static contextType = FieldContext

	componentDidMount() {
		const { registerField } = this.context.getInternalHooks(HOOK_MARK)
		this.unregister = registerField(this)
	}

	componentWillUnmount() {
		this.unregister()
	}


	onStoreChange = () => {
		this.forceUpdate()
	}

	getControlled = () => {
		return {
			value: this.context?.getFieldValue(this.props.name),
			onChange: (e) => {
				const value = e.target.value
				this.context?.setFieldsValue({
					[this.props.name]: value
				})
			}
		}
	}

	render() {
		const returnChildNode = React.cloneElement(this.props.children, this.getControlled())

		return <div>
			{returnChildNode}
		</div>
	}
}