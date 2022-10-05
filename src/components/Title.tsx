import '../styles/ui/Title.css';

interface props {
	children: string;
}

export default function Title({ children }: props): JSX.Element {
	return (
		<>
			<div className='title-container'>
				<h1 className='text'>{children}</h1>
			</div>
		</>
	);
}
