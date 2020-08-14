export const fetchSettings = () => {
	const data = {
		name: "Settings",
		message: "Successfully Fetched Settings Data",
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
		message: "Successfully Fetched Dashboard Data",
	};

	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve(data);
		}, 6000);
		return;
	});
};
