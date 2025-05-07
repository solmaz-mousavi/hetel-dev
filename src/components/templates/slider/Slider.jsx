import React, { useContext } from "react";
import "./slider.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css";

import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { StaticDataContext } from "../../../contexts/StaticDataContext";
import Aos from "../../modules/aos/Aos";

export default function Slider() {
  const navigate = useNavigate();
  const { staticData } = useContext(StaticDataContext);
  return (
    <Swiper
      slidesPerView={1}
      spaceBetween={5}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      modules={[Autoplay, Pagination]}
      className="mySwiper slider-wrapper"
      loop={true}
    >
      {staticData?.slider &&
        staticData.slider.map((item) => (
          <SwiperSlide className="slide-item" key={item.id}>
            <div
              className="slide-container"
              style={{
                backgroundImage: `linear-gradient( rgba(0,0,0,0.6), rgba(0,0,0,0.6) ), url(${item.image})`,
              }}
            >
              <Aos
                aosStyle="fadeInRight"
                once={false}
                className="slide-container2"
              >
                <h5 className="slider-title">{item.title}</h5>
                <div
                  className="slider-btn"
                  onClick={() => navigate(`${item.navigate}`)}
                >
                  <p className="slider-desc">{item.desc}</p>
                  <FaArrowLeftLong className="slider-arrow" />
                </div>
                <img
                  src="/aseman-hotel/images/slider/ineShape.webp"
                  alt=""
                  className="ineShape"
                />
              </Aos>
            </div>
          </SwiperSlide>
        ))}
    </Swiper>
  );
}
