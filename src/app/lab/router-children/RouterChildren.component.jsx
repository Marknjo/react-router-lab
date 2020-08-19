import React from 'react'
import {BrowserRouter as Router, Link, Switch, Route} from "react-router-dom"

const About = () => (
	<div className="verticle-center-content">
		<h1>About Page</h1>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores, asperiores soluta. Veritatis quas neque iusto necessitatibus dignissimos facere iste porro.</p>
	</div>
);

const Home = () => (
  <div className="verticle-center-content">
		<h1>Home Page</h1>
    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Id, sapiente recusandae nesciunt voluptatibus nam perferendis eligendi alias iusto rerum. Maxime!</p>
	</div>
);

const Page404 = () => (
  <div className="verticle-center-content">
		<h1>404 </h1>
    <p>Page that you are looking cannot be found.</p>

    <p><Link to="/" className="nav-links">Go back home</Link></p>
	</div>
);

const RouterChildren = () => {
  return (
    <Router>
      <ul className="nav">
        <li className="nav-items">
          <Link to="/" className="nav-links">Home</Link>
        </li>
        <li className="nav-items">
          <Link to="/about" className="nav-links">About</Link>
        </li>
      </ul>

      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="*" component={Page404} />

      </Switch>
    </Router>
  )
}

export default RouterChildren

