import "./roomThumb.css";
import Score from "../score/Score";
import Like from "../like/Like";
import { useEditRoomMutation } from "../../../app/services/roomApi";
import { StaticDataContext } from "../../../contexts/StaticDataContext";
import { AuthContext } from "../../../contexts/AuthContext";
import { useContext, useState } from "react";
import { filterByID } from "../../../utils/filterMethods";
import { addToRoomCart } from "../../../utils/addToCart";
import { BiDetail } from "react-icons/bi";
import { FaCartPlus, FaRegComment } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { MdNoPhotography } from "react-icons/md";

function RoomThumb({ room, formInfo, viewStyle }) {
		const navigate = useNavigate();

  const {
    id,
    roomNumber,
    floor,
    roomTypeID,
    roomViewID,
    capacity,
    price,
    maxAddedPeople,
    pricePerAddedPerson,
    score,
    description,
    images,
    likedUserIDs,
    comments,
  } = room;
	const {enterDate, exitDate, strength, reqDates} = formInfo;
  const [editRoom] = useEditRoomMutation();

	const { staticData } = useContext(StaticDataContext);
  const { userInfo } = useContext(AuthContext);
  const liked = likedUserIDs.includes(userInfo.id);

  const likeHandler = async (liked) => {
    const newLikedUserIDs = liked
      ? [...likedUserIDs, userInfo.id]
      : likedUserIDs.filter((i) => i !== userInfo.id);
    await editRoom({ ...room, likedUserIDs: newLikedUserIDs });
		// setFlag(prev => prev + 1);
  };

  const roomType = filterByID(staticData.roomTypes, roomTypeID)[0].title;
  const roomView = filterByID(staticData.roomViews, roomViewID)[0].title;
  const title = `اتاق ${roomType} با منظره ${roomView}`;
  const totalPrice = (price + Math.max((strength-capacity) * pricePerAddedPerson, 0)).toLocaleString();


	const addItemToCart = () => {
		const roomCartItem = {
			id: crypto.randomUUID(),
			userID: userInfo.id,
			roomID: id,
			title,
			roomNumber,
			strength,
			PricePerDay: totalPrice,
			enterDate: enterDate.format(),
			exitDate: exitDate.format(),
			duration: reqDates.length,
			totalPrice: totalPrice * reqDates.length,
			images,
		};
		addToRoomCart(roomCartItem);
	};


  // console.log(
  //   id,
  //   roomNumber,
  //   floor,
  //   roomTypeID,
  //   roomViewID,
  //   capacity,
  //   price,
  //   maxAddedPeople,
  //   pricePerAddedPerson,
  //   score,
  //   description,
  //   images
  // );

  return (
    <div className={`roomThumb-container ${viewStyle}`}>
      <div className="roomThumb-image">
        {images.length === 0 ? (
          <MdNoPhotography className="roomThumb-withoutphoto" />
        ) : (
          <img src={images[0]} alt="aseman hotel" />
        )}
      </div>

      <div className="roomThumb-favorite">
        <Score score={score} />
        <Like liked={liked} likeHandler={likeHandler} likedCount={likedUserIDs.length} />
<div className="roomThumb-comments">
<FaRegComment />
<span>{comments.length === 0 ? "" : `${comments.length}`}</span>
</div>
        {/* <div className="score" dir="ltr">
          <span>
            {"("} {iterableBody[row][1].payload.score} {")"}
          </span>
          {scores.map((star) => {
            const score = iterableBody[row][1].payload.score;
            if (!score) {
              return <></>;
            } else if (score >= star) {
              return <FaStar key={star + "star" + score} />;
            } else if (star - score < 1) {
              return <FaStarHalfAlt key={star + "star" + score} />;
            } else {
              return <FaRegStar key={star + "star" + score} />;
            }
          })}
        </div> */}
      </div>

      <div className="roomThumb-details">
        <p>{title}</p>
				<p>طبقه {floor}</p>
				<p>شماه اتاق: {roomNumber}</p>
				<p>قیمت هر شب اقامت برای {strength} نفر: {totalPrice} تومان</p>
        {/* {title.map((item, titleIndex) => (
          <p
            key={titleIndex + item}
          >{`${item} : ${iterableBody[row][1].tableData[titleIndex]}`}</p>
        ))} */}
      </div>
			<div className="roomThumb-btn">
			<BiDetail title="مشاهده جزئیات" className="btn-green" onClick={()=>navigate(`/aseman-hotel/roomDetails/${id}?strength=${strength}`)} />
			<FaCartPlus title="اضافه به سبد خرید" className="btn-orange" onClick={addItemToCart} />
			</div>




      {/* {actions.length > 0 && (
        <div className="product-action-container">
          {actions.map((action, index) => (
            <button
              key={action.tooltip + index}
              className={`table-btn ${action.class}`}
              title={action.tooltip}
              onClick={() => {
                action.method(body[row].payload);
              }}
            >
              {action.icon}
            </button>
          ))}
        </div>
      )} */}
    </div>
  );
}

export default RoomThumb;
