import React from "react";

import "normalize.css";
import "./styles/App.css";
import QueryStringRoute from "./store/lab/query-strings/QueryStrings.component";

const App = () => (
	<div className="container">
		<QueryStringRoute />
	</div>
);

export default App;
