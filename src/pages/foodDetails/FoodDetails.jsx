import React, { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { useGetFoodsQuery } from "../../app/services/foodApi";
import Slider from "../../components/slider/Slider";
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
import "./foodDetails.css";
import { filterByID } from "../../filterMethods";
import PageHeader from "../../components/pageHeader/PageHeader";

export default function FoodDetails() {
  const ContextDatas = useContext(ContextData);
  const { foodCategories } = ContextDatas;
  const params = useParams();

  const [like, setLike] = useState(false);
  const scores = [1, 2, 3, 4, 5];

  const { data: foods, isLoading, error } = useGetFoodsQuery();

  if (isLoading) {
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

  const selectedFood = filterByID(foods, params.ID)[0];
  const foodCategory = filterByID(
    foodCategories,
    selectedFood.foodCategoryID
  )[0].title;

  const {
    title,
    price,
    description,
    score,
    calories,
    ingredients,
    protein,
    fat,
    sugar,
    carbohydrates,
    images,
  } = selectedFood;

  const images2 = [
    { id: 1, image: images },
    { id: 2, image: "../images/foods/10.png" },
    { id: 3, image: "../images/foods/11.png" },
    { id: 3, image: "../images/foods/12.png" },
  ];

  return (
		<>
		<PageHeader title={title} />
    <div className="food-details-container">
      <Slider slides={images2} />
      <div className="food-details__bottom">


        <h3 className="main-title">{title}</h3>
        <div className="score-container">
          {scores.map((star, index) => {
            if (score >= star) {
              return <FaStar key={index} />;
            } else if (star - score < 1) {
              return <FaStarHalfAlt key={index} />;
            } else {
              return <FaRegStar key={index} />;
            }
          })}
        </div>


        <div
          className={`heart-container ${like ? "liked" : ""}`}
          onClick={() => setLike((prev) => !prev)}
        >
          {like ? <FaHeart /> : <FaRegHeart />}
        </div>


        <div className="details-container">
          <p>
            {`محتویات: ${ingredients} به همراه `}
            <FaHeart />
          </p>
          <p>{`میزان کالری: ${calories} کیلو کالری`}</p>
          <h3 className="food-price">{`قیمت: ${price.toLocaleString()} تومان`}</h3>
        </div>

        <div className="food-nutritional-container">
					<p className="nutrition-title">ارزش غذایی:</p>
          <div
            className="food-nutritional-item food-protein"
            style={{ width: `${protein}%` }}
          >
            <span>پروتئین</span>
          </div>
          <div className="food-nutritional-item food-fat" style={{ width: `${fat}%` }}>
            <span>کربوهیدرات</span>
          </div>
          <div
            className="food-nutritional-item food-sugar"
            style={{ width: `${sugar}%` }}
          >
            <span>چربی</span>
          </div>
          <div
            className="food-nutritional-item food-carbohydrates"
            style={{ width: `${carbohydrates}%` }}
          >
            <span>قند</span>
          </div>
        </div>

        <p className="food-details-description">{`${description}`}</p>
      </div>
    </div>
		</>

  );
}
