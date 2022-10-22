import '../styles/views/HomeView.css';

import { useStore } from '@nanostores/react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth as AuthStore } from '../stores/Auth';

export default function HomeView(): JSX.Element {
	const navigate = useNavigate();

	const auth = useStore(AuthStore);

	useEffect(() => {
		if (!auth) {
			navigate('/login');
		}
	}, [auth]);

	return (
		<>
			<div id='home-container'>
				<h1>Hello from Home!</h1>
			</div>
		</>
	);
}
