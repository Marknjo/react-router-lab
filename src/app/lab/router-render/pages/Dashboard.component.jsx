import React, { useState } from "react";
import { useEffect } from "react";

const Dashboard = ({ fetchDashboard }) => {
	const content = "Loading";

	const [name, setName] = useState("null");
	const [message, setMessage] = useState("null");
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(true);
	const [loadingText, setLoadingText] = useState(content);

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

	useEffect(() => {
		if (loading) {
			const id = setInterval(() => {
				setLoadingText((text) => {
					console.log(text);
					console.log(content);

					if (text === `${content}...`) {
						return content;
					} else {
						return `${text}.`;
					}
					//return content === `${name}...` ? name : `${content}.`;
				});
			}, 300);

			return () => clearInterval(id);
		}
	}, [content, loading]);

	if (error) {
		return <p>{error}</p>;
	}

	if (loading) {
		return (
			<div className="loading">
				<p className="loading-title">{loadingText}</p>
			</div>
		);
	}

	return (
		<div>
			<h1>{name}</h1>
			<p>{message}</p>
		</div>
	);
};

export default Dashboard;
