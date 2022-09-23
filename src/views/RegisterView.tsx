import "../styles/views/RegisterView.css";

import { FaKey, FaEnvelope, FaRegAddressCard, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { ChangeEvent, useState } from "react";

import TextInput from "../components/TextInput";
import Button from "../components/Button";
import Title from "../components/Title";

interface inputs {
	name: string;
	email: string;
	username: string;
	password: string;
}

export default function RegisterView() {
	const [values, setValues] = useState<inputs>({
		name: "",
		email: "",
		username: "",
		password: "",
	});
	const navigate = useNavigate();

	const handleChanges = (
		event: ChangeEvent<HTMLInputElement>,
		label?: string
	) => {
		const newInputs = { ...values, [label!]: event.target.value };
		setValues(newInputs);
	};

	const handleRegister = () => {
		alert("Unimplemented");
	};

	const handleLogin = () => {
		navigate("/login");
	};

	return (
		<>
			<div id="register-container">
				<Title>Register</Title>
				<div className="inputs-container">
					<TextInput
						onChange={handleChanges}
						label="name"
						className="text-input"
						Icon={FaRegAddressCard}
					/>
					<TextInput
						onChange={handleChanges}
						label="email"
						className="text-input"
						Icon={FaEnvelope}
					/>
					<TextInput
						onChange={handleChanges}
						label="username"
						className="text-input"
						Icon={FaUser}
					/>
					<TextInput
						onChange={handleChanges}
						label="password"
						className="text-input"
						Icon={FaKey}
					/>
				</div>
				<div className="buttons-container">
					<Button onClick={handleRegister} className="button" main>
						register
					</Button>
					<Button onClick={handleLogin} className="button">
						login
					</Button>
				</div>
			</div>
		</>
	);
}
