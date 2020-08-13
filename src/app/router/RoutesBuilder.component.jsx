import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import NavLinksGenerator from "./NavLinksGenerator.component";
import NavRoutesGenerator from "./NavRoutesGenerator";

const RoutesBuilder = () => {
	return (
		<Router>
			<NavLinksGenerator />
			<NavRoutesGenerator />
		</Router>
	);
};

export default RoutesBuilder;
