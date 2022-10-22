import '../styles/views/RegisterView.css';

import { FaKey, FaEnvelope, FaRegAddressCard, FaUser } from 'react-icons/fa';
import { FetchClient, HttpStatus } from '../hooks/useFetch';
import { spawnNotification } from '../stores/Notification';
import { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Title from '../components/Title';
import TextInput from '../components/TextInput';
import Button from '../components/Button';

interface inputs {
	name: string;
	email: string;
	username: string;
	password: string;
}

export default function RegisterView(): JSX.Element {
	const [values, setValues] = useState<inputs>({
		name: '',
		email: '',
		username: '',
		password: '',
	});

	const [errors, setErrors] = useState<inputs>({
		name: '',
		email: '',
		username: '',
		password: '',
	});
	const navigate = useNavigate();

	const handleChanges = (event: ChangeEvent<HTMLInputElement>, label?: string): void => {
		if (label === undefined) return;

		const newInputs = { ...values, [label]: event.target.value };
		setValues(newInputs);
	};

	const handleErrors = (error: string, label?: string): void => {
		if (label === undefined) return;
		setErrors({ ...errors, [label]: error });
	};

	const handleRegister = (): void => {
		const withEmpty = checkEmpty();
		const withErrors = checkErrors();

		if (withErrors || withEmpty) return;

		void createUser();
	};

	const handleLogin = (): void => {
		navigate('/login');
	};

	const createUser = async (): Promise<void> => {
		const client = new FetchClient<undefined>();

		const query = client.post('users', values);

		query.addErrorHandler(HttpStatus.UNKNOWN, (_) => {
			spawnNotification('Server error');
		});

		query.addErrorHandler(HttpStatus.CONFLICT, (error) => {
			const conflictFields = error.data as string[];
			const mapErrors = new Map();

			conflictFields.forEach((field) => {
				mapErrors.set(field, 'Already exists!');
			});

			const newErrors = Object.fromEntries(mapErrors);
			setErrors({ ...errors, ...newErrors });
		});

		query.addSuccessHandler((_) => {
			spawnNotification(`User ${values.username} created!`);
			navigate('/login');
		});

		void (await query.resolve());
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

	return (
		<>
			<div id='register-container'>
				<Title>Register</Title>
				<section className='inputs-container'>
					<TextInput
						label='name'
						className='text-input'
						error={errors.name}
						Icon={FaRegAddressCard}
						setError={handleErrors}
						onChange={handleChanges}
					/>
					<TextInput
						label='email'
						type='email'
						className='text-input'
						Icon={FaEnvelope}
						error={errors.email}
						setError={handleErrors}
						onChange={handleChanges}
					/>
					<TextInput
						label='username'
						className='text-input'
						Icon={FaUser}
						error={errors.username}
						setError={handleErrors}
						onChange={handleChanges}
					/>
					<TextInput
						label='password'
						type='password'
						className='text-input'
						Icon={FaKey}
						error={errors.password}
						setError={handleErrors}
						onChange={handleChanges}
						onEnter={handleRegister}
					/>
				</section>
				<section className='buttons-container'>
					<Button onClick={handleRegister} className='button' main>
						register
					</Button>
					<Button onClick={handleLogin} className='button'>
						login
					</Button>
				</section>
			</div>
		</>
	);
}
