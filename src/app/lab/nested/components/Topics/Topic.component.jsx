import React from "react";
import PageNotFound from "../pages/PageNotFound.componet";
import { Link, Route } from "react-router-dom";
import Resource from "./Resource.component";
import topics from "../../../../store/data/topics";

const Topic = ({ match }) => {
	const subTopics = topics.find(({ id }) => id === match.params.topicId);

	if (!subTopics) {
		//return <Redirect push to={`/${match.url.split("/")[1]}`} />;
		return <PageNotFound />;
	}

	const { resources, name, description } = subTopics;

	return (
		<div>
			<h2>{name}</h2>
			<p>{description}</p>
			<ul>
				{resources.map(({ name, id }) => {
					return (
						<li key={id}>
							<Link to={`${match.url}/${id}`}>{name}</Link>
						</li>
					);
				})}
			</ul>

			<Route
				path={`${match.path}/:resourceId`}
				render={(props) => <Resource {...props} resources={resources} />}
			/>
		</div>
	);
};

export default Topic;
