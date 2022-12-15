import React from "react";
import ReactDOM from "react-dom/client";
import NoteState from "./contexts/notes/noteState";
import App from "./components/App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<NoteState>
			<App />
		</NoteState>
	</React.StrictMode>
);