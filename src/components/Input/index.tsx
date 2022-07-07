
type InputProps = React.InputHTMLAttributes<HTMLInputElement>

export default function Input(props: InputProps) {

	const { value, ...otherProps } = props

	return <div>
		<input style={{ outline: "none" }} value={value} { ...otherProps } />
	</div>
}