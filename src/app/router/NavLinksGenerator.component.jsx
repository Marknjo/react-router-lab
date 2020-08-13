import React from "react";
import { Link } from "react-router-dom";
import routesMap from "./routesMap";

const NavLinksGenerator = () => (
	<ul className="nav">
		{routesMap.map(({ path: to, label }) => (
			<li key={label} className="nav-items">
				<Link to={to} className="nav-links">
					{label}
				</Link>
			</li>
		))}
	</ul>
);

export default NavLinksGenerator;
