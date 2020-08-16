import React from 'react'
import { 
  BrowserRouter as Router, 
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
				<p>Home Page </p>
			</>
		),
		main: () => <h1>Home</h1>,
	},
	{
		path: "/bubblegum",
		sidebar: () => (
			<>
				<p>Bubblegum Page </p>
			</>
		),
		main: () => <h1>Bubblegum</h1>,
	},
	{
		path: "/shoelaces",
		sidebar: () => (
			<>
				<p>Shoelaces Page </p>
			</>
		),
		main: () => <h1>Shoelaces</h1>,
	},
];

const Navs = () => {
  return (
		<nav className="s-nav-main">
			<ul className="s-nav">
				<li className="s-nav__item">
					<NavLink
						className="s-nav--link"
						to="/"
						activeClassName="s-nav--active"
						exact
					>
						Home
					</NavLink>
				</li>
				<li className="s-nav__item">
					<NavLink
						className="s-nav--link"
						to="/bubblegum"
						activeClassName="s-nav--active"
					>
						Bubblegum
					</NavLink>
				</li>
				<li className="s-nav__item">
					<NavLink
						className="s-nav--link"
						to="/shoelaces"
						activeClassName="s-nav--active"
					>
						Shoelaces
					</NavLink>
				</li>
			</ul>

      

		</nav>
	);
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
							<Switch>
								{routes.map((route) => {
									return (
										<Route
											key={route.path}
											path={route.path}
											exact={route.exact}
											component={route.sidebar}
										/>
									);
								})}
							</Switch>
						</div>
					</div>
					<div className="sidebar-content">
						<Navs />
					</div>
				</aside>
				<div className="content-container">
					<header className="content-container__header"></header>
					<section className="content-container__main">
						<Switch>
							{routes.map((route) => {
								return (
									<Route
										key={route.path}
										path={route.path}
										exact={route.exact}
										component={route.main}
									/>
								);
							})}
						</Switch>
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