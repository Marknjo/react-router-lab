import React from "react";

import "normalize.css";
import "./styles/App.css";
import RoutesBuilder from "./router/RoutesBuilder.component";

const App = () => (
	<div className="container">
		<RoutesBuilder />
		<h1>React Hooks Lab</h1>
	</div>
);

export default App;
