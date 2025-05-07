
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";
// show score of a product by stars:

function Score({ score }) {
  const stars = [1, 2, 3, 4, 5];

  return (
    <div className="score-container">
      {stars.map((item, index) => {
        if (item <= score) {
          return <FaStar className="score-icon" key={index} />;
        } else if (item < score + 1) {
          return <FaStarHalfAlt className="score-icon" key={index} />;
        } else {
          return <FaRegStar className="score-icon" key={index} />;
        }
      })}
			<span>{"("}{score}{")"}</span>
    </div>
  );
}

export default Score;
