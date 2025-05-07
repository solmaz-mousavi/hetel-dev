import React, { useState } from "react";
import { MdNoPhotography } from "react-icons/md";
import {
  FaRegHeart,
  FaHeart,
  FaRegStar,
  FaStar,
  FaStarHalfAlt,
} from "react-icons/fa";

function RowGridView({ title, body, actions, photoes, view }) {
  const [like, setLike] = useState(Array(photoes.length));
  const scores = [1, 2, 3, 4, 5];
  const iterableBody = Object.entries(body);

  const likeHandler = (row) => {
    let likeInfo = [...like];
    likeInfo[row] = !likeInfo[row];
    setLike(likeInfo);
  };

  return (
    <div>
      {body.length === 0 ? (
        <div className="errorBox">اطلاعاتی جهت نمایش وجود ندارد</div>
      ) : (
        <div
          className={`${view === "row" ? "rows-container" : "grids-container"}`}
        >
          {photoes.map((photo, row) => (
            <div className="product-container" key={"mainRow" + row}>
              <div className="photo-container">
                {photo === "" ? (
                  <MdNoPhotography className="product-image-withoutphoto" />
                ) : (
                  <img src={photo} alt="darsman hotel" />
                )}
              </div>

              <div className="product-score-like-container">
                <div className="score" dir="ltr">
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
                </div>

                <div
                  className={`heart ${like[row] ? "liked" : ""}`}
                  onClick={() => likeHandler(row)}
                >
                  {like[row] ? <FaHeart /> : <FaRegHeart />}
                </div>
              </div>

              <div className="product-details">
                {title.map((item, titleIndex) => (
                  <p
                    key={titleIndex + item}
                  >{`${item} : ${iterableBody[row][1].tableData[titleIndex]}`}</p>
                ))}
              </div>
              {actions.length > 0 && (
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
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default RowGridView;
