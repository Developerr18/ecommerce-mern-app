import LatestCollection from "../components/LatestCollection";
import Hero from "../components/Hero";
import React from "react";
import BestSeller from "../components/BestSeller";
import OurPolicy from "../components/OurPolicy";
import NewsLetterbox from "../components/NewsLetterBox";

const Home = () => {
  return (
    <div>
      <Hero />
      <LatestCollection />
      <BestSeller />
      <OurPolicy />
      <NewsLetterbox />
    </div>
  );
};

export default Home;
