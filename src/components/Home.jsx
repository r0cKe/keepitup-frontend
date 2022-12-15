import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Box, TabList, Tab, Tabs, TabPanels, TabPanel } from "@chakra-ui/react";
import RegisterForm from "./Register";
import LoginForm from "./Login";

const Home = (props) => {
	const { showAlert } = props;
	const navigate = useNavigate();
	const [activeTab, setActiveTab] = useState("loginTab");

	const handleLoginTab = () => {
		setActiveTab("loginTab");
	};
	const handleSignupTab = () => {
		setActiveTab("signupTab");
	};

	useEffect(() => {
		const userDetails = JSON.parse(localStorage.getItem("userDetails"));
		if (userDetails) {
			navigate("/mynotes");
		}
	}, [navigate]);

	return (
		<div>
			<Box w="100%" p={4}>
				<Tabs variant="soft-rounded">
					<div className="text-center">
						<TabList className="tab-list">
							<Tab
								className={
									activeTab === "loginTab"
										? "me-3 p-3 fw-bold tabs tab-active"
										: "me-3 border border-warning tabs"
								}
								onClick={handleLoginTab}
							>
								Login
							</Tab>
							<Tab
								className={
									activeTab === "signupTab"
										? "ms-3 p-3 fw-bold tabs tab-active"
										: "ms-3 border border-warning  tabs"
								}
								onClick={handleSignupTab}
							>
								Sign Up
							</Tab>
						</TabList>
					</div>
					<TabPanels>
						<TabPanel>
							<LoginForm showAlert={showAlert} />
						</TabPanel>
						<TabPanel>
							<RegisterForm showAlert={showAlert} />
						</TabPanel>
					</TabPanels>
				</Tabs>
			</Box>
		</div>
	);
};

export default Home;
