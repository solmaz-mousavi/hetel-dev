import "./home.css";
import Slider from "../../components/slider/Slider";
import Intro from "../../components/intro/Intro";
import Status from "../../components/status/Status";
import FoodCategory from "../../components/foodCategory/FoodCategory";
import RoomCategory from "../../components/roomCategory/RoomCategory";

export default function Home() {
  return (
    <section className="home-wrapper">
      <Slider />
      <Intro />
      <Status />
      <FoodCategory />
      <RoomCategory />
    </section>
  );
}
