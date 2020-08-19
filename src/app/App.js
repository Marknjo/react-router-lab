import React from "react";

import "normalize.css";
import "./styles/App.css";
import RouterChildren from "./lab/router-children/RouterChildren.component";

const App = () => (
	<div className="container">
		<div className="content">
			<RouterChildren />
		</div>
	</div>
);

export default App;
