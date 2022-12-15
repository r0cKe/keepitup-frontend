import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import noteContext from "../contexts/notes/noteContext";

function InputField(props) {
	const { showAlert } = props;
	const navigate = useNavigate();
	const context = useContext(noteContext);
	const [loggedUser, setLoggedUser] = useState();
	const { addNote, fetchAgain, setFetchAain } = context;

	const [note, setNote] = useState({ title: "", content: "" });
	const [clicked, setClicked] = useState(false);

	useEffect(() => {
		const userDetails = localStorage.getItem("userDetails");
		const json = JSON.parse(userDetails);
		if (!userDetails) {
			navigate("/");
		} else {
			setLoggedUser(json.userId);
		}
	}, [navigate]);

	//Handle changes in input fields
	function handleChange(e) {
		const { name, value } = e.target;
		setNote((prevValue) => {
			return { ...prevValue, [name]: value };
		});
	}

	// Handles the click on TextArea
	function handleClick() {
		setClicked(true);
	}

	// Handles the Add note button click
	async function submitNote(event) {
		event.preventDefault();
		const { title, content } = note;

		const response = await fetch("/api/notes/addnote", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				userId: loggedUser,
				title,
				content,
			}),
		});

		const json = await response.json();

		if (json.success) {
			addNote(note);
			setClicked(false);
			await setFetchAain(!fetchAgain);
			setNote({
				title: "",
				content: "",
			});
			showAlert("Note Added", "success");
		} else {
			showAlert(json.error || "Some error occured", "danger");
		}
	}

	return (
		<div id="note-form">
			<form className="create-note">
				{clicked === true && (
					<input
						onChange={handleChange}
						type="text"
						name="title"
						id="inputTitle"
						value={note.title}
						placeholder="Title"
						required
						autoFocus
					/>
				)}

				<textarea
					onChange={handleChange}
					onClick={handleClick}
					// className={!clicked && 'd-none' }
					name="content"
					id="inputContent"
					value={note.content}
					placeholder="Take a note..."
					rows={clicked === true ? "2" : "1"}
					required
				/>
				<br />
				{clicked === true && (
					<button type="submit" id="submitNote" onClick={submitNote}>
						<i className="fa-regular fa-plus fa-2x"></i>
					</button>
				)}
			</form>
		</div>
	);
}

export default InputField;
