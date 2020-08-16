import React from 'react'
import { 
  BrowserRouter as Router, 
  Link, 
  Switch, 
  Route, 
  NavLink
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
		path: "/shoelaces",
		sidebar: () => (
			<>
				<h1>Shoelaces Page </h1>
			</>
		),
		main: () => <h2>Shoelaces</h2>,
	},
];

const Navs = () => {
  return (
    <nav className="s-nav-main">
      <ul className="s-nav">
        <li className="s-nav__item"><NavLink className="s-nav--link" to="/">Home</NavLink></li>
        <li className="s-nav__item"><NavLink className="s-nav--link" to="/bubblegum">Bubblegum</NavLink></li>
        <li className="s-nav__item"><NavLink className="s-nav--link" to="/shoelaces"></NavLink>Shoelaces</li>
      </ul>
    </nav>
  )
}

export const Sidebar = () => {
  return (
		<Router>
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
						<Navs />
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
							<span>Footer Area</span> <small>Copyright</small>
						</p>
					</div>
				</footer>
			</div>
		</Router>
	);
}

export default Sidebar;