import { useContext } from "react";
import "./foodCategory.css";
import { StaticDataContext } from "../../../contexts/StaticDataContext";
import { useNavigate } from "react-router-dom";
import Aos from "../../modules/aos/Aos";

function FoodCategory() {
  const { staticData } = useContext(StaticDataContext);
  const navigate = useNavigate();
  return (
    <div className="category-wrapper">
			<div className="container">

        <h3 className="category-toptitle">تجربه ای منحصر بفرد با تنوع غذایی بالا در رستوران</h3>
        <p className="category-desc">
          لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده
          از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و
          سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای
          متنوع با هدف بهبود ابزارهای کاربردی می باشد کتابهای زیادی در شصت و سه
          درصد گذشته حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد تا با
          نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان
          خلاقی
        </p>
			</div>
      <div className="container category-container">
        {staticData?.category &&
          staticData.category.map((item) => (
            <Aos
              aosStyle="fadeInUp"
              once={true}
              key={item.id}
              className="category-thumb"
            >
              <div
                className="category-item"
                onClick={() => navigate("/aseman-hotel/menu")}
              >
                <div className="category-image">
                  <img src={item.image} alt={item.title} />
                </div>
                <p className="category-title">{item.title}</p>
              </div>
            </Aos>
          ))}
      </div>
    </div>
  );
}

export default FoodCategory;
