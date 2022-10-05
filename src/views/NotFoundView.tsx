import '../styles/views/NotFoundView.css';

import { useLocation, useNavigate } from 'react-router-dom';

import Button from '../components/Button';

export default function NotFoundView(): JSX.Element {
	const navigate = useNavigate();
	const location = useLocation();

	const handleRedirect = (): void => {
		navigate('/');
	};
	return (
		<>
			<div id='not-found-view'>
				<section className='text-section'>
					<h1 className='text'>404</h1>
				</section>
				<section className='data-section'>
					<h2 className='main-title'>Sorry, Page Not Found</h2>
					<h4 className='description'>
						The page <span className='route'> {location.pathname} </span> you requested
						could not be found
					</h4>

					<Button onClick={handleRedirect} className='redirect-button'>
						Go Home
					</Button>
				</section>
			</div>
		</>
	);
}
