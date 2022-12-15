import React, { useState } from "react";
import "../App.css";
import Header from "./Header";
import Footer from "./Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Alert from "./Alert";
import Home from "./Home";
import MyNotesPage from "./MyNotesPage";
import { ChakraProvider } from "@chakra-ui/react";


function App() {
	const [alert, setAlert] = useState(null);

	function showAlert(message, type) {
		setAlert({
			msg: message,
			type: type,
		});
		setTimeout(() => {
			setAlert(null);
		}, 1500);
	}
	return (
		<Router>
			{/* <NoteState> */}
			<ChakraProvider>
				<div id="container">
					<Header showAlert={showAlert} />
					<Alert alert={alert} />
					<Routes>
						<Route path="/" element={<Home showAlert={showAlert} />} />
						<Route
							path="/mynotes"
							element={<MyNotesPage showAlert={showAlert} />}
						/>
					</Routes>
					<Footer />
				</div>
				</ChakraProvider>
			{/* </NoteState> */}
		</Router>
	);
}

export default App;