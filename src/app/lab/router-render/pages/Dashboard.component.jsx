import React, { useState } from "react";
import { useEffect } from "react";
import Loading from "../../../helpers/Loading.component";

const Dashboard = ({ fetchDashboard }) => {
	const [name, setName] = useState("null");
	const [message, setMessage] = useState("null");
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const unSub = fetchDashboard()
			.then(({ name, message }) => {
				setName(name);
				setMessage(message);
				setError(null);
				setLoading(false);
			})
			.catch((error) => {
				console.warn(error);
				setError(error.message);
				setLoading(true);
			});

		return () => window.clearTimeout(unSub);
	}, [fetchDashboard]);

	if (error) {
		return <p>{error}</p>;
	}

	if (loading) {
		return <Loading content="Load Dashboard" />;
	}

	return (
		<div>
			<h1>{name}</h1>
			<p>{message}</p>
		</div>
	);
};

export default Dashboard;
