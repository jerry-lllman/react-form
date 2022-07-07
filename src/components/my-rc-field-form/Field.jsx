import React, { Component, useEffect } from "react"
import FieldContext from "./FieldContext"

export default class Field extends React.Component {
	static contextType = FieldContext

	componentDidMount() {
	 	this.unregister = this.context.registerField(this)
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
				this.context?.setFieldValue({
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