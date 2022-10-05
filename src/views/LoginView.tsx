import '../styles/views/LoginView.css';

import { useNavigate } from 'react-router-dom';
import { ChangeEvent, useState } from 'react';
import { FaUser, FaKey } from 'react-icons/fa';

import TextInput from '../components/TextInput';
import Button from '../components/Button';
import Title from '../components/Title';

export default function LoginView(): JSX.Element {
	const [, setUsername] = useState('');
	const [, setPassword] = useState('');
	const navigate = useNavigate();

	const handleUsername = (event: ChangeEvent<HTMLInputElement>): void => {
		setUsername(event.target.value);
	};

	const handlePassword = (event: ChangeEvent<HTMLInputElement>): void => {
		setPassword(event.target.value);
	};

	const handleLogin = (): void => {
		alert('Unimplemented');
	};

	const handleRegister = (): void => {
		navigate('/register');
	};

	return (
		<>
			<div id='login-container'>
				<Title>Login</Title>
				<section className='inputs-section'>
					<TextInput
						className='text-input'
						label='username'
						onChange={handleUsername}
						Icon={FaUser}
					/>
					<TextInput
						className='text-input'
						label='password'
						onChange={handlePassword}
						Icon={FaKey}
					/>
				</section>
				<section className='buttons-section'>
					<Button className='rect-button' onClick={handleLogin} main>
						Login
					</Button>
					<Button className='rect-button' onClick={handleRegister}>
						Register
					</Button>
				</section>
			</div>
		</>
	);
}
