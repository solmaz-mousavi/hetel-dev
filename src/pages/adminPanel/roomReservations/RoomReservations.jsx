import React from "react";
import {
  useGetRoomReservationsQuery,
  useDeleteRoomReservationMutation,
} from "../../../app/services/roomReservationApi";
import { useGetRoomsQuery } from "../../../app/services/roomApi";
import { useGetUsersQuery } from "../../../app/services/userApi";
import { filterByID } from "../../../filterMethods";
import swal from "sweetalert";
import TableTop from "../../../components/tableTop/TableTop";
import Pagination from "../../../components/pagination/Pagination";
import CircleSpinner from "../../../components/loader/CircleSpinner";
import { MdCancel, MdErrorOutline } from "react-icons/md";

export default function RoomReservations() {
  const {
    data: roomReservations,
    isLoading: roomReservationsIsLoading,
    error: roomReservationsError,
  } = useGetRoomReservationsQuery();
  const [deleteRoomReservation] = useDeleteRoomReservationMutation();
  const { data: rooms, isLoading: roomsIsLoading ,error: roomsError } = useGetRoomsQuery();
  const { data: users, isLoading: usersIsLoading ,error: usersError } = useGetUsersQuery();

  if(roomReservationsIsLoading || roomsIsLoading || usersIsLoading){
    return <CircleSpinner />;
  }

  if (roomReservationsError || roomsError || usersError) {
    return (
      <div className="error">
        <MdErrorOutline />
        <p>{roomReservationsError.error + roomsError.error + usersError.error}</p>
      </div>
    );
  }

  const deleteHandler = async (roomReservationInfo) => {
    swal({
      text: "آیا از حذف آیتم اطمینان دارید؟",
      buttons: ["خیر", "بله"],
    }).then((res) => {
      if (res) {
        deleteRoomReservation(roomReservationInfo);
      }
    });
  };

  const title = [
    "تاریخ",
    "شماره اتاق",
    "نام مهمان",
    "تعداد نفرات",
    "قیمت(تومان)",
  ];

  let body = [];
    roomReservations.forEach((roomReservation) => {
      const { date, userID, roomID, strength, price } = roomReservation;
      const room = filterByID(rooms, roomID)[0];
      const user = filterByID(users, userID)[0];

      let newItem = {
        tableData: [
          date,
          room.roomNumber,
          user.name,
          strength,
          price.toLocaleString(),
        ],
        payload: roomReservation,
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
          title="اطلاعات رزرواسیون اتاق های موجود در هتل"
          addRoute="roomSearch"
        />
        <Pagination title={title} body={body} actions={actions} onlyTable={true} />
      </div>
    );
  }
