import React, { Component, useContext, useLayoutEffect, useState } from "react"
import FieldContext, { HOOK_MARK } from "./FieldContext"

// export default class Field extends React.Component {
// 	static contextType = FieldContext

// 	componentDidMount() {
// 		const { registerField } = this.context.getInternalHooks(HOOK_MARK)
// 		this.unregister = registerField(this)
// 	}

// 	componentWillUnmount() {
// 		this.unregister()
// 	}


// 	onStoreChange = () => {
// 		this.forceUpdate()
// 	}

// 	getControlled = () => {
// 		return {
// 			value: this.context?.getFieldValue(this.props.name),
// 			onChange: (e) => {
// 				const value = e.target.value
// 				this.context?.setFieldsValue({
// 					[this.props.name]: value
// 				})
// 			}
// 		}
// 	}

// 	render() {
// 		const returnChildNode = React.cloneElement(this.props.children, this.getControlled())

// 		return <div>
// 			{returnChildNode}
// 		</div>
// 	}
// }


export default function Field(props) {

	const { name, children } = props

	const { getInternalHooks, getFieldValue, setFieldsValue } = useContext(FieldContext)

	const [, forceUpdate] = useState({})

	// 使用 useEffect 会导致订阅的太晚，业务使用 this.formRef.current.setFieldsValue({ username: "jerry" })
	// 无法设置到值，所以需要使用 useLayoutEffect

	useLayoutEffect(() => {
		const { registerField } = getInternalHooks(HOOK_MARK)
		const unregister = registerField({ props, onStoreChange: () => forceUpdate({}) })

		return () => {
			unregister()
		}
	}, [])

	const getControlled = () => {
		return {
			value: getFieldValue(name),
			onChange: (e) => {
				const value = e.target.value
				setFieldsValue({
					[name]: value
				})
			}
		}
	}

	const returnChildNode = React.cloneElement(children, getControlled())
	return <div>
		{returnChildNode}
	</div>
}