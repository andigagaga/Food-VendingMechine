import Lottie from "lottie-react";
import { Link } from "react-router-dom";
import BackgroundImage from "../assets/backgorund.jpg";
import ButtonHome from "../assets/button-home.json";
import HomeIcon from "../assets/home-icon.json";

export default function Home() {
  return (
    <div
      className="container-fluid h-screen flex flex-col items-center bg-cover justify-center"
      style={{ backgroundImage: `url(${BackgroundImage})` }}
    >
      <p className="text-black bg-white p-3 rounded-full">
        Halo, mau makan apa hari ini ?
      </p>
      <Lottie animationData={HomeIcon} className="w-60" />
      <Link to={"/vendingMechine"}>
        <Lottie animationData={ButtonHome} className="w-96" />
      </Link>
    </div>
  );
}