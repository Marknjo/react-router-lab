import React from "react";
import PageNotFound from "../pages/PageNotFound.componet";

const Resource = ({ resources, match }) => {
	const subResource = resources.find(
		({ id }) => match.params.resourceId === id
	);

	if (!subResource) {
		/* return (
			<Redirect
				push
				to={`/${match.url.split("/")[1]}/${match.url.split("/")[2]}`}
			/>
    ); */
		return <PageNotFound />;
	}

	const { name, description, url } = subResource;

	return (
		<div>
			<h3>{name}</h3>
			<p>{description}</p>
			<a href={url} target="_blank">
				{name}
			</a>
		</div>
	);
};

export default Resource;
