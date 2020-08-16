import React from 'react'
import { 
  BrowserRouter as Router, 
  Link, 
  Switch, 
  Route 
} from 'react-router-dom'


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
    <div className="content">
      <div className="nav-top">
          <p>Sidebar Header</p>
      </div>
      <div className="nav-bar">
        <p>Sidebar</p>
      </div>
      <div className="content">
        <p>Content</p>
      </div>
      <div className="footer">
        <p>Footer Area</p>
      </div>
    </div>
  )
}

export default Sidebar;