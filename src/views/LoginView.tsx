import '../styles/views/LoginView.css';

import { FetchClient, HttpStatus } from '../hooks/useFetch';
import { spawnNotification } from '../stores/Notification';
import { useNavigate } from 'react-router-dom';
import { ChangeEvent, useState } from 'react';
import { FaUser, FaKey } from 'react-icons/fa';
import { setAuth } from '../stores/Auth';

import TextInput from '../components/TextInput';
import Button from '../components/Button';
import Title from '../components/Title';

interface inputs {
	username: string;
	password: string;
}

export default function LoginView(): JSX.Element {
	const [values, setValues] = useState<inputs>({ username: '', password: '' });
	const [errors, setErrors] = useState<inputs>({ username: '', password: '' });

	const navigate = useNavigate();

	const handleInputChange = (event: ChangeEvent<HTMLInputElement>, label?: string): void => {
		if (label === undefined) return;

		const newValues = { ...values, [label]: event.target.value };
		setValues(newValues);
	};

	const handleLogin = (): void => {
		const withEmpty = checkEmpty();
		const withErrors = checkErrors();

		if (withEmpty || withErrors) return;

		void login();
	};

	const login = async (): Promise<void> => {
		const client = new FetchClient<string>();
		const query = client.post('auth', values);

		query.addErrorHandler(HttpStatus.UNKNOWN, (_) => {
			spawnNotification('Server not connected');
		});

		query.addErrorHandler(HttpStatus.UNAUTHORIZED, (_) => {
			setErrors({ ...errors, password: 'Incorrect password!' });
		});

		query.addErrorHandler(HttpStatus.NOT_FOUND, (_) => {
			setErrors({ ...errors, username: 'User not found!' });
		});

		query.addSuccessHandler((data) => {
			localStorage.setItem('acessToken', data);
			setAuth(true);
			navigate('/');
		});

		void (await query.resolve());
	};

	const checkErrors = (): boolean => {
		const mapErrors = new Map(Object.entries(errors));
		let withErrors = false;

		mapErrors.forEach((value, _) => {
			if (value !== '') {
				withErrors = true;
				return null;
			}
		});

		return withErrors;
	};

	const handleRegister = (): void => {
		navigate('/register');
	};

	const handleErrors = (error: string, label?: string): void => {
		if (label === undefined) return;
		setErrors({ ...errors, [label]: error });
	};

	const checkEmpty = (): boolean => {
		const emptyValues = new Map();
		const mapValues = new Map(Object.entries(values));

		mapValues.forEach((value, key) => {
			if (value === '') {
				emptyValues.set(key, 'Required Field!');
			}
		});

		if (emptyValues.size !== 0) {
			const objectValues = Object.fromEntries(emptyValues);
			setErrors({ ...errors, ...objectValues });

			return true;
		}

		return false;
	};

	return (
		<>
			<div id='login-container'>
				<Title>Login</Title>
				<section className='inputs-section'>
					<TextInput
						className='text-input'
						label='username'
						onChange={handleInputChange}
						Icon={FaUser}
						error={errors.username}
						setError={handleErrors}
					/>
					<TextInput
						className='text-input'
						label='password'
						type='password'
						Icon={FaKey}
						error={errors.password}
						onEnter={handleLogin}
						setError={handleErrors}
						onChange={handleInputChange}
						validate={false}
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
