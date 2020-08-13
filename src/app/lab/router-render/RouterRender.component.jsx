import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Dashboard from "./pages/Dashboard.component";
import {
	fetchDashboard,
	fetchSettings,
} from "../../store/apis/routerRenderApi";
import Settings from "./pages/Settings.component";

const routes = [
	{
		path: "/dashboard",
		component: Dashboard,
		fetchInitialData: fetchDashboard,
		label: "Dashboard",
	},

	{
		path: "/settings",
		component: Settings,
		fetchInitialData: fetchSettings,
		label: "Settings",
	},
];

const RouterRender = () => {
	return (
		<Router>
			<h1>React Render Method</h1>
			<ul className="nav">
				{routes.map(({ path: to, label }) => (
					<li key={label} className="nav-items">
						<Link to={to} className="nav-links">
							{label}
						</Link>
					</li>
				))}
			</ul>

			{routes.map(({ label, path, component: C, fetchInitialData }) => {
				return (
					<Route
						key={label}
						path={path}
						render={() => <C fetchInitialData={fetchInitialData} />}
					/>
				);
			})}
		</Router>
	);
};

export default RouterRender;
