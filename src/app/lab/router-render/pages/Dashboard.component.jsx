import React, { useReducer } from "react";
import { useEffect } from "react";
import Loading from "../../../helpers/Loading.component";

const dashboardReducer = (state, action) => {
	switch (action.type) {
		case "SUCCESSFULLY_FETCHED_DASHBOARD":
			return {
				...state,
				loading: false,
				error: null,
				name: action.payload.name,
				message: action.payload.message,
			};

		case "DASHBOARD_FETCH_ERROR":
			return {
				...state,
				loading: false,
				error: action.payload.error,
			};

		default:
			throw new Error("Error: Supplied action type not known");
	}
};

const initState = {
	name: "",
	message: "",
	error: null,
	loading: true,
};

const Dashboard = ({ fetchInitialData }) => {
	const [state, dispatch] = useReducer(dashboardReducer, initState);

	const { name, message, error, loading } = state;

	useEffect(() => {
		const unSub = fetchInitialData()
			.then(({ name, message }) => {
				dispatch({
					type: "SUCCESSFULLY_FETCHED_DASHBOARD",
					payload: {
						message,
						name,
					},
				});
			})
			.catch((error) => {
				console.warn(error);
				dispatch({
					type: "DASHBOARD_FETCH_ERROR",
					error: error.message,
				});
			});

		return () => window.clearTimeout(unSub);
	}, [fetchInitialData]);

	if (error) {
		return <p>{error}</p>;
	}

	if (loading) {
		return <Loading content="Dashboard" />;
	}

	return (
		<div>
			<h1>{name}</h1>
			<p>{message}</p>
		</div>
	);
};

export default Dashboard;
