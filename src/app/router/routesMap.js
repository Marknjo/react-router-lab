import React, { useState } from "react";
import { useEffect } from "react";

const Dashboard = ({ fetchInitialData }) => {
	const [name, setName] = useState("");
	const [message, setMessage] = useState("");

	useEffect(() => {
		setName(fetchInitialData.name);
		setMessage(fetchInitialData.message);
	}, []);

	return (
		<div>
			<h1>{name}</h1>
			<p>{message}</p>
		</div>
	);
};

const Settings = ({ fetchInitialData }) => {
	const [name, setName] = useState("");
	const [message, setMessage] = useState("");

	useEffect(() => {
		setName(fetchInitialData.name);
		setMessage(fetchInitialData.message);
	}, []);

	return (
		<div>
			<h1>{name}</h1>
			<p>{message}</p>
		</div>
	);
};

const routesMap = [
	{
		path: "/dashboard",
		component: Dashboard,
		fetchInitialData: {
			name: "Dashboard",
			message: "Fetched Dashboard Data",
		},
		label: "Dashboard",
	},

	{
		path: "/settings",
		component: Settings,
		fetchInitialData: {
			name: "Settings",
			message: "Fetched Settings Data",
		},
		label: "Settings",
	},
];

export default routesMap;
