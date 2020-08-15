import React, { useRef, useState, useEffect, useReducer } from "react";
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

const useTimer = ({
	type = "hours",
	dependancy = null,
	speed = 1000,
	name = "clearSeconds",
}) => {
	const [timer, setTimer] = useState(0);
	const id = useRef();
	const clearTimer = () => clearInterval(id.current);

	useEffect(() => {
		if (dependancy) {
			id.current = setInterval(() => {
				if (type === "hours") {
					return setTimer((t) => (t = t + 1));
				} else if (type === "minutes" || type === "seconds") {
					return setTimer((t) => {
						if (t === 59) {
							setTimer(0);
						}
						return (t = t + 1);
					});
				} else {
					throw new Error("Timer cannot be recognized");
				}
			}, speed);
			return clearTimer;
		}
	}, [dependancy, speed, type]);

	const setName = `set${type}`;
	return {
		[name]: clearTimer,
		[type]: timer,
		[setName]: setTimer,
	};
};

const timerReducer = (state, action) => {
	switch (action.type) {
		case "PLAY_TIMER":
			return {
				...state,
				reset: true,
				play: true,
			};

		case "PAUSE_TIMER":
			return {
				...state,
				reset: true,
				play: false,
			};

		case "RESET_TIMER":
			return {
				...state,
				reset: false,
				play: false,
			};

		default:
			throw new Error("Cannot recognize the declared type.");
	}
};

const timerReducerIntialState = {
	play: false,
	reset: false,
};

const Timer = ({ display }) => {
	const location = useLocation();

	/**
	 * Testing what happens to the id when we get it from
	 * use refs
	 * ## Targets
	 * 	1. Goal increment number by one every second
	 *  2. reset the counter
	 * 	3. Pause the counter
	 * --------------------------------------------------
	 * Activity Tracker App with Statistics of time spent on activities
	 * ## Additional efforts
	 *  # Make a stop watch acounting for
	 * 	  1. Seconds
	 * 		2. Minutes
	 * 		3. Hours
	 * 	# Add a tag of the activity
	 * 		1. Save the tag alongside with the timer (HH:MM:SS)
	 *
	 * 	# Follow the track of time spent
	 *  # Add multiple timers for different activities
	 */
	/**
	 *
	 * 1. On load page the counter should not count immediately
	 *  #state
	 *  - Play is false
	 * 	- reset is false
	 *
	 *  #UI
	 * 	- Play shows
	 * 	- pause and reset hides
	 *
	 * 2. on click Reset
	 * 	# state
	 * 	- play is false
	 *  - reset is true
	 *  - clearSeconds and rests it to null
	 *
	 *  #UI || UI same as load state
	 * 	- display play
	 * 	- reset & Pause is hidden
	 *
	 * 3. on Click Pause
	 * 	# state
	 * 	- play is false
	 * 	- reset is true
	 *
	 *  #UI
	 * 	- pause shows
	 * 	- reset hidden
	 *
	 * 4. on Click play
	 * 	# State
	 * 	- play is true
	 * 	- reset is true
	 *
	 *  # UI
	 * 	- pause shows
	 * 	- reset shows
	 * 	- Play is hidden
	 *
	 *  #Extending functionality
	 *  - seconds - minutes - hours
	 *  # every 60 seconds -> increase a minute
	 *  # every 3600 seconds -> increse hours || every 60 minutes -> increase hours
	 * 	## State
	 *  - minutes
	 * 	- seconds
	 *  - hours
	 *
	 */

	//handle play && reset
	const [state, dispatch] = useReducer(timerReducer, timerReducerIntialState);
	const { play, reset } = state;

	//handle timers
	const { minutes, clearMinutes, setminutes } = useTimer({
		dependancy: play,
		type: "minutes",
		name: "clearMinutes",
		speed: 60000,
	});

	const { hours, clearHours, sethours } = useTimer({
		type: "hours",
		dependancy: play,
		name: "clearHours",
		speed: 3600000,
	});

	const { seconds, clearSeconds, setseconds } = useTimer({
		type: "seconds",
		dependancy: play,
	});

	const handlePlayOrPause = () => {
		if (play) {
			dispatch({ type: "PAUSE_TIMER" });
			clearSeconds();
			clearMinutes();
			clearHours();
		} else if (!play) {
			dispatch({ type: "PLAY_TIMER" });
		}
	};

	const handleReset = () => {
		dispatch({ type: "RESET_TIMER" });
		clearSeconds();
		setseconds(0);
		clearMinutes();
		minutes > 0 && setminutes(0);
		clearHours();
		hours > 0 && sethours(0);
	};

	const setDisplay = display ? "block" : "none";
	return (
		<div
			style={{
				display: setDisplay,
			}}
		>
			<div
				style={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					flexFlow: "nowrap column",
					backgroundColor: "#01324c",
					color: "#fff",
					padding: "1rem 1.5rem",
					minWidth: "10rem",
					borderRadius: "2px",
					boxShadow: "-1px 2px 6px 0px rgba(0, 0, 0, 0.5)",
					position: "absolute",
					top: "2.4rem",
					right: 0,
					zIndex: 1020,
				}}
			>
				<p
					style={{
						margin: "0 -2rem 1rem",
						padding: "0.4rem",
						borderBottom: "1px solid #285265",
						textShadow: "0 2px 1px rgba(0, 0, 0, 0.25)",
						fontSize: "1.2rem",
						fontWeight: 700,
					}}
				>
					Time Lapse
				</p>
				<p>
					{hours === 0 ? "00" : hours > 9 ? hours : `0${hours}`} :{" "}
					{minutes === 0 ? "00" : minutes > 9 ? minutes : `0${minutes}`} : {""}
					{seconds === 0 ? "00" : seconds > 9 ? seconds : `0${seconds}`}
				</p>

				<div
					style={{
						display: "flex",
					}}
				>
					{reset && (
						<button
							style={{
								margin: "0.5rem",
							}}
							onClick={handleReset}
						>
							Reset
						</button>
					)}
					<button
						style={{
							margin: "0.5rem",
						}}
						onClick={handlePlayOrPause}
					>
						{play ? "Pause" : "Play"}{" "}
					</button>
				</div>
			</div>
		</div>
	);
};

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

				<Timer display={timer} />
			</div>
		</Router>
	);
};

export default LinkTo;
