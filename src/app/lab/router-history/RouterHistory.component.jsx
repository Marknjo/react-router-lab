import React, { useEffect, useState } from "react";
import {
	BrowserRouter as Router,
	useHistory,
	Route,
	Switch,
	Link,
} from "react-router-dom";

const CheckAuthenticationStatus = ({ text = "Checking", speed = 300 }) => {
	const [content, setContent] = useState(text);
	useEffect(() => {
		const id = setInterval(() => {
			setContent((t) => (t === `${text}...` ? text : `${t}.`));
		}, speed);

		return () => clearInterval(id);
	}, [text, speed]);

	return (
		<div style={{ paddingTop: "1.6rem" }}>
			<h1> {content} </h1>
		</div>
	);
};

const FreeResources = () => {
	return (
		<div style={{ paddingTop: "1.6rem" }}>
			<h1>Free Content</h1>
			<p>You are viewing this page because you are not authenticated.</p>
			<Link to="/">Dashboard</Link>
		</div>
	);
};

const PermissionDenied = () => {
	const history = useHistory();

	useEffect(() => {
		const timmerId = setTimeout(() => {
			history.push("/free-resources");
		}, 1000);

		return () => {
			clearTimeout(timmerId);
		};
	}, [history]);

	return (
		<div>
			<h1>You do not have previllages to access this page.</h1>
		</div>
	);
};

const Dashboard = ({ authenticated }) => {
	const [checkAuthentication, setCheckAuthentication] = useState(false);

	const history = useHistory();

	useEffect(() => {
		const timmerId = setTimeout(() => {
			if (authenticated) {
				setCheckAuthentication(true);
			} else {
				history.push("/denied");
				setCheckAuthentication(false);
			}
		}, 6000);

		return () => {
			clearTimeout(timmerId);
		};
	}, [authenticated, history]);

	if (!checkAuthentication) {
		return (
			<CheckAuthenticationStatus text={"Checking your authentication status"} />
		);
	}

	return (
		<div style={{ paddingTop: "1.6rem" }}>
			<h1> Router History Lab </h1>
			<p>You have access to the dashboard</p>
		</div>
	);
};

const RouterHistory = () => {
	const authenticated = false;

	return (
		<Router>
			<Switch>
				<Route
					exact
					path="/"
					render={() => {
						return <Dashboard authenticated={authenticated} />;
					}}
				/>
				<Route path="/denied" component={PermissionDenied} />

				<Route path="/free-resources" component={FreeResources} />

				<Route
					path="*"
					component={() => {
						return (
							<div style={{ paddingTop: "1.6rem" }}>
								<h1> 404 Page Not Found </h1>
								<p>You do not have permission to access this page</p>
								<Link to="/">Dashboard</Link>
							</div>
						);
					}}
				/>
			</Switch>
		</Router>
	);
};

export default RouterHistory;
