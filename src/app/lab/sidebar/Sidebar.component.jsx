import React from 'react'
import { 
  BrowserRouter as Router, 
  Link, 
  Switch, 
  Route 
} from 'react-router-dom';




const routes = [
	{
		path: "/",
		exact: true,
		sidebar: () => (
			<>
				<h1>Home Page </h1>
			</>
		),
		main: () => <h2>Home</h2>,
	},
	{
		path: "/bubblegum",
		sidebar: () => (
			<>
				<h1>Bubblegum Page </h1>
			</>
		),
		main: () => <h2>Bubblegum</h2>,
	},
	{
		path: "/shoe-laces",
		sidebar: () => (
			<>
				<h1>Shoe Laces Page </h1>
			</>
		),
		main: () => <h2>Shoe Laces</h2>,
	},
];

export const Sidebar = () => {
  return (
		<div className="main-content">
			<aside className="sidebar">
				<div className="sidebar-header">
					<div className="sidebar-header__title">
						<p>Sidebar</p>
					</div>
					<div className="sidebar-header__content">
						<p>Content</p>
					</div>
				</div>
				<div className="sidebar-content">
					<p>Sidebar Links</p>
				</div>
			</aside>
			<div className="content-container">
				<header className="content-container__header">
					<p>Sidebar Header</p>
				</header>
				<section className="content-container__main">
					<p>Content</p>
				</section>
			</div>
			<footer className="footer">
				<div className="footer-content">
					<p>Content</p>
				</div>
				<div className="footer-copyright-info">
					<p>
						<span>Footer Area</span> {" "}
						<small>Copyright</small>
					</p>
				</div>
			</footer>
		</div>
	);
}

export default Sidebar;