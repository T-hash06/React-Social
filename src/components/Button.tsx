import "../styles/ui/Button.css";

interface props {
	onClick: () => void;
	className: string;
	children: string;
	main?: boolean;
}

export default function Button({ onClick, children, className, main }: props) {
	return (
		<>
			<button
				className={`button-container ${className} ${
					main ? "main" : ""
				}`}
				onClick={onClick}
			>
				{children}
			</button>
		</>
	);
}
