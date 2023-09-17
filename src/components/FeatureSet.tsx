import React from "react";
import FeatureCard from "./FeatureCard";

function FeatureSet() {
  return (
    <div className="flex flex-row flex-wrap items-center justify-center w-full gap-5 my-5 mb-20">
      <FeatureCard />
      <div className="flex flex-row flex-wrap items-center justify-center gap-5 lg:flex-col">
        <FeatureCard />
        <FeatureCard />
      </div>
      <FeatureCard />
    </div>
  );
}

export default FeatureSet;
