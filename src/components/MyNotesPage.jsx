import React, { useContext, useEffect, useRef, useState } from "react";
import NoteContext from "../contexts/notes/noteContext";
import InputField from "./InputField";
import Notes from "./Notes";

const MyNotesPage = (props) => {
	const { showAlert } = props;

	const context = useContext(NoteContext);
	const { editNote, fetchAgain, setFetchAain } = context;

	const [note, setNote] = useState({
		id: "",
		editedTitle: "",
		editedContent: "",
	});
	const [loggedUser, setLoggedUser] = useState();

	const ref = useRef(null);
	const refClose = useRef(null);

	useEffect(() => {
		const userDetails = localStorage.getItem("userDetails");
		const json = JSON.parse(userDetails);
		if (userDetails) {
			setLoggedUser(json.userId);
		}
	}, []);

	//Handle changes in input fields
	function handleChange(e) {
		const { name, value } = e.target;
		setNote((prevValue) => {
			return { ...prevValue, [name]: value };
		});
	}

	const handleSubmit = async (e) => {
		refClose.current.click();

		const response = await fetch(`/api/notes/editnote/${note.id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				userId: loggedUser,
				title: note.editedTitle,
				content: note.editedContent,
			}),
		});
		const json = await response.json();
		if (json.success) {
			editNote(note._id, note.editedTitle, note.editedContent);
			setFetchAain(!fetchAgain);
			showAlert("Note edited", "success");
		} else {
			showAlert("Some error occured", "danger");
		}
	};

	const updateNote = async (currentNote) => {
		ref.current.click();
		setNote({
			id: currentNote._id,
			editedTitle: currentNote.title,
			editedContent: currentNote.content,
		});
	};

	return (
		<div className="main-container">
			<InputField showAlert={showAlert} />
			{/* <!-- Button trigger modal --> */}
			<button
				type="button"
				className="btn btn-primary d-none"
				data-bs-toggle="modal"
				data-bs-target="#exampleModal"
				ref={ref}
			>
				Launch demo modal
			</button>

			{/* <!-- Modal --> */}
			<div
				className="modal fade"
				id="exampleModal"
				tabIndex="-1"
				aria-labelledby="exampleModalLabel"
				aria-hidden="true"
			>
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title" id="staticBackdropLabel">
								Edit selected note
							</h5>
							<button
								type="button"
								className="btn-close"
								data-bs-dismiss="modal"
								aria-label="Close"
							></button>
						</div>
						<div
							className="modal-body"
							style={{ backgroundColor: "rgba(0,0,0,.1)" }}
						>
							<div className="w-100" id="note-form">
								<form className="create-note p-0">
									<input
										onChange={handleChange}
										type="text"
										name="editedTitle"
										id="inputTitle"
										value={note.editedTitle}
										placeholder="Title"
										required
										autoFocus
									/>
									<textarea
										onChange={handleChange}
										name="editedContent"
										id="inputContent"
										value={note.editedContent}
										placeholder="Take a note..."
										required
									/>
								</form>
							</div>
						</div>
						<div className="modal-footer">
							<button
								type="button"
								className="btn btn-secondary"
								ref={refClose}
								data-bs-dismiss="modal"
							>
								Close
							</button>
							<button
								type="submit"
								className="btn btn-update"
								style={{ backgroundColor: "#f5ba13", color: "white" }}
								onClick={handleSubmit}
							>
								Update
							</button>
						</div>
					</div>
				</div>
			</div>
			<div className="notes">
				<Notes showAlert={showAlert} updateNote={updateNote} />
			</div>
		</div>
	);
};

export default MyNotesPage;
