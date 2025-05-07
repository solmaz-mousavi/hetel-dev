import "./home.css";
import Slider from "../../components/templates/slider/Slider";
import Intro from "../../components/templates/intro/Intro";
import Status from "../../components/templates/status/Status";
import FoodCategory from "../../components/templates/foodCategory/FoodCategory";
import RoomCategory from "../../components/templates/roomCategory/RoomCategory";

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
