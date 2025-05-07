import React from "react";
import {
  useGetFoodReservationsQuery,
  useDeleteFoodReservationMutation,
} from "../../../app/services/foodReservationApi";
import { useGetFoodsQuery } from "../../../app/services/foodApi";
import { useGetRoomsQuery } from "../../../app/services/roomApi";
import { useGetUsersQuery } from "../../../app/services/userApi";
import { filterByID } from "../../../filterMethods";
import swal from "sweetalert";
import TableTop from "../../../components/tableTop/TableTop";
import Pagination from "../../../components/pagination/Pagination";
import CircleSpinner from "../../../components/loader/CircleSpinner";
import { MdCancel, MdErrorOutline } from "react-icons/md";

export default function FoodReservations() {
  const {    data: foodReservations,    isLoading: foodReservationsIsLoading,    error: foodReservationsError,  } = useGetFoodReservationsQuery();
  const [deleteFoodReservation] = useDeleteFoodReservationMutation();
  const { data: foods, isLoading: foodsIsLoading ,error: foodsError } = useGetFoodsQuery();
  const { data: rooms, isLoading: roomsIsLoading ,error: roomsError } = useGetRoomsQuery();
  const { data: users, isLoading: usersIsLoading ,error: usersError } = useGetUsersQuery();

  if(foodReservationsIsLoading || foodsIsLoading || usersIsLoading){
    return <CircleSpinner />;
  }

  if (foodReservationsError || foodsError || usersError || roomsIsLoading) {
    return (
      <div className="error">
        <MdErrorOutline />
        <p>{foodReservationsError.error + foodsError.error + usersError.error + roomsError.error}</p>
      </div>
    );
  }

  const deleteHandler = async (foodReservationInfo) => {
    swal({
      text: "آیا از حذف آیتم اطمینان دارید؟",
      buttons: ["خیر", "بله"],
    }).then((res) => {
      if (res) {
        deleteFoodReservation(foodReservationInfo);
      }
    });
  };

  const title = [
    "تاریخ",
    "شماره اتاق",
    "نام مهمان",
		"غذا",
    "تعداد",
    "قیمت(تومان)",
  ];

  let body = [];
    foodReservations.forEach((foodReservation) => {
      const { date, userID,roomID, foodID, quantity, price } = foodReservation;
      const food = filterByID(foods, foodID)[0];
      const user = filterByID(users, userID)[0];
      const room = filterByID(rooms, roomID)[0];

      let newItem = {
        tableData: [
          date,
          room.roomNumber,
          user.name,
          food.title,
          quantity,
          price.toLocaleString(),
        ],
        payload: foodReservation,
      };
      body = [...body, newItem];
    });

  const actions = [
    {
      icon: <MdCancel />,
      tooltip: "ابطال سفارش",
      method: deleteHandler,
      class: "btn-red",
    },
  ];

    return (
      <div>
        <TableTop
          title="اطلاعات رزرواسیون رستوران هتل"
          addRoute="foodSearch"
        />
        <Pagination title={title} body={body} actions={actions} onlyTable={true} />
      </div>
    );
  }
