import { useStore } from "@nanostores/react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth as AuthStore } from "../stores/Auth";

export default function HomeView() {
	const navigate = useNavigate();

	const auth = useStore(AuthStore);

	useEffect(() => {
		if (!auth) {
			navigate("/login");
			console.log("Hola");
		}
	}, [auth]);

	return (
		<>
			<h1>Hello from Home!</h1>
		</>
	);
}
