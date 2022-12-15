import React, { useContext, useEffect, useState } from "react";
import NoteContext from "../contexts/notes/noteContext";

const NoteItem = (props) => {
	const { note, deleteNote, showAlert, updateNote } = props;

	const [loggedUser, setLoggedUser] = useState();

	const context = useContext(NoteContext);
	const { fetchAgain, setFetchAain } = context;

	useEffect(() => {
		const userDetails = JSON.parse(localStorage.getItem("userDetails"));
		if (userDetails) {
			setLoggedUser(userDetails.userId);
		}
	}, []);

	// handle the click of the delete button in each note
	async function handleDelete() {
		const response = await fetch(
			`/api/notes/deletenote/${note._id}`,
			{
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ userId: loggedUser }),
			}
		);
		const json = await response.json();
		if (json.success) {
			deleteNote(note._id);
			setFetchAain(!fetchAgain);
			showAlert("Note deleted", "success");
		} else {
			console.log(json.success);
			showAlert("Some error occured", "danger");
		}
	}

	return (
		<div className="note">
			<h1>{note.title}</h1>
			<p>{note.content}</p>
			<button
				className="note-btns me-3"
				name="deleteNote"
				id="deleteNote"
				onClick={handleDelete}
			>
				<i className="far fa-trash-alt"></i>
			</button>
			<button
				className="note-btns"
				name="editNote"
				id="editNote"
				onClick={() => {
					updateNote(note);
				}}
			>
				<i className="fa-solid fa-pen-to-square"></i>
			</button>
		</div>
	);
};

export default NoteItem;
