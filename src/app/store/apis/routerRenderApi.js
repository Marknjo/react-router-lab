export const fetSettings = () => {
	const data = {
		name: "Settings",
		message: "SUccessfully Fetched Settings Data",
	};

	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve(data);
		}, 2000);
	});
};

export const fetchDashboard = () => {
	const data = {
		name: "Dashboard",
		message: "SUccessfully Fetched Dashboard Data",
	};

	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve(data);
		}, 6000);
		return;
	});
};
