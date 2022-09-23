import "../styles/ui/TextInput.css";

import React, { ChangeEvent, ReactElement, useState } from "react";
import { IconType } from "react-icons";

interface props {
	onChange: (event: ChangeEvent<HTMLInputElement>, label?: string) => void;
	className?: string;
	Icon?: IconType;
	label: string;
}

export default function TextInput({ onChange, className, label, Icon }: props) {
	const [isFilled, setFilled] = useState(false);

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;
		setFilled(!!value);
		onChange(event, label);
	};

	return (
		<>
			<div
				className={`input-container ${className} ${
					isFilled ? "filled" : ""
				} ${Icon ? "iconned" : ""}`}
			>
				{Icon ? <Icon className="icon"></Icon> : <></>}
				<input className="input" type="text" onChange={handleChange} />
				<label className="label">{label}</label>
			</div>
		</>
	);
}
