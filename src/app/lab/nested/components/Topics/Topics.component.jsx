import React from "react";
import topics from "../../../../store/data/topics";
import { Route, Link } from "react-router-dom";
import Topic from "./Topic.component";

const Topics = ({ match }) => {
	return (
		<section>
			<header>
				<h1>Topics</h1>
				<nav className="nav-topics">
					<ul>
						{topics.map(({ name, id }) => (
							<li key={id}>
								<Link to={`${match.url}/${id}`}>{name}</Link>
							</li>
						))}
					</ul>
				</nav>
			</header>
			<main>
				<Route path={`${match.path}/:topicId`} component={Topic} />
			</main>
		</section>
	);
};

export default Topics;
