import React, { useContext } from "react";
import { ContextData } from "../../../contexts/ContextData";
import { useNavigate } from "react-router-dom";
import {
  useGetRoomsQuery,
  useDeleteRoomMutation,
} from "../../../app/services/roomApi";
import { useGetRoomReservationsQuery } from "../../../app/services/roomReservationApi";
import swal from "sweetalert";
import TableTop from "../../../components/tableTop/TableTop";
import Pagination from "../../../components/pagination/Pagination";
import CircleSpinner from "../../../components/loader/CircleSpinner";
import { MdDelete, MdErrorOutline } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { BiDetail } from "react-icons/bi";
import { filterByID } from "../../../filterMethods";

export default function Rooms({ setSelectedRoom }) {
  const ContextDatas = useContext(ContextData);
  const { roomTypes, roomViews } = ContextDatas;
  const navigate = useNavigate();

  const {
    data: rooms,
    isLoading: roomsIsLoading,
    error: roomsError,
  } = useGetRoomsQuery();
  const [deleteRoom] = useDeleteRoomMutation();
  const {
    data: roomReservations,
    isLoading: roomReservationsIsLoading,
    error: roomReservationsError,
  } = useGetRoomReservationsQuery();

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

  const deleteHandler = async (roomInfo) => {
    swal({
      text: "آیا از حذف آیتم اطمینان دارید؟",
      buttons: ["خیر", "بله"],
    }).then((res) => {
      if (res) {
        if (roomReservations) {
          const delFlag = roomReservations.find(
            (res) => res.roomInfo === roomInfo.id
          );
          if (delFlag) {
            swal({
              text: "به دلیل وجود شماره اتاق در بخش رزرواسیون، امکان حذف این اتاق وجود ندارد.",
              buttons: "باشه",
            });
          } else {
            deleteRoom(roomInfo);
          }
        }
      }
    });
  };

  const editHandler = async (roomInfo) => {
    await setSelectedRoom(roomInfo);
    navigate("/aseman-hotel/adminPanel/editRoom");
  };

  const detailHandler = (roomID) => {
    navigate(`/aseman-hotel/roomDetails/${roomID.id}`);
  };

  const title = [
    "شماره",
    "طبقه",
    "نوع",
    "منظره",
    "ظرفیت",
    "قیمت",
    "حداکثر نفرات اضافه",
    "قیمت هر نفر اضافه",
    "امتیاز",
  ];

  let body = [];
  let photoes = [];

  rooms.forEach((room) => {
    const {
      roomNumber,
      floor,
      roomTypeID,
      roomViewID,
      capacity,
      price,
      maxAddedPeople,
      pricePerAddedPerson,
      score,
      images,
    } = room;
    const roomType = filterByID(roomTypes, roomTypeID)[0].title;
    const roomView = filterByID(roomViews, roomViewID)[0].title;

    let newItem = {
      tableData: [
        roomNumber,
        floor,
        roomType,
        roomView,
        `${capacity} نفر`,
        `${price.toLocaleString()} تومان`,
        `${maxAddedPeople} نفر`,
        `${pricePerAddedPerson.toLocaleString()} تومان`,
        score,
      ],
      payload: room,
    };

    body = [...body, newItem];
    photoes = [...photoes, images];
  });

  const actions = [
    {
      icon: <MdDelete />,
      tooltip: "حذف",
      method: deleteHandler,
      class: "btn-red",
    },
    {
      icon: <FaEdit />,
      tooltip: "ویرایش",
      method: editHandler,
      class: "btn-orange",
    },
    {
      icon: <BiDetail />,
      tooltip: "مشاهده جزئیات",
      method: detailHandler,
      class: "btn-green",
    },
  ];

  return (
    <div>
      <TableTop
        title="اطلاعات اتاق های موجود در هتل"
        addRoute="adminPanel/addRoom"
      />
      <Pagination
        title={title}
        body={body}
        actions={actions}
        photoes={photoes}
      />
    </div>
  );
}
