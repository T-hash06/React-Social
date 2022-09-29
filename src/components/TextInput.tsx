import "../styles/ui/TextInput.css";

import { ChangeEvent, useState } from "react";
import { IconType } from "react-icons";
import classnames from "classnames";

type InputType = "text" | "password" | "email";

interface props {
	onChange: (event: ChangeEvent<HTMLInputElement>, label?: string) => void;
	setError?: (error: string, label: string) => void;
	className?: string;
	error?: string;
	Icon?: IconType;
	type?: InputType;
	label: string;
}
function Icon({ Icon }: { Icon?: IconType }) {
	if (Icon !== undefined) return <Icon className="icon"></Icon>;

	return <></>;
}

function ErrorLabel({ error }: { error?: string }) {
	if (!!error) return <label className="error-label">{error}</label>;

	return <></>;
}

export default function TextInput(props: props) {
	const [isFilled, setFilled] = useState(false);

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;

		validate(value, props.type || "text");
		setFilled(!!value);
		props.onChange(event, props.label);
	};

	const validate = (value: string, type: InputType) => {
		if (type === "text" || props.setError === undefined) return;
		if (value.length === 0) {
			return props.setError("", props.label);
		}

		if (type === "email") {
			if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
				return props.setError("Invalid Email!", props.label);
			}
		}

		if (type === "password") {
			if (value.length < 8) {
				return props.setError("Password too short!", props.label);
			}
		}

		return props.setError("", props.label);
	};

	return (
		<>
			<div
				className={classnames("input-container", {
					filled: isFilled,
					iconned: props.Icon !== undefined,
					error: props.error,
					[props.className!]: true,
				})}
			>
				<Icon Icon={props.Icon} />
				<input className="input" type="text" onChange={handleChange} />
				<label className="label">{props.label}</label>
				<ErrorLabel error={props.error} />
			</div>
		</>
	);
}
