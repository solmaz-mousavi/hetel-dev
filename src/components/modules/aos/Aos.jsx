import { useState } from "react";
import "animate.css";
import "./aos.css";
import { InView } from "react-intersection-observer";
// import { InView } from "react-intersection-observer";

// ---- animation on scroll------------------------
// When a <div> is placed between AOS (Animate On Scroll) tags,
// it triggers an animation as soon as it appears on the screen.
// Setting once="true" ensures the animation plays only once.
// The aosStyle class references an animation style from the Animate.css library.

function Aos({ children, aosStyle, once = false, className }) {
  const [repeat, setRepeat] = useState(true);
  const repeatHandler = () => {
    if (once) {
      setTimeout(function () {
        setRepeat(false);
      }, 1000);
    }
  };

  return (
    <InView>
      {({ inView, ref }) => (
        <div ref={ref} className="aos-container">
          <div className={className}>
            <div
              className={`${
                !repeat
                  ? ""
                  : `${
                      inView
                        ? `animate__animated animate__${aosStyle}`
                        : "hidden"
                    }`
              } `}
              onAnimationEnd={repeatHandler}
            >
              {children}
            </div>
          </div>
        </div>
      )}
    </InView>
  );
}

export default Aos;
