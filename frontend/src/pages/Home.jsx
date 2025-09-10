import React from "react";
import Hero from "../components/Hero";
import JobSearch from "../components/ui/Home/JobSearch";
import Features from "../components/ui/Home/Features";
import ScrollCard from "../components/ui/Home/ScrollCard";
import CTA from "../components/ui/Home/CTA";

const Home = () => {
  // const { isAuthenticated, user } = React.useContext(AuthContext);
  // console.log("isAuthenticated:", isAuthenticated, "user:", user); // Debug log

  return (
    <div 
      className="home" 
      style={{ 
        backgroundColor: "#060010",
        overflowX: "hidden",
        width: "100vw",
        minHeight: "100vh",
        position: "relative"
      }}
    >
      <Hero />
      <JobSearch />
      <Features />
      <ScrollCard />
      <CTA />
    </div>
  );
};

export default Home;