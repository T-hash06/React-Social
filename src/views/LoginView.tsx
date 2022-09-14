import "../styles/views/LoginView.css";

import { useNavigate } from "react-router-dom";
import { ChangeEvent, useState } from "react";

import TextInput from "../components/TextInput";
import Button from "../components/Button";
import Title from "../components/Title";

export default function LoginView() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	const handleUsername = (event: ChangeEvent<HTMLInputElement>) => {
		setUsername(event.target.value);
	};

	const handlePassword = (event: ChangeEvent<HTMLInputElement>) => {
		setPassword(event.target.value);
	};

	const handleLogin = () => {
		alert("Unimplemented");
	};

	const handleRegister = () => {
		navigate("/register");
	};

	return (
		<>
			<div id="login-container">
				<Title>Login</Title>
				<section className="inputs-section">
					<TextInput
						className="text-input"
						label="username"
						onChange={handleUsername}
					/>
					<TextInput
						className="text-input"
						label="password"
						onChange={handlePassword}
					/>
				</section>
				<section className="buttons-section">
					<Button className="rect-button" onClick={handleLogin} main>
						Login
					</Button>
					<Button className="rect-button" onClick={handleRegister}>
						Register
					</Button>
				</section>
			</div>
		</>
	);
}
