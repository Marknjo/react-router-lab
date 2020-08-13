import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Dashboard from "./pages/Dashboard.component";
import { fetchDashboard } from "../../store/apis/routerRenderApi";

const routes = [
	{
		path: "/dashboard",
		component: Dashboard,
		fetchDashboard,
		to: "Dashboard",
	},
];

const RouterRender = () => {
	return (
		<Router>
			<h1>React Render Method</h1>
			<ul className="nav">
				<li className="nav-items">
					<Link to="/dashboard" className="nav-links">
						Dashboard
					</Link>
				</li>
			</ul>

			{routes.map(({ to, path, component: C, fetchDashboard }) => {
				return (
					<Route
						key={to}
						path={path}
						render={() => <C fetchDashboard={fetchDashboard} />}
					/>
				);
			})}
		</Router>
	);
};

export default RouterRender;
