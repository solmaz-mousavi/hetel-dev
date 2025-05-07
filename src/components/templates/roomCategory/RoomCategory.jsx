import "./roomCategory.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
// import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { StaticDataContext } from "../../../contexts/StaticDataContext";

function RoomCategory() {
  const { staticData } = useContext(StaticDataContext);
  // const navigate = useNavigate();
  return (
    <div className="roomSlider-wrapper">
      <div className="container">
        <h3 className="roomSlider-toptitle">
          آرمامش واقعی با مناظر رویایی
        </h3>
        <p className="roomSlider-desc">
          لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده
          از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و
          سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای
          متنوع با هدف بهبود ابزارهای کاربردی می باشد کتابهای زیادی در شصت و سه
          درصد گذشته حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد تا با
          نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان
          خلاقی
        </p>

        {staticData?.roomCategory && (
          <Swiper
            slidesPerView={"auto"}
            freeMode={true}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            modules={[Autoplay, FreeMode, Pagination]}
            className="mySwiper"
            loop={true}
          >
            {staticData.roomCategory.map((item) => (
              <SwiperSlide key={item.id}>
                <div className="roomSlider-image">
                  <img src={item.image} alt="hotel" />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </div>
  );
}

export default RoomCategory;
