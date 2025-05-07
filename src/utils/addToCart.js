export const addToRoomCart = (product) => {
	const localStorageData = JSON.parse(localStorage.getItem("roomCart")) || [];
	const newLocalStorageData = [...localStorageData, product];
	localStorage.setItem("roomCart", JSON.stringify(newLocalStorageData));
	// setFlag((prev) => !prev);
};