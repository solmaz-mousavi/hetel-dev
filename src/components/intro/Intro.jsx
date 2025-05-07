import { useContext } from "react";
import "./intro.css";
import { StaticDataContext } from "../../contexts/StaticDataContext";
import Aos from "../aos/Aos";

function Intro() {
  const { staticData } = useContext(StaticDataContext);
  return (
    <div className="intro-wrapper">
      {staticData?.intro &&
        staticData.intro.map((item) => (
          <Aos
            aosStyle="fadeInUp"
            once={true}
            key={item.id}
            className="intro-thumb"
          >
            <div className="intro-item">
              <img src={item.image} alt={item.title} className="intro-image" />
              <div className="intro-details">
                <h3 className="intro-title">{item.title}</h3>
                <p className="intro-desc">{item.desc}</p>
              </div>
            </div>
          </Aos>
        ))}
    </div>
  );
}

export default Intro;
