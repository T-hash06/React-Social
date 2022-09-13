import { useLocation, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import "../styles/NotFoundView.css";

export default function () {
	const navigate = useNavigate();
	const location = useLocation();

	const handleRedirect = () => {
		navigate("/");
	};
	return (
		<>
			<div id="not-found-view">
				<section className="text-section">
					<h1 className="text">404</h1>
				</section>
				<section className="data-section">
					<h2 className="main-title">Sorry, Page Not Found</h2>
					<h4 className="description">
						The page{" "}
						<span className="route"> {location.pathname} </span> you
						requested could not be found
					</h4>

					<Button
						onClick={handleRedirect}
						className="redirect-button"
					>
						Go Home
					</Button>
				</section>
			</div>
		</>
	);
}
