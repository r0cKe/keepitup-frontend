import React, { useEffect, useContext } from "react";
import noteContext from "../contexts/notes/noteContext";
import NoteItem from "./NoteItem";

function Notes(props) {
	const { showAlert, updateNote } = props;
	const context = useContext(noteContext);
	const { notes, deleteNote, setNotes, fetchAgain } = context;

	useEffect(() => {
		const userDetails = JSON.parse(localStorage.getItem("userDetails"));
		if (userDetails) {
			getNotes(userDetails.userId);
		}
	}, [fetchAgain]);

	async function getNotes(loggedUser) {
		const response = await fetch(`/api/notes/fetchallnotes`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				userId: loggedUser,
			}),
		});
		const json = await response.json();
		if (json.success) {
			setNotes(json.foundNotes.reverse());
		} else {
			console.log(json.success);
		}
	}

	return notes.map((note) => {
		return (
			<NoteItem
				key={note._id}
				deleteNote={deleteNote}
				note={note}
				showAlert={showAlert}
				updateNote={updateNote}
			/>
		);
	});
}

export default Notes;
