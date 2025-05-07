import { createContext, useCallback, useState } from "react";
import swal from "sweetalert";
// import { useNavigate } from "react-router-dom";
import { getDateArray2, filterByNameOutputByOneItem } from "../filterMethods";
import { useAddRoomReservationMutation, useGetRoomReservationsQuery } from "../app/services/roomReservationApi";
import { useAddFoodReservationMutation, useGetFoodReservationsQuery } from "../app/services/foodReservationApi";

export const ContextData = createContext();
function DataProvider({ children }) {
  const [flag, setFlag] = useState(false);
  const [addRoomReservation] = useAddRoomReservationMutation();
  const [addFoodReservation] = useAddFoodReservationMutation();
	const {
    data: roomReservations,
    isLoading: roomReservationsIsLoading,
    error: roomReservationsError,
  } = useGetRoomReservationsQuery();
	// const {
  //   data: foodReservations,
  //   isLoading: foodReservationsIsLoading,
  //   error: foodReservationsError,
  // } = useGetFoodReservationsQuery();
  // const navigate = useNavigate();

  // // login datas
  // const login = useCallback((userI) => {
  //   const sharedUserInfo = { ...userI };
  //   delete sharedUserInfo.password;
  //   localStorage.setItem("user", JSON.stringify(sharedUserInfo));
  // }, []);

  // const logout = useCallback(() => {
  //   swal({
  //     text: "آیا از خروج اطمینان دارید؟",
  //     buttons: ["خیر", "بله"],
  //   }).then((res) => {
  //     if (res) {
  //       localStorage.removeItem("user");
  //       navigate("/login");
  //     }
  //   });
  // }, []);

  // cart

  const addToRoomCart = (product) => {
    const localStorageData = JSON.parse(localStorage.getItem("roomCart")) || [];
    const newLocalStorageData = [...localStorageData, product];
    localStorage.setItem("roomCart", JSON.stringify(newLocalStorageData));
    setFlag((prev) => !prev);
  };

  const removeFromRoomCart = (roomCartInfo) => {
    swal({
      text: "آیا از حذف آیتم اطمینان دارید؟",
      buttons: ["خیر", "بله"],
    }).then((res) => {
      if (res) {
        const localStorageData = JSON.parse(localStorage.getItem("roomCart"));
        const newLocalStorageData = localStorageData.filter(
          (data) => data.id !== roomCartInfo.id
        );
        localStorage.setItem("roomCart", JSON.stringify(newLocalStorageData));
        setFlag((prev) => !prev);
      }
    });
  };

  const directRemoveFromRoomCart = (roomCartInfo) => {
    const localStorageData = JSON.parse(localStorage.getItem("roomCart"));
    const newLocalStorageData = localStorageData.filter(
      (data) => data.id !== roomCartInfo.id
    );
    localStorage.setItem("roomCart", JSON.stringify(newLocalStorageData));
    setFlag((prev) => !prev);
  };

  const reserveRoom = async (roomCartItem) => {
    const { id, userID, roomID, strength, totalPrice, enterDate, exitDate } =
      roomCartItem;
    const requestDates = getDateArray2(enterDate, exitDate);
		if(roomReservations){
    const reservedRoomIDs = filterByNameOutputByOneItem(
      roomReservations,
      "date",
      requestDates,
      "roomID"
    );
    if (reservedRoomIDs.includes(roomID)) {
      swal({
        text: "متاسفانه در تاریخ های مورد نظر، اتاق فوق دیگر خالی نمی باشد.",
      }).then(directRemoveFromRoomCart(roomCartItem));
    } else {
      requestDates.forEach(async (reqDate) => {
        const reservationItem = {
          date: reqDate,
          roomID,
           userID,
          strength,
           price: totalPrice,
        };
        await addRoomReservation(reservationItem);
        swal({
          text: "این ایتم در بخش سفارشات ثبت شد.",
        });
        directRemoveFromRoomCart(roomCartItem);
      })
    }
  }}

  const addToFoodCart = (product) => {
    const localStorageData = JSON.parse(localStorage.getItem("foodCart")) || [];
    const newLocalStorageData = [...localStorageData, product];
    localStorage.setItem("foodCart", JSON.stringify(newLocalStorageData));
    setFlag((prev) => !prev);
  };

  const removeFromFoodCart = (foodCartInfo) => {
    swal({
      text: "آیا از حذف آیتم اطمینان دارید؟",
      buttons: ["خیر", "بله"],
    }).then((res) => {
      if (res) {
        const localStorageData = JSON.parse(localStorage.getItem("foodCart"));
        const newLocalStorageData = localStorageData.filter(
          (data) => data.id !== foodCartInfo.id
        );
        localStorage.setItem("foodCart", JSON.stringify(newLocalStorageData));
        setFlag((prev) => !prev);
      }
    });
  };

	const directRemoveFromFoodCart = (foodCartInfo) => {
    const localStorageData = JSON.parse(localStorage.getItem("foodCart"));
    const newLocalStorageData = localStorageData.filter(
      (data) => data.id !== foodCartInfo.id
    );
    localStorage.setItem("foodCart", JSON.stringify(newLocalStorageData));
    setFlag((prev) => !prev);
  };

  const reserveFood = async (foodCartItem) => {
		console.log(foodCartItem)
    const { id, userID, foodID, roomID, quantity, price, date } = foodCartItem;
   
        const reservationItem = {
          date,
					userID,
					roomID,
          foodID,
          quantity,
					price,
        };
        await addFoodReservation(reservationItem);
        swal({
          text: "این ایتم در بخش سفارشات ثبت شد.",
        });
        directRemoveFromFoodCart(foodCartItem);
      }
    
  

  // static variables
  const roomTypes = [
    { id: "2h7d", title: "سینگل" },
    { id: "f0lk", title: "دابل" },
    { id: "35fc", title: "سوئیت" },
    { id: "f8k2", title: "کینگ" },
  ];
  const roomViews = [
    { id: "9dh7", title: "دریا" },
    { id: "hgdf", title: "شهر" },
  ];
  const foodCategories = [
    { id: "b817", title: "پیش غذا" },
    { id: "247h", title: "غذای اصلی" },
    { id: "f5o2", title: "فست فود" },
    { id: "4e5f", title: "نوشیدنی سرد" },
    { id: "bcf7", title: "دسر" },
    { id: "0e66", title: "نوشیدنی گرم" },
  ];

  return (
    <ContextData.Provider
      value={{
        roomTypes,
        roomViews,
        foodCategories,
        // login,
        // logout,
        addToRoomCart,
        removeFromRoomCart,
        reserveRoom,
				reserveFood,
        addToFoodCart,
        removeFromFoodCart,
      }}
    >
      {children}
    </ContextData.Provider>
  );
}

export default DataProvider;
