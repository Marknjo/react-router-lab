import React, { useState, } from "react";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
} from "react-router-dom";
import { Home, About, Contact, Page404 } from "./components/Pages.components";
import Timer from "./components/Timer.compoent";







const BaseRouter = () => {
	const [timer, setTimer] = useState(false);
	//const setDisplay = timer ? "block" : "none";

	const toggleTimer = () => setTimer(!timer);

	return (
		<Router>
			<div style={{ position: "relative" }}>
				<ul
					className="nav"
					style={{
						paddingBottom: "0.3rem",
						paddingTop: "0.3rem",
						display: "flex",
					}}
				>
					<li className="nav-items">
						<Link className="nav-links" to="/">
							Home
						</Link>
					</li>
					<li className="nav-items">
						<Link className="nav-links" to="/about">
							About
						</Link>
					</li>

					<li className="nav-items">
						<Link className="nav-links" to="/contact">
							Contact
						</Link>
					</li>

					<li
						className="nav-items"
						style={{
							marginLeft: "auto",
						}}
					>
						<Link
							to={{
								pathname: "",
								state: {
									timer,
								},
							}}
							className="nav-links"
							onClick={toggleTimer}
							style={{
								fontSize: "0.9rem",
								border: "1px solid #01574b",
								marginTop: "0.2rem",
								paddingTop: "2px",
								paddingBottom: "2px",
							}}
						>
							{timer ? "Hide Timer" : "Show Timer"}
						</Link>
					</li>
				</ul>
				<Switch>
					<Route exact path="/" component={Home} />
					<Route path="/About" component={About} />
					<Route path="/Contact" component={Contact} />
					<Route path="*" component={Page404} />
				</Switch>

				<Timer display={timer} />
			</div>
		</Router>
	);
};

export default BaseRouter;
