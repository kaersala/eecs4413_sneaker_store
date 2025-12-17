import React from "react";
import "./Hero.css";
import hero from "../Assets/hero2.jpg";

const Hero = () => {
  return (
    <div className="hero">
      <div className="hero_left">
        <div>
          <p>FIND YOUR  </p>
         <p>PERFECT FIT</p>
        </div>
      </div>
      <div className="hero_right">
        <img src={hero} />
      </div>
    </div>
  );
};

export default Hero;
