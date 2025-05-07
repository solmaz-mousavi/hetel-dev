import React from "react";
import { useNavigate } from "react-router-dom";
import {
  useGetUsersQuery,
  useDeleteUserMutation,
} from "../../../app/services/userApi";
import { useGetFoodReservationsQuery } from "../../../app/services/foodReservationApi";
import { useGetRoomReservationsQuery } from "../../../app/services/roomReservationApi";
import swal from "sweetalert";
import TableTop from "../../../components/tableTop/TableTop";
import Pagination from "../../../components/pagination/Pagination";
import CircleSpinner from "../../../components/loader/CircleSpinner";
import { MdDelete, MdErrorOutline } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

export default function Users( {setSelectedUser} ) {
	const navigate = useNavigate();

  const { data: users, isLoading: usersIsLoading, error: usersError } = useGetUsersQuery();
  const [deleteuser] = useDeleteUserMutation();
  const { data: foodReservations, isLoading: foodReservationsIsLoading, error: foodReservationsError} = useGetFoodReservationsQuery();
  const { data: roomReservations, isLoading: roomReservationsIsLoading, error: roomReservationsError} = useGetRoomReservationsQuery();

  if(foodReservationsIsLoading || roomReservationsIsLoading || usersIsLoading){
    return <CircleSpinner />;
  }

  if (foodReservationsError || roomReservationsError || usersError) {
    return (
      <div className="error">
        <MdErrorOutline />
        <p>{foodReservationsError.error + roomReservationsError.error + usersError.error}</p>
      </div>
    );
  }

  const deleteHandler = async (userID) => {
    swal({
      text: "آیا از حذف آیتم اطمینان دارید؟",
      buttons: ["خیر", "بله"],
    }).then((res) => {
      if (res) {
			
					const delFlag = foodReservations.find(res => res.userID === userID.id);
					const delFlag2 = roomReservations.find(res => res.userID === userID.id);
					if(delFlag || delFlag2){
						swal({
							text: "به دلیل وجود کاربری در بخش رزرواسیون، امکان حذف این کاربر وجود ندارد.",
							buttons: "باشه"
						})
					} else{
						deleteuser(userID);
					}
			
      }
    });
  };

	const editHandler = async (userInfo) => {
    await setSelectedUser(userInfo);
    navigate("/aseman-hotel/adminPanel/editUser");
  };

  const title = ["نام", "شماره موبایل", "ایمیل", "نوع کاربر"];

  let body = [];
	let photoes = [];

    users.forEach((user) => {
      const { name, phone, email, role, profile } = user;

      let newItem = {
        tableData: [name, phone, email, role],
        payload: user,
      };
      body = [...body, newItem];
			photoes = [...photoes, profile]
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
  ];

  return (
    <div>
      <TableTop
        title="اطلاعات کاربر ها"
        addRoute="adminPanel/addUser"
      />
      <Pagination title={title} body={body} actions={actions} photoes={photoes} />
    </div>
  );
}
