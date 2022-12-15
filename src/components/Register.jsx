import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function RegisterForm(props) {
	const { showAlert } = props;
	const navigate = useNavigate();
	const [credentials, setCredentials] = useState({
		name: "",
		username: "",
		password: "",
	});
	const [confirmPassword, setConfirmPassword] = useState();

	async function handleSubmit(e) {
		e.preventDefault();
		const { username, password, name } = credentials;
		if (password !== confirmPassword) {
			return alert("Passwords do not match. Try Again!");
		}
		const response = await fetch("https://keeper-backend.onrender.com/api/auth/register", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				name: name,
				username: username,
				password: password,
			}),
		});
		const json = await response.json();

		if (json.success) {
			localStorage.setItem("userDetails", JSON.stringify(json.userId));
			navigate("/mynotes");
			showAlert("Registered Successfully", "success");
		} else {
			setCredentials({
				name: "",
				username: "",
				password: "",
			});
			showAlert("Invalid details", "danger");
		}
	}

	function handleChange(e) {
		setCredentials((prevValue) => {
			return { ...prevValue, [e.target.name]: e.target.value };
		});
		console.log(credentials);
	}

	return (
		<>
			<div className="d-flex align-items-center justify-content-center">
				<form
					id="sign-up-form"
					className="home-form text-center mt-5"
					onSubmit={handleSubmit}
				>
					<h1 className="h3 mb-3 fw-bold form-header">
						Sign Up & <br /> Start Keeping
					</h1>

					<div className="form-floating">
						<input
							type="text"
							name="name"
							className="form-control"
							id="floatingName"
							placeholder="Name"
							onChange={handleChange}
							value={credentials.name}
							required
						/>
						<label htmlFor="floatingName">Name*</label>
					</div>
					<div className="form-floating">
						<input
							type="email"
							name="username"
							className="form-control"
							id="floatingInput"
							placeholder="name@example.com"
							onChange={handleChange}
							value={credentials.username}
							required
						/>
						<label htmlFor="floatingInput">Email address*</label>
					</div>
					<div className="form-floating">
						<input
							type="password"
							name="password"
							className="form-control"
							id="floatingPassword"
							placeholder="Password"
							onChange={handleChange}
							value={credentials.password}
							required
						/>
						<label htmlFor="floatingPassword">Password*</label>
					</div>
					<div className="form-floating">
						<input
							type="password"
							name="confirm password"
							className="form-control"
							id="floatingConfirmPassword"
							placeholder="Confirm Password"
							onChange={(e) => setConfirmPassword(e.target.value)}
							required
						/>
						<label htmlFor="floatingConfirmPassword">Confirm Password*</label>
					</div>
					<button className="btn btn-lg mt-3" type="submit">
						Sign Up
					</button>
				</form>
			</div>
		</>
	);
}

export default RegisterForm;
