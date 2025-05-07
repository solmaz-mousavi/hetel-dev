import React from "react";
import "./footer.css";
import { FaLocationDot, FaPhone } from "react-icons/fa6";
import { MdCopyright } from "react-icons/md";
import Social from "../social/Social";
import Navbar from "../navbar/Navbar";

export default function Footer() {
  return (
    <>
      <footer className="footer-wrapper">
        <div className="container footer-container">
          <div className="footer-item__aboutus">
            <h5>درباره ما بیشتر بدانید</h5>
            <p>
              لورم ایپسوم متن ساخم از صنعت چاپ و با استفاده از طراحان گرافیک است
              چاپگرها و متون بلکه روزنامه و ده از طراحان گرافیک است چاپگرها و
              متون بلکه روزنامه و ده از طراحان گرافیک است چاپگرها و متون بلکه
              روزنامه و ده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و ده
              از طست زنامه و مجله در ستون و سطرآنچنان که لازم است{" "}
            </p>
          </div>
          <div className="footer-item__links">
            <h5>لینک های سریع</h5>
            <Navbar />
          </div>

          <div className="footer-item__info">
            <h5>آدرس و تلفن</h5>
            <div className="footer-info">
              <FaLocationDot className="icon" />
              <p>
                لورم ایپسوم متن و متون بلکه روزنامه و مجله در ستون و سطرآنچنان
                که لازم است{" "}
              </p>
            </div>
            <div className="footer-info">
              <FaPhone />
              <p>09125846584571</p>
            </div>
            <Social />
          </div>

          <div className="footer-item__location">
            <h5>ما رو اینجا پیدا کنید</h5>

            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d3850.131416318982!2d51.41815995312054!3d35.761576134836524!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2s!4v1727103775656!5m2!1sen!2s"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="location"
              title="darsman hotel"
            ></iframe>
          </div>
        </div>
      </footer>
      <div className="copyRight-container">
        <MdCopyright />
        <p>کلیه حقوق این سایت متعلق به هتل آسمان می باشد </p>
      </div>
    </>
  );
}
