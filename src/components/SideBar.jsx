import React from "react";
import SideBarItem from "./SideBarItem";
import {
  FaBook,
  FaComment,
  FaEnvelope,
  FaGraduationCap,
  FaHome,
  FaQuestionCircle,
  FaUsers,
} from "react-icons/fa";
import Image from "next/image";
import Avatar from "./Avatar";

function SideBar() {
  return (
    <div className="hidden lg:flex gap-5 sticky top-0 left-0 w-[270px] h-[100vh] bg-white  flex-col justify-start items-center drop-shadow-md border-r-2 border-r-gray-200">
      <div className="w-full h-[108px] flex justify-center items-center relative">
        <div className="h-[80px] w-[80px] relative">
          <Image alt="" src={"/atom.png"} fill />
        </div>
      </div>

      <SideBarItem title="Home">
        <FaHome />
      </SideBarItem>
      <SideBarItem title="Classes">
        <FaGraduationCap />
      </SideBarItem>
      <SideBarItem title="Teachers">
        <FaUsers />
      </SideBarItem>
      <SideBarItem title="Assignments">
        <FaBook />
      </SideBarItem>
      <SideBarItem title="Quizes">
        <FaQuestionCircle />
      </SideBarItem>
      <SideBarItem title="Notices">
        <FaEnvelope />
      </SideBarItem>
      <SideBarItem title="Messages">
        <FaComment />
      </SideBarItem>

      <div className="w-full mt-auto mb-2">
        <Avatar />
      </div>
    </div>
  );
}

export default SideBar;
