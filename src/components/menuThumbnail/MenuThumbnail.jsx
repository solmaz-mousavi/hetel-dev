import React, { useState } from "react";
import { MdNoPhotography } from "react-icons/md";
import {
  FaRegHeart,
  FaHeart,
  FaRegStar,
  FaStar,
  FaStarHalfAlt,
} from "react-icons/fa";
import { CiSquarePlus, CiSquareMinus } from "react-icons/ci";
import "./menuThumbnail.css";

function MenuThumbnail({ menu, actions, view }) {
  const [like, setLike] = useState(false);
  const scores = [1, 2, 3, 4, 5];
  const [counter, setCounter] = useState(1);
  const {
    id,
    title,
    price,
    score,
    ingredients,
    calories,
    protein,
    fat,
    sugar,
    carbohydrates,
    images,
  } = menu;

  return (
    <div className="product-container">
      <div className="photo-container">
        {images === "" ? (
          <MdNoPhotography className="product-image-withoutphoto" />
        ) : (
          <img src={images} alt="darsman hotel" />
        )}


        <div className="score" dir="ltr">
          {scores.map((star) => {
            if (score >= star) {
              return <FaStar />;
            } else if (star - score < 1) {
              return <FaStarHalfAlt />;
            } else {
              return <FaRegStar />;
            }
          })}
        </div>


        <div
          className={`heart ${like ? "liked" : ""}`}
          onClick={() => setLike((prev) => !prev)}
        >
          {like ? <FaHeart /> : <FaRegHeart />}
        </div>
      </div>


      <div className="product-details">
        <h2>{title}</h2>
        <p>
          {`محتویات: ${ingredients} به همراه `} <FaHeart />
        </p>
        <p>{`میزان کالری: ${calories} کیلو کالری`}</p>


        <div className="price-container">
          <p>{`قیمت: ${price.toLocaleString()} تومان`}</p>

          <div className="counter-container">
						<button onClick={()=>setCounter((prev) => prev + 1)} className="counter-btn" disabled={counter>=10}><CiSquarePlus /></button>
            <p className="counter">{counter}</p>
						<button onClick={()=>setCounter((prev) => prev - 1)} className="counter-btn" disabled={counter<=1}><CiSquareMinus /></button>
          </div>
        </div>

        <div className="nutrition">
          <div className="protein" style={{ height: `${protein}%` }}>
            پروتئین
          </div>
          <div
            className="carbohydrates"
            style={{ height: `${carbohydrates}%` }}
          >
            کربوهیدرات
          </div>
          <div className="fat" style={{ height: `${fat}%` }}>
            چربی
          </div>
          <div className="sugar" style={{ height: `${sugar}%` }}>
            قند
          </div>
        </div>
      </div>
      <div className="product-action-container">
        {actions.length > 0 &&
          actions.map((action, index) => (
            <button
              key={index}
              className={`table-btn ${action.class}`}
              title={action.tooltip}
              onClick={() => {
                action.method({ foodID: id, quantity: counter, title, price, images });
              }}
            >
              {action.icon}
            </button>
          ))}
      </div>
    </div>
  );
}

export default MenuThumbnail;
