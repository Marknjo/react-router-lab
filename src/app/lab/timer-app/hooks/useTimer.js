const { useState, useRef, useEffect, useMemo } = require("react");


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
					return setTimer((t) => (t + 1));
				} else if (type === "minutes" || type === "seconds") {
					return setTimer((t) => {
            t = t + 1;
						if (t === 60) {
							setTimer(0);
						}
						return t;
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
		[type]: useMemo(() => timer, [timer]),
		[setName]: setTimer,
	};
};

export default useTimer