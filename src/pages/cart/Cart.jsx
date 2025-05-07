import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ContextData } from "../../contexts/ContextData";
import Pagination from "../../components/pagination/Pagination";
import { MdCancel } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import { BiDetail } from "react-icons/bi";
import PageHeader from "../../components/pageHeader/PageHeader";
import "./cart.css";

export default function Cart() {
  const ContextDatas = useContext(ContextData);
  const { removeFromRoomCart, removeFromFoodCart, reserveRoom, reserveFood } = ContextDatas;
	const navigate = useNavigate();
  const roomLocalStorageData = JSON.parse(localStorage.getItem("roomCart"));
  const foodLocalStorageData = JSON.parse(localStorage.getItem("foodCart"));

  const roomCartDeleteHandler = (cartItemInfo) => {
    removeFromRoomCart(cartItemInfo);
  };

	const foodCartDeleteHandler = (cartItemInfo) => {
    removeFromFoodCart(cartItemInfo);
  };

	const roomDetailHandler = (cartItemInfo) => {
    navigate(`/aseman-hotel/roomDetails/${cartItemInfo.roomID}`);
  };

	const foodDetailHandler = (cartItemInfo) => {
    navigate(`/aseman-hotel/foodDetails/${cartItemInfo.foodID}`);
  };

	const roomReserveHandler = (cartItemInfo) => {
		reserveRoom(cartItemInfo);
  };

	const foodReserveHandler = (cartItemInfo) => {
    reserveFood(cartItemInfo);
  };



  const roomTitle = [
    "عنوان",
    "شماره اتاق",
    "تعداد نفرات",
    "قیمت هر شب اقامت",
    "تاریخ ورود",
    "تاریخ خروج",
    "تعداد شبهای اقامت",
    "قیمت کل",
  ];

  let roomBody = [];
	let roomPhotoes = [];
  if (roomLocalStorageData) {
		roomLocalStorageData.forEach(item => {
			const {
				title,
				roomNumber,
				strength,
				PricePerDay,
				enterDate,
				exitDate,
				duration,
				totalPrice,
				images,
			} = item;
			let newItem = {
				tableData: [
					title,
					roomNumber,
					strength,
					`${PricePerDay.toLocaleString()} تومان`,
					enterDate,
					exitDate,
					`${duration.toLocaleString()} شب`,
					`${totalPrice.toLocaleString()} تومان`,
				],
				payload: item,
			};
			roomBody = [...roomBody, newItem];
			roomPhotoes = [...roomPhotoes, images];
		})
  }



  const roomActions = [
    {
      icon: <MdCancel />,
      tooltip: "ابطال سفارش",
      method: roomCartDeleteHandler,
      class: "btn-red",
    },
		{
      icon: <FaCheckCircle />,
      tooltip: "پرداخت و نهایی کردن سفارش",
      method: roomReserveHandler,
      class: "btn-green",
    },
    {
      icon: <BiDetail />,
      tooltip: "مشاهده جزئیات",
      method: roomDetailHandler,
      class: "btn-orange",
    },
  ];

	const foodTitle = [
		"تاریخ",
    "شماره اتاق",
    "عنوان",
    "تعداد",
    "قیمت",
  ];

  let foodBody = [];
	let foodPhotoes = [];
  if (foodLocalStorageData) {
		foodLocalStorageData.forEach(item => {
			const {
				date,
				roomNumber,
				title,
				quantity,
				price,
				images,
			} = item;

			let newItem = {
				tableData: [
					date,
					roomNumber,
					title,
					quantity,
					`${(price * quantity).toLocaleString()} تومان`
				],
				payload: item,
			};
			foodBody = [...foodBody, newItem];
			foodPhotoes = [...foodPhotoes, images];
		})
  }

	const foodActions = [
    {
      icon: <MdCancel />,
      tooltip: "ابطال سفارش",
      method: foodCartDeleteHandler,
      class: "btn-red",
    },
		{
      icon: <FaCheckCircle />,
      tooltip: "پرداخت و نهایی کردن سفارش",
      method: foodReserveHandler,
      class: "btn-green",
    },
    {
      icon: <BiDetail />,
      tooltip: "مشاهده جزئیات",
      method: foodDetailHandler,
      class: "btn-orange",
    },
  ];

  return (
		<>
		<PageHeader title="سفارشات موجود در سبد خرید: " />
    <div className="cart-wrapper">
      <div className="roomCart-wrapper">
        <Pagination title={roomTitle} body={roomBody} actions={roomActions}  photoes={roomPhotoes}/>
      </div>
      <div className="foodCart-wrapper">
        <Pagination title={foodTitle} body={foodBody} actions={foodActions} photoes={foodPhotoes} />
			</div>
    </div>
		</>

  );
}
