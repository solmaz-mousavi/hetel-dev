import React from "react";
import { useState } from "react";
import { useRoutes } from "react-router-dom";

import Home from "./pages/home/Home";
import RoomSearch from "./pages/roomSearch/RoomSearch";
import FoodSearch from "./pages/foodSearch/FoodSearch";
import RoomDetails from "./pages/roomDetails/RoomDetails";
import FoodDetails from "./pages/foodDetails/FoodDetails";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Cart from "./pages/cart/Cart";

import UserPanel from "./pages/userPanel/UserPanel";
import AdminPanel from "./pages/adminPanel/AdminPanel";

import Users from "./pages/adminPanel/users/Users";
import AddUser from "./pages/adminPanel/users/AddUser";
import EditUser from "./pages/adminPanel/users/EditUser";

import Rooms from "./pages/adminPanel/rooms/Rooms";
import AddRoom from "./pages/adminPanel/rooms/AddRoom";
import EditRoom from "./pages/adminPanel/rooms/EditRoom";

import RoomReservations from "./pages/adminPanel/roomReservations/RoomReservations";

import Foods from "./pages/adminPanel/foods/Foods";
import AddFood from "./pages/adminPanel/foods/AddFood";
import EditFood from "./pages/adminPanel/foods/EditFood";

import FoodReservations from "./pages/adminPanel/foodReservations/FoodReservations";

import UserInfo from "./pages/userPanel/userInfo/UserInfo";
import EditUserInfo from './pages/userPanel/userInfo/EditUserInfo';
import Reservation from "./pages/userPanel/reservations/Reservation";
import ChangePassword from "./pages/userPanel/changePassword/ChangePassword";

import NotFound from "./pages/NotFound/NotFound";

function RouteComp() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [selectedFood, setSelectedFood] = useState(null);

  const router = [
    { path: "/aseman-hotel", element: <Home /> },
    { path: "/aseman-hotel/roomSearch", element: <RoomSearch /> },
    { path: "/aseman-hotel/foodSearch", element: <FoodSearch /> },
    { path: "/aseman-hotel/roomDetails/:ID", element: <RoomDetails /> },
    { path: "/aseman-hotel/foodDetails/:ID", element: <FoodDetails /> },
    { path: "/aseman-hotel/login", element: <Login /> },
    { path: "/aseman-hotel/register", element: <Register /> },
    { path: "/aseman-hotel/cart", element: <Cart /> },
    { path: "/aseman-hotel/userPanel/*", element: <UserPanel setSelectedUser={setSelectedUser} />, children:[
        { path: "userInfo", element: <UserInfo setSelectedUser={setSelectedUser} /> },
        { path: "editUserInfo", element: <EditUserInfo selectedUser={selectedUser} /> },
        { path: "reservation", element: <Reservation selectedUser={selectedUser}/> },
        { path: "changePassword", element: <ChangePassword selectedUser={selectedUser} /> },
		] },
    {
      path: "/aseman-hotel/adminPanel/*",
      element: <AdminPanel />,
      children: [
        { path: "users", element: <Users setSelectedUser={setSelectedUser} /> },
        { path: "addUser", element: <AddUser /> },
        { path: "editUser", element: <EditUser selectedUser={selectedUser} /> },

        { path: "rooms", element: <Rooms setSelectedRoom={setSelectedRoom} /> },
        { path: "addRoom", element: <AddRoom /> },
        { path: "editRoom", element: <EditRoom selectedRoom={selectedRoom} /> },

        { path: "roomReservations", element: <RoomReservations /> },

				{ path: "foods", element: <Foods setSelectedFood={setSelectedFood} /> },
				{ path: "addFood", element: <AddFood /> },
				{ path: "editFood", element: <EditFood selectedFood={selectedFood} /> },

				{ path: "foodReservations", element: <FoodReservations /> },
      ],
      
    },
    { path: "/*", element: <NotFound /> },
  ];
  const routes = useRoutes(router);
  return routes;
}

export default RouteComp;
