import React from "react";
import { Route } from "react-router-dom";
import routesMap from "./routesMap";

const NavRoutesGenerator = () =>
	routesMap.map(({ label, path, component: C, fetchInitialData }) => {
		return (
			<Route
				key={label}
				path={path}
				render={() => <C fetchInitialData={fetchInitialData} />}
			/>
		);
	});

export default NavRoutesGenerator;
