import { Link } from "react-router-dom";
import "./cartInfo.css";
import { FaCartShopping } from "react-icons/fa6";
import { useEffect, useState } from "react";

function CartInfo() {

		const roomLocalStorageData =
			JSON.parse(localStorage.getItem("roomCart")) || [];
		const foodLocalStorageData =
			JSON.parse(localStorage.getItem("foodCart")) || [];
		const [cartLength, setCartLength] = useState(null);
	
		useEffect(() => {
			setCartLength(roomLocalStorageData.length + foodLocalStorageData.length);
		});



	return (
		<Link to="/aseman-hotel/cart" className="cart-btn">
		<FaCartShopping className="icon icon-btn cart-icon" />
		<div className="cart-branch">{cartLength}</div>
	</Link>
	)
}

export default CartInfo