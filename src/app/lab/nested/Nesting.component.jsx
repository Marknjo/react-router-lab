import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import MainNav from "./routes/MainNav.component";
import MainRountes from "./routes/MainRoutes.component";

const Nesting = () => {
	return (
		<Router>
			<MainNav />
			<MainRountes />
		</Router>
	);
};

export default Nesting;
