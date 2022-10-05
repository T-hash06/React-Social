import "../styles/views/RegisterView.css";

import { FaKey, FaEnvelope, FaRegAddressCard, FaUser } from "react-icons/fa";
import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

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

	const [errors, setErrors] = useState<inputs>({
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

	const handleErrors = (error: string, label?: string) => {
		setErrors({ ...errors, [label!]: error });
	};

	const handleRegister = async () => {
		const withEmpty = checkEmpty();
		const withErrors = checkErrors();

		if (withErrors || withEmpty) return;

		alert("Unimplemented");
	};

	const handleLogin = () => {
		navigate("/login");
	};

	const checkEmpty = () => {
		const emptyValues = new Map();
		const mapValues = new Map(Object.entries(values));

		mapValues.forEach((value, key) => {
			if (value === "") {
				emptyValues.set(key, "Required");
			}
		});

		if (emptyValues.size != 0) {
			const objectValues = Object.fromEntries(emptyValues);
			setErrors({ ...errors, ...objectValues });

			return true;
		}

		return false;
	};

	const checkErrors = (): boolean => {
		const mapErrors = new Map(Object.entries(errors));
		let withErrors = false;

		mapErrors.forEach((value, _) => {
			if (value !== "") {
				withErrors = true;
				return;
			}
		});

		return withErrors;
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
						error={errors.name}
						setError={handleErrors}
					/>
					<TextInput
						onChange={handleChanges}
						label="email"
						className="text-input"
						Icon={FaEnvelope}
						error={errors.email}
						setError={handleErrors}
						type="email"
					/>
					<TextInput
						onChange={handleChanges}
						label="username"
						className="text-input"
						Icon={FaUser}
						error={errors.username}
						setError={handleErrors}
					/>
					<TextInput
						onChange={handleChanges}
						label="password"
						className="text-input"
						Icon={FaKey}
						error={errors.password}
						setError={handleErrors}
						type="password"
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
