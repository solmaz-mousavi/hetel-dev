import { useContext } from "react";
import Icon from "../icon/Icon";
import "./social.css";
import { StaticDataContext } from "../../contexts/StaticDataContext";

function Social() {
  const { staticData } = useContext(StaticDataContext);

  return (
    <div className="social-container">
      {staticData?.social &&
        staticData.social.map((item) => (
          <a
            href={item.link}
            target="_blank"
            rel="noreferrer"
            className="social-link"
            key={item.id}
          >
            <Icon name={item.iconName} className="social-icon" />
          </a>
        ))}
    </div>
  );
}

export default Social;
