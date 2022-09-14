import "../styles/ui/TextInput.css";

import { ChangeEvent, useState } from "react";

interface props {
	onChange: (event: ChangeEvent<HTMLInputElement>) => void;
	className?: string;
	label: string;
}

export default function TextInput({ onChange, className, label }: props) {
	const [isFilled, setFilled] = useState(false);

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;
		setFilled(!!value);
		onChange(event);
	};

	return (
		<>
			<div
				className={`input-container ${className} ${
					isFilled ? `filled` : ""
				}`}
			>
				<input className="input" type="text" onChange={handleChange} />
				<label className="label">{label}</label>
			</div>
		</>
	);
}
