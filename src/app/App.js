import React from "react";

import "normalize.css";
import "./styles/App.css";
import RouterHistory from "./store/lab/router-history/RouterHistory.component";

const App = () => (
	<div className="container">
		<RouterHistory />
	</div>
);

export default App;
