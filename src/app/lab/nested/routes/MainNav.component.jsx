import React from "react";
import { Link } from "react-router-dom";

const MainNav = () => (
	<ul className="nav">
		<li className="nav-items">
			<Link to="/" className="nav-links">
				Home
			</Link>
		</li>
		<li className="nav-items">
			<Link to="/topics" className="nav-links">
				Topics
			</Link>
		</li>
	</ul>
);

export default MainNav;
