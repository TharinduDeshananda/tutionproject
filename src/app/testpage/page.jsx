import React from "react";
import ImageCard from "@/components/ImageCard";
import SwipableContainer from "@/components/SwipableContainer";
import FeatureCard from "@/components/FeatureCard";
import FeatureSet from "@/components/FeatureSet";
import Footer from "@/components/Footer";
import AssignmentSummary from "@/components/AssignmentSummary";
function page() {
  return (
    <div className="w-full h-[100vh] flex justify-center items-center">
      <AssignmentSummary />
    </div>
  );
}

export default page;
