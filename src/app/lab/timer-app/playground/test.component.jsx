import React, { useRef, useState, useEffect, useReducer, useMemo } from "react";




const useTimer = (play) => {

	const lapseId = useRef(null);
	const secsId = useRef(null);
	const minsId = useRef(null);
	const hrsId = useRef(null);

	const [lapse, setLapse] = useState(0);
	const [seconds, setSeconds] = useState(0);
	const [minutes, setMinutes] = useState(0);
	const [hours, setHours] = useState(0);

	const clearLapse = () => clearInterval(lapseId.current);
	const clearSeconds = () => clearInterval(secsId.current);
	const clearMinutes = () => clearInterval(minsId.current);
	const clearHours = () => clearInterval(hrsId.current);

	useEffect(() => {
		if(play) {
			lapseId.current = setInterval(() => {
				setLapse((l) => {
				if (l === 29) {
					setLapse(0);

				}
				return l + 1;
			});
		}, 10);

		return clearLapse;
		}
	}, [play]);
	
	useEffect(() => {
		if(play) {
			secsId.current = setInterval(() => {
			setSeconds((s) => {
				if (s === 59) {
					setSeconds(0);
				}
				return s + 1;
			});
		}, 1000);

		return clearSeconds;
		}
	}, [play]);

	useEffect(() => {
		if(play) {
			minsId.current = setInterval(() => {
			setMinutes((m) => {
				if (m === 59) {
					setMinutes(0);
				}
				return m + 1;
			});
		}, 60000);

		return clearMinutes;
		}
	}, [play]);

	useEffect(() => {
		if(play) {
			hrsId.current = setInterval(() => {
			setHours((h) => {
				return h + 1;
			});
		}, 3600000);

		return clearMinutes;
		}
	}, [play]);

	return {
		lapse: useMemo(() => lapse, [lapse]),
		seconds: useMemo(() => seconds, [seconds]),
		minutes,
		hours,
		clearLapse,
		clearSeconds,
		clearMinutes,
		clearHours,
		setLapse,
		setSeconds,
		setMinutes,
		setHours
	}
}

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

const TimerV1 = ({ display }) => {
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
	const {
		lapse,
		seconds,
		minutes,
		hours,
		clearLapse,
		clearSeconds,
		clearMinutes,
		clearHours,
		setLapse,
		setSeconds,
		setMinutes,
		setHours
	} = useTimer(play);

	

	const handlePlayOrPause = () => {
		if (play) {
			dispatch({ type: "PAUSE_TIMER" });

			clearLapse()
			clearSeconds();
			clearMinutes();
			clearHours();
		} else if (!play) {
			dispatch({ type: "PLAY_TIMER" });
		}
	};

	const handleReset = () => {
		dispatch({ type: "RESET_TIMER" });

		setLapse(0)
		setSeconds(0);
		minutes > 0 && setMinutes(0);
		hours > 0 && setHours(0);

		clearSeconds();
		clearMinutes();
		clearHours();
		clearLapse()
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

					<small>{lapse === 0 ? "00" : lapse > 9 ? lapse : `0${lapse}`}</small>
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



export default TimerV1;
