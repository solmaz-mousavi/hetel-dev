import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ContextData } from "../../contexts/ContextData";
import { useGetRoomsQuery } from "../../app/services/roomApi";
import { useGetRoomReservationsQuery } from "../../app/services/roomReservationApi";
import {
  filterByNameOutputByOneItem,
  getDateArray,
  filterByID,
} from "../../filterMethods";
import {
  requiredDateValidator,
  requiredNumberValidator,
} from "../../validators/rules";
import { FaCartPlus } from "react-icons/fa";
import { BiDetail } from "react-icons/bi";
import Form from "../../components/form/Form";
import Pagination from "../../components/pagination/Pagination";
import CircleSpinner from "../../components/loader/CircleSpinner";
import { MdErrorOutline } from "react-icons/md";
import "./roomSearch.css";

export default function RoomSearch() {
  const navigate = useNavigate();
  const ContextDatas = useContext(ContextData);
  const { roomTypes, roomViews, addToRoomCart } = ContextDatas;
  const [strength, setStrength] = useState(null);
  const [enterDate, setEnterDate] = useState(null);
  const [exitDate, setExitDate] = useState(null);
  const [requestDates, setRequestDates] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const {
    data: rooms,
    isLoading: roomsIsLoading,
    error: roomsError,
  } = useGetRoomsQuery();
  const {
    data: roomReservations,
    isLoading: roomReservationsIsLoading,
    error: roomReservationsError,
  } = useGetRoomReservationsQuery();
  const [reservableRooms, setreservableRooms] = useState([]);

  if (roomReservationsIsLoading || roomsIsLoading) {
    return <CircleSpinner />;
  }

  if (roomReservationsError || roomsError) {
    return (
      <div className="error">
        <MdErrorOutline />
        <p>{roomReservationsError.error + roomsError.error}</p>
      </div>
    );
  }

  const inputs = [
    {
      tag: "date",
      name: "enterDate",
      type: "text",
      label: "تاریخ ورود",
      validators: [requiredDateValidator()],
      initialValue: "",
    },
    {
      tag: "date",
      name: "exitDate",
      type: "text",
      label: "تاریخ خروج",
      validators: [requiredDateValidator()],
      initialValue: "",
    },
    {
      tag: "input",
      name: "strength",
      type: "number",
      label: "تعداد نفرات",
      validators: [requiredNumberValidator()],
      initialValue: 1,
    },
  ];

  const submitHandler = async (items) => {
    const { strength, enterDate, exitDate } = items;
    setStrength(strength);
    setEnterDate(enterDate);
    setExitDate(exitDate);
    setRequestDates(getDateArray(enterDate, exitDate));

    const reservedRoomIDs = filterByNameOutputByOneItem(
      roomReservations,
      "date",
      requestDates,
      "roomID"
    );

    const roomInfo = [...rooms];
    const filteredrooms = roomInfo.filter((room) => {
      const { id, capacity, maxAddedPeople } = room;
      return (
        capacity <= Number(strength) &&
        Number(strength) <= capacity + maxAddedPeople &&
        !reservedRoomIDs.includes(id)
      );
    });

    const products = filteredrooms.map((room) => {
      const {
        id,
        roomNumber,
        floor,
        roomTypeID,
        roomViewID,
        price,
        pricePerAddedPerson,
        score,
        images,
      } = room;
      const roomType = filterByID(roomTypes, roomTypeID)[0].title;
      const roomView = filterByID(roomViews, roomViewID)[0].title;
      const title = `اتاق ${roomType} با منظره ${roomView}`;
      const totalPrice = price + strength * pricePerAddedPerson;

      return { id, title, roomNumber, floor, totalPrice, images, score };
    });

    setreservableRooms(products);
    setShowResults(true);
  };

  const buttons = [
    {
      title: "مشاهده اتاق های خالی",
      type: "submit",
      className: "btn btn-gold btn-lg",
    },
  ];

  const title = ["عنوان", "شماره", "طبقه", "قیمت هر شب اقامت (تومان)"];

  let body = [];
  let img = [];
  if (reservableRooms) {
    reservableRooms.forEach((room) => {
      const { title, roomNumber, floor, totalPrice, images } = room;
      let newItem = {
        tableData: [
          title,
          roomNumber,
          floor,
          `${totalPrice.toLocaleString()} تومان`,
        ],
        payload: room,
      };
      body = [...body, newItem];
      img = [...img, images];
    });
  }

  const detailHandler = (roomInfo) => {
    navigate(`/aseman-hotel/roomDetails/${roomInfo.id}?strength=${strength}`);
  };

  const addItemToCart = (roomInfo) => {
    const userLocalStorageData = JSON.parse(localStorage.getItem("user"));
    const { id, title, roomNumber, totalPrice, images } = roomInfo;
    const roomCartItem = {
      id: crypto.randomUUID(),
      userID: userLocalStorageData.id,
      roomID: id,
      title,
      roomNumber,
      strength,
      PricePerDay: totalPrice,
      enterDate: enterDate.format(),
      exitDate: exitDate.format(),
      duration: requestDates.length,
      totalPrice: totalPrice * requestDates.length,
      images,
    };
    addToRoomCart(roomCartItem);
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
        اطلاعاتت رو وارد کن تا بتونی اتاق های خالی رو ببینی
      </h1>
      <div className="search-top">
        <Form
          inputs={inputs}
          buttons={buttons}
          submitHandler={submitHandler}
        ></Form>
        {showResults && (
          <div className="search-bottom">
            <Pagination
              title={title}
              body={body}
              actions={actions}
              photoes={img}
            />
          </div>
        )}
      </div>
    </div>
  );
}
