import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
	const [notes, setNotes] = useState([]);
	const [loggedUser, setLoggedUser] = useState();
	const [fetchAgain, setFetchAain] = useState(false);

	// Adding note in the UI
	function addNote(note) {
		setNotes((prevValue) => {
			return [note, ...prevValue];
		});
	}

	// Editing note in the UI
	function editNote(id, title, content) {
		for (let index = 0; index < notes.length; index++) {
			const element = notes[index];
			if (element._id === id) {
				element.title = title;
				element.content = content;
			}
		}
	}

	// Deleting note in UI
	function deleteNote(id) {
		setNotes((prevValue) => {
			return prevValue.filter((note) => {
				return note._id !== id;
			});
		});
	}

	return (
		<NoteContext.Provider
			value={{
				notes,
				setNotes,
				addNote,
				editNote,
				deleteNote,
				fetchAgain,
				setFetchAain,
				loggedUser,
				setLoggedUser,
			}}
		>
			{props.children}
		</NoteContext.Provider>
	);
};
export default NoteState;
