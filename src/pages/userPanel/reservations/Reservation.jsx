import React from "react";
import {
  useGetRoomReservationsQuery,
  useDeleteRoomReservationMutation,
} from "../../../app/services/roomReservationApi";
import {
  useGetFoodReservationsQuery,
  useDeleteFoodReservationMutation,
} from "../../../app/services/foodReservationApi";
import { useGetRoomsQuery } from "../../../app/services/roomApi";
import { useGetFoodsQuery } from "../../../app/services/foodApi";
import { filterByID } from "../../../filterMethods";
import swal from "sweetalert";
import Pagination from "../../../components/pagination/Pagination";
import CircleSpinner from "../../../components/loader/CircleSpinner";
import { MdCancel, MdErrorOutline } from "react-icons/md";
import "./reservation.css";

export default function Reservation() {
  const localStorageData = JSON.parse(localStorage.getItem("user"));
  // const { id, profile, name, role, email, phone } = localStorageData;
  const {
    data: roomReservations,
    isLoading: roomReservationsIsLoading,
    error: roomReservationsError,
  } = useGetRoomReservationsQuery();
  const {
    data: foodReservations,
    isLoading: foodReservationsIsLoading,
    error: foodReservationsError,
  } = useGetFoodReservationsQuery();
  const [deleteRoomReservation] = useDeleteRoomReservationMutation();
  const [deleteFoodReservation] = useDeleteFoodReservationMutation();
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

  if (
    roomReservationsIsLoading ||
    roomsIsLoading ||
    foodReservationsIsLoading ||
    foodsIsLoading
  ) {
    return <CircleSpinner />;
  }

  if (
    roomReservationsError ||
    roomsError ||
    foodReservationsError ||
    foodsError
  ) {
    return (
      <div className="error">
        <MdErrorOutline />
        <p>
          {roomReservationsError.error +
            roomsError.error +
            foodReservationsError.error +
            foodsError.error}
        </p>
      </div>
    );
  }

  const roomDeleteHandler = async (roomReservationInfo) => {
    swal({
      text: "آیا از حذف آیتم اطمینان دارید؟",
      buttons: ["خیر", "بله"],
    }).then((res) => {
      if (res) {
        deleteRoomReservation(roomReservationInfo);
      }
    });
  };

  const foodDeleteHandler = async (foodReservationInfo) => {
    swal({
      text: "آیا از حذف آیتم اطمینان دارید؟",
      buttons: ["خیر", "بله"],
    }).then((res) => {
      if (res) {
        deleteFoodReservation(foodReservationInfo);
      }
    });
  };

  const roomTitle = ["تاریخ", "شماره اتاق", "تعداد نفرات", "قیمت(تومان)"];

  let roomBody = [];
  const filteredRoomReservations = roomReservations
    .slice()
    .filter((room) => room.userID === localStorageData.id);
  filteredRoomReservations.forEach((roomReservation) => {
    const { date, roomID, strength, price } = roomReservation;
    const room = filterByID(rooms, roomID)[0];
    let newItem = {
      tableData: [date, room.roomNumber, strength, price.toLocaleString()],
      payload: roomReservation,
    };
    roomBody = [...roomBody, newItem];
  });
  const roomActions = [
    {
      icon: <MdCancel />,
      tooltip: "ابطال سفارش",
      method: roomDeleteHandler,
      class: "btn-red",
    },
  ];

  const foodTitle = ["تاریخ", "شماره اتاق", "غذا", "تعداد", "قیمت(تومان)"];

  let foodBody = [];
  const filteredFoodReservations = foodReservations
    .slice()
    .filter((food) => food.userID === localStorageData.id);
  filteredFoodReservations.forEach((foodReservation) => {
    const { date, roomID, foodID, quantity, price } = foodReservation;
    const food = filterByID(foods, foodID)[0];
    const room = filterByID(rooms, roomID)[0];
    console.log(foods);
    let newItem = {
      tableData: [
        date,
        room.roomNumber,
        food.title,
        quantity,
        price.toLocaleString(),
      ],
      payload: foodReservation,
    };
    foodBody = [...foodBody, newItem];
  });

  const foodActions = [
    {
      icon: <MdCancel />,
      tooltip: "ابطال سفارش",
      method: foodDeleteHandler,
      class: "btn-red",
    },
  ];

  return (
    <div>
      <h2 className="main-title title2">لیست سفارشات شما از هتل درسمن</h2>
      <Pagination
        title={roomTitle}
        body={roomBody}
        actions={roomActions}
        onlyTable={true}
      />

      <Pagination
        title={foodTitle}
        body={foodBody}
        actions={foodActions}
        onlyTable={true}
      />
    </div>
  );
}
