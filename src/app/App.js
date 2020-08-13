import React from "react";

import "normalize.css";
import "./styles/App.css";
import Nesting from "./lab/nested/Nesting.component";

const App = () => (
	<div className="container">
		<Nesting />
	</div>
);

export default App;
