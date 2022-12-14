import '../styles/ui/TextInput.css';

import { ChangeEvent, FocusEvent, KeyboardEvent, useState } from 'react';
import { IconType } from 'react-icons';
import { FaEye } from 'react-icons/fa';

import classnames from 'classnames';

type InputType = 'text' | 'password' | 'email';
type FocusType = 'focus' | 'blur';

interface props {
	onChange: (event: ChangeEvent<HTMLInputElement>, label: string) => void;
	label: string;
	error?: string;
	Icon?: IconType;
	type?: InputType;
	validate?: boolean;
	className?: string;
	setError?: (error: string, label: string) => void;
	onEnter?: () => void;
}

interface ShowIconProps {
	type?: InputType;
	hidden: boolean;
	onClick: () => void;
}

function Icon({ Icon }: { Icon?: IconType }): JSX.Element {
	if (Icon !== undefined) return <Icon className='icon'></Icon>;

	return <></>;
}

function ErrorLabel({ error }: { error?: string }): JSX.Element {
	if (error !== undefined && error.length !== 0)
		return <label className='error-label'>{error}</label>;

	return <></>;
}

function ShowIcon({ type, hidden, onClick }: ShowIconProps): JSX.Element {
	if (type === 'password')
		return (
			<>
				<button
					className={classnames('eye-icon', { hidden })}
					onClick={onClick}
					tabIndex={-1}
				>
					<FaEye />
					<span className='slash'></span>
				</button>
			</>
		);

	return <></>;
}

export default function TextInput(props: props): JSX.Element {
	const [isFilled, setFilled] = useState(false);
	const [hidden, setHidden] = useState(true);

	const handleSubmit = (event: KeyboardEvent<HTMLInputElement>): void => {
		if (event.key !== 'Enter' || props.onEnter === undefined) return;

		props.onEnter();
	};

	const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
		const value = event.target.value;

		validate(value, props.type, props.validate);

		setFilled(value.length !== 0);

		props.onChange(event, props.label);
	};

	const handleHidden = (): void => {
		setHidden(!hidden);
	};

	const handleFocus = (event: FocusEvent<HTMLInputElement>): void => {
		const focusType = event.type as FocusType;
		const value = event.target.value;

		if (focusType === 'focus') {
			clearError();
		} else {
			validate(value, props.type, props.validate);
		}
	};

	const clearError = (): void => {
		if (props.setError !== undefined) props.setError('', props.label);
	};

	const validate = (
		value: string,
		type: InputType = 'text',
		canValidate: boolean = true
	): void => {
		if (!canValidate) return clearError();
		if (type === 'text' || props.setError === undefined) return;
		if (value.length === 0) return clearError();

		if (type === 'email') {
			if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
				return props.setError('Invalid Email!', props.label);
			}
		}

		if (type === 'password') {
			if (value.length < 8) {
				return props.setError('Password too short!', props.label);
			}
		}

		return clearError();
	};

	const getType = (): InputType => {
		if (props.type !== 'password') return 'text';

		if (!hidden) return 'text';

		return 'password';
	};

	return (
		<>
			<div
				className={classnames('input-container', {
					filled: isFilled,
					error: props.error,
					[props.className ?? '']: true,
					iconned: props.Icon !== undefined,
				})}
			>
				<Icon Icon={props.Icon} />
				<input
					className='input'
					type={getType()}
					onChange={handleChange}
					onFocus={handleFocus}
					onBlur={handleFocus}
					onKeyDown={handleSubmit}
				/>
				<ShowIcon type={props.type} hidden={hidden} onClick={handleHidden} />
				<label className='label'>{props.label}</label>
				<ErrorLabel error={props.error} />
			</div>
		</>
	);
}
