import '../styles/ui/Button.css';

interface props {
	onClick: () => void;
	className: string;
	children: string;
	main?: boolean;
}

export default function Button({ onClick, children, className, main }: props): JSX.Element {
	return (
		<>
			<button
				className={`button-container ${className} ${main !== undefined ? 'main' : ''}`}
				onClick={onClick}
			>
				{children}
			</button>
		</>
	);
}
