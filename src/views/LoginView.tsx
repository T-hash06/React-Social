import "../styles/LoginView.css";

import Title from "../components/Title";
import TextInput from "../components/TextInput";

import { ChangeEvent, useState } from "react";

export default function LoginView() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const handleUsername = (event: ChangeEvent<HTMLInputElement>) => {
		setUsername(event.target.value);
	};
	const handlePassword = (event: ChangeEvent<HTMLInputElement>) => {
		setPassword(event.target.value);
	};

	return (
		<>
			<div id="login-container">
				<Title>Login</Title>
				<section className="inputs-section">
					<TextInput
						className={`text-input`}
						label="username"
						onChange={handleUsername}
					/>
					<TextInput
						className={`text-input`}
						label="password"
						onChange={handlePassword}
					/>
				</section>
			</div>
		</>
	);
}
