import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ContextData } from "../../contexts/ContextData";
import Form from "../../components/form/Form";
import Menu from "../../components/menu/Menu";
import swal from "sweetalert";
import { useGetRoomsQuery } from "../../app/services/roomApi";
import { useGetFoodsQuery } from "../../app/services/foodApi";
import { useGetFoodReservationsQuery } from "../../app/services/foodReservationApi";
import {
  requiredDateValidator,
  requiredStringValidator,
} from "../../validators/rules";
import { filterByID } from "../../utils/filterMethods";
import CircleSpinner from "../../components/loader/CircleSpinner";
import { MdErrorOutline } from "react-icons/md";
import { BiDetail } from "react-icons/bi";
import { FaCartPlus } from "react-icons/fa";
import "../roomSearch/roomSearch.css";
import "./foodSearch.css";
import PageHeader from "../../components/pageHeader/PageHeader";

export default function FoodSearch() {
  const ContextDatas = useContext(ContextData);
  const { foodCategories, addToFoodCart } = ContextDatas;
  const navigate = useNavigate();
  const {
    data: rooms,
    isLoading: roomsIsLoading,
    error: roomsError,
  } = useGetRoomsQuery();
  const {
    data: foods,
    isLoading: foodsIsLoading,
    error: foodsError,
  } = useGetFoodsQuery();
  const {
    data: foodReservations,
    isLoading: foodReservationsIsLoading,
    error: foodReservationsError,
  } = useGetFoodReservationsQuery();
  const [room, setRoom] = useState(null);
  const [reqDate, setReqDate] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(
    foodCategories[0].id
  );
  const [showMenu, setShowMenu] = useState(false);

  if (foodReservationsIsLoading || foodsIsLoading || roomsIsLoading) {
    return <CircleSpinner />;
  }

  if (foodReservationsError || foodsError || roomsError) {
    return (
      <div className="error">
        <MdErrorOutline />
        <p>
          {foodReservationsError.error + foodsError.error + roomsError.error}
        </p>
      </div>
    );
  }

  let roomsOptions = [];
  rooms.forEach(({ id, roomNumber }) => {
    roomsOptions = [...roomsOptions, { id, title: roomNumber }];
  });

  const foodsInfo = [...foods];
  const menuList = foodsInfo.filter(
    (food) => food.foodCategoryID === selectedCategory
  );

  const inputs = [
    {
      tag: "date",
      name: "date",
      type: "text",
      label: "تاریخ",
      validators: [requiredDateValidator()],
      initialValue: "",
    },
    {
      tag: "select",
      name: "roomID",
      label: "شماره اتاق",
      validators: [requiredStringValidator()],
      options: roomsOptions,
      initialValue: "",
    },
  ];
  const buttons = [
    {
      title: "مشاهده منو",
      type: "submit",
      className: "btn btn-gold",
    },
  ];

  const submitHandler = (Items) => {
    const { date, roomID } = Items;
    const selectedRoom = filterByID(rooms, roomID)[0];
    setRoom(selectedRoom);
    setReqDate(date);
    swal({
      text: "تاریخ و شماره اتاق شما ثبت شد، لطفا نسبت به انتخاب غذای خود از منو اقدام فرمایید.",
    });
    setShowMenu(true);
  };

  const detailHandler = (foodInfo) => {
    navigate(`/aseman-hotel/foodDetails/${foodInfo.foodID}`);
  };

  const addItemToCart = (newItem) => {
		const userLocalStorageData = JSON.parse(localStorage.getItem("user"));
    const { foodID, quantity, title, price } = newItem;
    const foodCartItem = {
      ...newItem,
			id : crypto.randomUUID(),
			userID: userLocalStorageData.id,
      date: reqDate.format(),
      roomID: room.id,
      roomNumber: room.roomNumber,
    };
    addToFoodCart(foodCartItem);
  };

  const actions = [
    {
      icon: <BiDetail />,
      tooltip: "مشاهده جزئیات",
      method: detailHandler,
      class: "btn-green",
    },
    {
      icon: <FaCartPlus />,
      tooltip: "اضافه به سبد خرید",
      method: addItemToCart,
      class: "btn-orange",
    },
  ];

  return (
		
		<div className="search-container main-wrapper">
		
			<h1 className="page-header-desc ">
			سفارش غذا تنها برای میهمانان هتل امکان پذیر است
			      </h1>
			<div className="search-top">
        <Form
          inputs={inputs}
          buttons={buttons}
          submitHandler={submitHandler}
        ></Form>
      </div>

      {showMenu && (
        <div className="menu-container">
          <ul className="menu-navbar">
            {foodCategories.map((cat) => (
              <li
                className={`menu-navbar-item ${
                  cat.id === selectedCategory ? "active" : ""
                }`}
                onClick={() => setSelectedCategory(cat.id)}
								key={cat.id}
              >
                {cat.title}
              </li>
            ))}
          </ul>
          <div className="menu">
            <Menu menuList={menuList} actions={actions} />
          </div>
        </div>
      )}
    </div>
		

  );
}
