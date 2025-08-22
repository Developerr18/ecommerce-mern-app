import LatestCollection from "../components/LatestCollection";
import Hero from "../components/Hero";
import React from "react";
import BestSeller from "../components/BestSeller";

const Home = () => {
  return (
    <div>
      <Hero />
      <LatestCollection />
      <BestSeller />
    </div>
  );
};

export default Home;
