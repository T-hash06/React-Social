import "../styles/App.css";

import { Routes, Route } from "react-router-dom";

import HomeView from "../views/HomeView";
import LoginView from "../views/LoginView";
import RegisterView from "../views/RegisterView";

export default function App() {
	return (
		<>
			<div id="main-app-container">
				<Routes>
					<Route path="/" element={<HomeView />}></Route>
					<Route path="/login" element={<LoginView />}></Route>
					<Route path="/register" element={<RegisterView />}></Route>
				</Routes>
			</div>
		</>
	);
}
