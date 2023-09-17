import FeatureSet from "@/components/FeatureSet";
import Footer from "@/components/Footer";
import ImageCard from "@/components/ImageCard";
import StudentQuoteComp from "@/components/StudentQuoteComp";
import SwipableContainer from "@/components/SwipableContainer";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    // main wrapper
    <div className="w-full min-h-[100vh] flex flex-col">
      <div className="w-full h-[60vh] relative">
        <Image
          src={"/banner.jpg"}
          alt="teacher banner"
          fill
          objectFit="cover"
        />
        <div className="absolute top-0 left-0 flex items-center justify-center w-full h-full bg-[rgba(12,12,12,0.5)]">
          <Link href={"/dashboard"}>
            <button className="px-8 py-5 text-white bg-blue-600 rounded-lg cursor-pointer hover:bg-blue-800 drop-shadow-md ">
              JOIN OUR CLASSES
            </button>
          </Link>
        </div>
      </div>
      <StudentQuoteComp />
      <h1 className="my-5 mb-10 text-3xl font-bold text-center text-gray-500">
        What you get from us!
      </h1>
      <FeatureSet />
      <Footer />
    </div>
  );
}
