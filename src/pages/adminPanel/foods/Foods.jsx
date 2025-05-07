import React, { useContext } from "react";
import { ContextData } from "../../../contexts/ContextData";
import { useNavigate } from "react-router-dom";
import {
  useGetFoodsQuery,
  useDeleteFoodMutation,
} from "../../../app/services/foodApi";
import { useGetFoodReservationsQuery } from "../../../app/services/foodReservationApi";
import swal from "sweetalert";
import TableTop from "../../../components/tableTop/TableTop";
import Pagination from "../../../components/pagination/Pagination";
import CircleSpinner from "../../../components/loader/CircleSpinner";
import { MdDelete, MdErrorOutline } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { BiDetail } from "react-icons/bi";
import { filterByID } from "../../../filterMethods";

export default function Foods({ setSelectedFood }) {
  const ContextDatas = useContext(ContextData);
  const { foodCategories } = ContextDatas;
  const navigate = useNavigate();

  const { data: foods, isLoading: foodsIsLoading, error: foodsError } = useGetFoodsQuery();
  const [deleteFood] = useDeleteFoodMutation();
  const { data: foodReservations, isLoading: foodReservationsIsLoading, error: foodReservationsError} = useGetFoodReservationsQuery();

  if(foodReservationsIsLoading || foodsIsLoading){
    return <CircleSpinner />;
  }

  if (foodReservationsError || foodsError) {
    return (
      <div className="error">
        <MdErrorOutline />
        <p>{foodReservationsError.error + foodsError.error}</p>
      </div>
    );
  }

  const deleteHandler = async (foodID) => {
    swal({
      text: "آیا از حذف آیتم اطمینان دارید؟",
      buttons: ["خیر", "بله"],
    }).then((res) => {
      if (res) {
  
          const delFlag = foodReservations.some((res) => {
            const delFlag2 = res.foods.find((food) => food.id === foodID.id);
            return Boolean(delFlag2);
          });
          if (delFlag) {
            swal({
              text: "به دلیل وجود این غذا در بخش رزرواسیون، امکان حذف وجود ندارد.",
              buttons: "باشه",
            });
          } else {
            deleteFood(foodID);
          }
        
      }
    });
  };

  const editHandler = async (foodInfo) => {
    await setSelectedFood(foodInfo);
    navigate("/aseman-hotel/adminPanel/editFood");
  };

  const detailHandler = (foodInfo) => {
    navigate(`/aseman-hotel/foodDetails/${foodInfo.id}`);
  };

  const title = [
    "عنوان",
    "دسته بندی",
    "قیمت (تومان)",
    "امتیاز",
    "محتویات",
    "میزان کالری",
    "پروتئین",
    "چربی",
    "قند",
    "کربوهیدرات",
    "توضیحات",
  ];

  let body = [];
  let photoes = [];

    foods.forEach((food) => {
      const {
        title,
        foodCategoryID,
        price,
        ingredients,
        calories,
        protein,
        fat,
        sugar,
        carbohydrates,
        description,
        score,
				images
      } = food;
      const foodCategory = filterByID(foodCategories, foodCategoryID)[0].title;

      let newItem = {
        tableData: [
          title,
          foodCategory,
          `${price.toLocaleString()} تومان`,
          score,
          ingredients,
          `${calories} کیلو کالری`,
          protein,
          fat,
          sugar,
          carbohydrates,
          description,
        ],
        payload: food,
      };
      body = [...body, newItem];
			photoes = [...photoes, images]
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
          title="اطلاعات غذاهای قابل سرور در رستوران"
          addRoute="adminPanel/addFood"
        />
        <Pagination title={title} body={body} actions={actions} photoes={photoes}  />
      </div>
    );
  }
