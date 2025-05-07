import React, { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { useGetRoomsQuery } from "../../app/services/roomApi";
// import Slider from "../../components/slider/Slider";
import CircleSpinner from "../../components/loader/CircleSpinner";
import { MdErrorOutline } from "react-icons/md";
import { ContextData } from "../../contexts/ContextData";
import {
  FaRegHeart,
  FaHeart,
  FaRegStar,
  FaStar,
  FaStarHalfAlt,
} from "react-icons/fa";
import "./roomDetails.css";
import { filterByID } from "../../utils/filterMethods";
import PageHeader from "../../components/pageHeader/PageHeader";


export default function RoomDetails() {
  const ContextDatas = useContext(ContextData);
  const { roomTypes, roomViews } = ContextDatas;
  const params = useParams();
  const strength = new URLSearchParams(window.location.search).get("strength");

  const [like, setLike] = useState(false);
  const scores = [1, 2, 3, 4, 5];
  let images = [];

  const { data: rooms, isLoading, error } = useGetRoomsQuery();

  if(isLoading){
    return <CircleSpinner />;
  }

  if (error) {
    return (
      <div className="error">
        <MdErrorOutline />
        <p>{error.error}</p>
      </div>
    );
  }

    const selectedRoom = filterByID(rooms, params.ID)[0];
    const roomType = filterByID(roomTypes, selectedRoom.roomTypeID)[0].title;
    const roomView = filterByID(roomViews, selectedRoom.roomViewID)[0].title;
    const title = `اتاق ${roomType} با منظره ${roomView}`;

    images = [
      { id: 1, image: selectedRoom.images },
      { id: 2, image: "../images/rooms/10.png" },
      { id: 3, image: "../images/rooms/11.jpg" },
      { id: 3, image: "../images/rooms/12.png" },
    ];

    const {
      roomNumber,
      floor,
      capacity,
      maxAddedPeople,
      price,
      pricePerAddedPerson,
      description,
      score,
    } = selectedRoom;
    const totalPrice = price + strength * pricePerAddedPerson;

    return (
			<>
			<PageHeader title={title} />
      <div className="room-details-container">
        {/* <Slider slides={images} /> */}
        <div className="room-details__bottom">
          <div
            className={`heart-container ${like ? "liked" : ""}`}
            onClick={() => setLike((prev) => !prev)}
          >
            {like ? <FaHeart /> : <FaRegHeart />}
          </div>

          <h3 className="main-title">{title}</h3>
          <div className="score-container">
            {scores.map((star) => {
              if (score >= star) {
                return <FaStar key={star + 'star' + score} />;
              } else if (star - score < 1) {
                return <FaStarHalfAlt key={star + 'star' + score} />;
              } else {
                return <FaRegStar key={star + 'star' + score} />;
              }
            })}
          </div>
          <div className="details-container">
            <p>{`شماره اتاق: ${roomNumber}`}</p>
            <p>{`طبقه: ${floor}`}</p>
            <p>{`ظرفیت پایه اتاق (نفر): ${capacity}`}</p>
            <p>{`حداکثر تعداد نفرات اضافه: ${maxAddedPeople}`}</p>
            <p>{`قیمت پایه : ${price.toLocaleString()} تومان`}</p>
            <p>{`اضافه بها به ازای هر نفر اضافه : ${pricePerAddedPerson.toLocaleString()} تومان`}</p>
            <p>{`قیمت هر شب اقامت برای تعداد نفرات درخواستی شما( ${strength} نفر) : ${totalPrice.toLocaleString()} تومان`}</p>
          </div>
          <p className="room-details-description">{`${description}`}</p>
        </div>
      </div>
			</>

    );
}
