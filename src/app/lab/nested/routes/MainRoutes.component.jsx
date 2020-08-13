import React from "react";
import { Switch, Route } from "react-router-dom";
import HomePage from "../components/pages/HomePage.component";

import Topics from "../components/Topics/Topics.component";
import PageNotFound from "../components/pages/PageNotFound.componet";

const MainRoutes = () => (
	<Switch>
		<Route exact path="/" component={HomePage} />
		<Route path="/topics" component={Topics} />
		<Route path="*" component={PageNotFound} />
	</Switch>
);

export default MainRoutes;
