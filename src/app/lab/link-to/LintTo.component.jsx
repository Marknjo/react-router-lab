import React, { useRef, useState, useEffect} from "react";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	useHistory,
	Link,
	useLocation,
} from "react-router-dom";
import queryString from "query-string";

/**
 * Query String Route - handles the routing
 * A serach component to display search query
 * A simple form
 *  - category
 *  - keyword
 *  - phrase
 *
 */

const BlogSearchFilter = () => {
	const labelStyles = {
		padding: "0.2rem",
		marginTop: "0.5rem",
		display: "flex",
		flexFlow: "nowrap column",
	};
	const labelNameStyles = {
		color: "#306279",
		display: "inline-block",
		fontWeight: "bold",
		fontSize: "0.8rem",
		marginBottom: "0.25rem",
	};
	const displayContainerStyles = {
		display: "flex",
		flexFlow: "nowrap column",
		marginTop: "1.5rem",
		padding: "1.5rem",
		boxShadow: "0 2px 15px 5px rgba(0,0,0, 0.25)",
		minWidth: "22rem",
	};
	const displayElementLabelStyles = {
		color: "#cacaca",
		fontWeight: "bold",
		textShadow: "0 2px 1px rgba(0, 0, 0, 0.25)",
		display: "inline-block",
		padding: "0 1rem",
	};

	const history = useHistory();
	const { search } = useLocation();

	const [searchStatus, setSearchStatus] = useState(false);

	const phraseRef = useRef("");
	const keywordRef = useRef("");
	const categoryRef = useRef("");

	const [queryPhrase, setQueryPhrase] = useState(null);
	const [queryKeyword, setQueryKeyword] = useState(null);
	const [queryCategory, setQueryCategory] = useState(null);
	const [error, setError] = useState(null);

	const handleSerchSubmit = () => {
		const phrase = phraseRef.current.value;
		const keyword = keywordRef.current.value;
		const category = categoryRef.current.value;

		let query = {};

		if (phrase) query = { ...query, phrase };
		if (keyword) query = { ...query, keyword };
		if (category) query = { ...query, category };

		const string = queryString.stringify(query);

		if (phrase || keyword || category) {
			history.push(`/search/?${string}`);
			//clear the values
			if (phrase) query = phraseRef.current.value = "";
			if (keyword) query = keywordRef.current.value = "";
			if (category) query = categoryRef.current.value = "";

			//split the query parameters and set them
			setSearchStatus(true);
			//set search to true
		} else {
			setError(
				"Empty search parameters not allowed.  Kindly ensure to submit your search with at least one value filled."
			);
		}
	};

	useEffect(() => {
		const url = queryString.parse(search);
		url.phrase && setQueryPhrase(url.phrase);
		url.keyword && setQueryKeyword(url.keyword);
		url.category && setQueryCategory(url.category);
	}, [search]);

	return (
		<div
			style={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				flexFlow: "nowrap column",
			}}
		>
			<div style={displayContainerStyles}>
				{error ? (
					<>
						<h2> Error </h2>
						<p>{error}</p>
						<button
							style={{
								padding: "0.5rem",
								marginTop: "1rem",
							}}
							onClick={() => setError(null)}
						>
							Go back to search
						</button>
					</>
				) : (
					<>
						<h1
							style={{
								color: "#306279",
								paddingBottom: "0.5rem",
								borderBottom: "1px solid #ccc",
								textShadow: "0 2px 1px rgba(0, 0, 0, 0.25)",
								marginBottom: "0.5rem",
							}}
						>
							Search Parameters
						</h1>
						<label htmlFor="earch-phrase" style={labelStyles}>
							<span style={labelNameStyles}>Search Phrase</span>
							<input
								type="text"
								name="phrase"
								id="search-phrase"
								ref={phraseRef}
							/>
						</label>
						<label htmlFor="search-keyword" style={labelStyles}>
							<span style={labelNameStyles}>Search keyword</span>
							<input
								type="text"
								name="keyword"
								id="search-keyword"
								ref={keywordRef}
							/>
						</label>
						<label htmlFor="search-category" style={labelStyles}>
							<span style={labelNameStyles}>Search Category</span>
							<input
								type="text"
								name="category"
								id="search-category"
								ref={categoryRef}
							/>
						</label>
						<button
							style={{
								padding: "0.5rem",
								marginTop: "1rem",
							}}
							onClick={handleSerchSubmit}
						>
							Search
						</button>

						{search && (
							<button
								style={{
									padding: "0.5rem",
									marginTop: "1rem",
								}}
								onClick={() => {
									setSearchStatus(false);
									setQueryPhrase(null);
									setQueryKeyword(null);
									setQueryCategory(null);
									history.push("/search");
								}}
							>
								Clear Search Queries
							</button>
						)}
					</>
				)}
			</div>

			{searchStatus && (
				<div
					style={{
						...displayContainerStyles,
						backgroundColor: "#306279",
						marginTop: "2.5rem",
						color: "#ccc",
					}}
				>
					<h2
						style={{
							paddingBottom: "0.83rem",
							borderBottom: "4px solid #285265",
							textShadow: "0 2px 1px rgba(0, 0, 0, 0.25)",
						}}
					>
						Query Search Parameters
					</h2>
					<p>
						<span style={displayElementLabelStyles}>Query: </span>
						<code>{search}</code>
					</p>
					{queryPhrase && (
						<p>
							<span style={displayElementLabelStyles}>Phrase: </span>
							{queryPhrase}
						</p>
					)}
					{queryKeyword && (
						<p>
							<span style={displayElementLabelStyles}>Keyword: </span>
							{queryKeyword}
						</p>
					)}
					{queryCategory && (
						<p>
							<span style={displayElementLabelStyles}>Category: </span>
							{queryCategory}
						</p>
					)}
				</div>
			)}
		</div>
	);
};

const Page404 = () => (
	<div
		style={{
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
			flexFlow: "nowrap column",
		}}
	>
		<h1>404 Page Not Found</h1>
	</div>
);




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

const LinkTo = () => {
	const [timer, setTimer] = useState(false);
	//const setDisplay = timer ? "block" : "none";

	const toggleTimer = () => setTimer(!timer);

	return (
		<Router>
			<div style={{ position: "relative" }}>
				<ul
					className="nav"
					style={{
						paddingBottom: "0.3rem",
						paddingTop: "0.3rem",
						display: "flex",
					}}
				>
					<li className="nav-items">
						<Link className="nav-links" to="/">
							Home
						</Link>
					</li>
					<li className="nav-items">
						<Link className="nav-links" to="/search">
							Search
						</Link>
					</li>

					<li
						className="nav-items"
						style={{
							marginLeft: "auto",
						}}
					>
						<Link
							to={{
								pathname: "",
								state: {
									timer,
								},
							}}
							className="nav-links"
							onClick={toggleTimer}
							style={{
								fontSize: "0.9rem",
								border: "1px solid #01574b",
								marginTop: "0.2rem",
								paddingTop: "2px",
								paddingBottom: "2px",
							}}
						>
							{timer ? "Hide Timer" : "Show Timer"}
						</Link>
					</li>
				</ul>
				<Switch>
					<Route exact path="/" component={Home} />
					<Route path="/search" component={BlogSearchFilter} />
					<Route path="*" component={Page404} />
				</Switch>

			</div>
		</Router>
	);
};

export default LinkTo;
