import React, { useState, useRef, useEffect, useReducer } from 'react'

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

export default Timer;