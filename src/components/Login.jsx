import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginForm(props) {
	const { showAlert } = props;
	const navigate = useNavigate();
	const [credentials, setCredentials] = useState({
		username: "",
		password: "",
	});

	useEffect(() => {
		const userDetails = JSON.parse(localStorage.getItem("userDetails"));
		if (userDetails) {
			navigate("/mynotes");
		}
	}, [navigate]);

	async function handleSubmit(e) {
		e.preventDefault();
		const { username, password } = credentials;
		const response = await fetch("/api/auth/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				username,
				password,
			}),
		});

		if (response.status === 401) {
			setCredentials({
				username: "",
				password: "",
			});
			showAlert("Invalid Credentials", "danger");
		}

		const json = await response.json();

		if (json.success) {
			localStorage.setItem("userDetails", JSON.stringify(json.userDetails));
			navigate("/mynotes");
			showAlert(`Welcome back ${json.userDetails.userName}`, "success");
		} else {
			setCredentials({
				username: "",
				password: "",
			});
			showAlert("Some error occured !", "danger");
		}
	}

	function handleChange(e) {
		setCredentials((prevValue) => {
			return { ...prevValue, [e.target.name]: e.target.value };
		});
	}

	return (
		<>
			<div className="d-flex justify-content-center mt-5">
				<form
					id="login-form"
					className="home-form text-center"
					onSubmit={handleSubmit}
				>
					<h1 className="h3 mb-3 fw-bold form-header">Log in</h1>

					<div className="form-floating">
						<input
							type="email"
							name="username"
							className="form-control"
							id="floatingLoginInput"
							placeholder="name@example.com"
							onChange={handleChange}
							value={credentials.username}
							required
						/>
						<label htmlFor="floatingInput">Email address</label>
					</div>
					<div className="form-floating">
						<input
							type="password"
							name="password"
							className="form-control"
							id="floatingLoginPassword"
							placeholder="Password"
							onChange={handleChange}
							value={credentials.password}
							required
						/>
						<label htmlFor="floatingPassword">Password</label>
					</div>
					<button className="btn btn-lg mt-3 fw-bold" type="submit">
						Go <i className="fa fa-arrow-right" aria-hidden="true"></i>
					</button>
				</form>
			</div>
		</>
	);
}

export default LoginForm;
