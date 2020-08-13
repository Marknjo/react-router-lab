import React, { useState, useEffect } from "react";

const Loading = ({ content = "Loading", speed = 300 }) => {
	const [loadingContent, setLoadingContent] = useState(content);

	useEffect(() => {
		const id = setInterval(() => {
			setLoadingContent((text) =>
				text === `${content}...` ? content : `${text}.`
			);
		}, speed);

		return () => clearInterval(id);
	}, [content, speed]);

	return (
		<div className="loading">
			<p className="loading-title">{loadingContent}</p>
		</div>
	);
};

export default Loading;
