import '../styles/ui/App.css';

import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';

import HomeView from '../views/HomeView';
import LoginView from '../views/LoginView';
import RegisterView from '../views/RegisterView';
import NotFoundView from '../views/NotFoundView';
import NotificationBar from './NotificationBar';

export default function App(): JSX.Element {
	useEffect(() => {
		function setWindowHeight(): void {
			const vh = window.innerHeight * 0.01;
			document.documentElement.style.setProperty('--vh', `${vh}px`);
		}

		setWindowHeight();

		window.addEventListener('resize', setWindowHeight);

		return () => window.removeEventListener('resize', setWindowHeight);
	}, []);

	return (
		<>
			<div id='main-app-container'>
				<Routes>
					<Route path='/' element={<HomeView />}></Route>
					<Route path='/login' element={<LoginView />}></Route>
					<Route path='/register' element={<RegisterView />}></Route>
					<Route path='*' element={<NotFoundView />}></Route>
				</Routes>
				<NotificationBar />
			</div>
		</>
	);
}
