import React from 'react'
import { useLocation } from 'react-router-dom';
import {Link} from 'react-router-dom'

const Home = () => {
	return (
		<div
			style={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				flexFlow: "nowrap column",
				position: "relative",
			}}
		>
			<h1>Home Page</h1>
		</div>
	);
};

const About = () => {
	return (
		<div
			style={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				flexFlow: "nowrap column",
				position: "relative",
			}}
		>
			<h1>About Page</h1>
		</div>
	);
};

const Contact = () => {
	return (
		<div
			style={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				flexFlow: "nowrap column",
				position: "relative",
			}}
		>
			<h1>Get in Touch With Our Team</h1>
		</div>
	);
};


const Page404 = () => {
  const {pathname} = useLocation();

  return (
		<div
			style={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				flexFlow: "nowrap column",
			}}
		>
			<h1>
				404 Page{" "}
				<span role="img" aria-label="explode">
					&#127880;
				</span>
			</h1>
			<p>
				Oops, it seems like we cannot find this path <code>{pathname}</code> in our
				resources.
			</p>
			<p>Do you want us to take you to our home Page?</p>
			<p>
				<Link to="/" className="nav-links">
					Home Page
				</Link>
			</p>
		</div>
	);
};


export { Home, About, Contact, Page404 };