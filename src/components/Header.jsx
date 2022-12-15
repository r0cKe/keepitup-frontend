import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Header(props) {
	const navigate = useNavigate();
	const location = useLocation();
	const [currentRoute, setCurrentRoute] = useState("");
	const [loggedUserName, setLoggedUserName] = useState("");

	useEffect(() => {
		setCurrentRoute(location.pathname);
	}, [location]);

	useEffect(() => {
		const userDetails = localStorage.getItem("userDetails");
		const json = JSON.parse(userDetails);
		if (userDetails) {
			setLoggedUserName(json.userName);
		}
	}, [navigate]);

	async function handleLogout() {
		const response = await fetch(`/api/auth/logout`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				userId: "62f920f1e363cd90bb53ad77",
			}),
		});
		const json = await response.json();

		if (json.success) {
			localStorage.removeItem("userDetails");
			setLoggedUserName("");
			navigate("/");
			props.showAlert("Logged out successfully", "success");
		} else {
			props.showAlert("Login first", "danger");
		}
	}

	return (
		<header>
			<nav className="navbar navbar-expand-lg ">
				<div className="container-fluid">
					<div className="d-flex flex-column">
						<h1 className="navbar-brand">Keepitup</h1>
						<span className="header-user">{loggedUserName}</span>
					</div>
					{currentRoute === "/" || currentRoute === "/register" ? (
						<></>
					) : (
						<>
							<button
								className="navbar-toggler"
								type="button"
								data-bs-toggle="collapse"
								data-bs-target="#navbarNavAltMarkup"
								aria-controls="navbarNavAltMarkup"
								aria-expanded="false"
								aria-label="Toggle navigation"
							>
								<span className="navbar-toggler-icon"></span>
							</button>
							<div className="collapse navbar-collapse" id="navbarNavAltMarkup">
								<div className={`navbar-nav active`}>
									{currentRoute === "/mynotes" ? (
										<button
											onClick={handleLogout}
											className="logout_btn nav-link active"
										>
											<i className={`fa fa-sign-out`} aria-hidden="true"></i>
											Log out
										</button>
									) : (
										<>
											{/* <Link
									className="nav-link active"
									aria-current="page"
									to="/"
								>
									<i className={`fa fa-sign-in`} aria-hidden="true"></i>
									Log in
								</Link>
								<Link
									className="nav-link active"
									aria-current="page"
									to="/register"
								>
									<i className="fa-solid fa-pen-to-square"></i>
									Sign up
								</Link> */}
										</>
									)}
								</div>
							</div>
						</>
					)}
				</div>
			</nav>
		</header>
	);
}

export default Header;
