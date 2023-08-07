"use client";
import Link from "next/link";
import React, { useCallback, useState } from "react";
import {
  FaImage,
  FaPlusSquare,
  FaTextWidth,
  FaVideo,
  FaVolumeUp,
} from "react-icons/fa";

const quizTypes = [null, "text", "image", "video", "audio"];

const opbj = {
  quiz: [
    { id: 1, type: "text", content: "quiz text" },
    { id: 2, type: "image", content: "http://quizurl" },
  ],
  answerMode: "choose", //or write
  numberOfAnswers: 4,
  answers: [
    { text: "answer 1", id: 1 },
    { text: "answer 2", id: 2 },
    { text: "answer 3", id: 3 },
    { text: "answer 4", id: 4 },
  ],
};

function QuizComp({ searchParams }) {
  const [quizState, setQuizState] = useState({
    quiz: [],
    answerMode: null,
    numberOfAnswers: 0,
    answers: [],
  });

  const showModal = searchParams?.modal;

  const addQuiz = (quizType = 1, quizContent) => {
    setQuizState((current) => {
      current.quiz.push({
        id: current.quiz.length + 1,
        type: quizTypes[quizType],
        content: quizContent,
      });
      return { ...current };
    });
  };

  return (
    <>
      <div className="relative flex flex-col w-full px-2 py-2 bg-white border border-gray-500 drop-shadow-md ">
        <div className="self-start">
          {/* 
            quiz content start
          */}

          {quizState.quiz.map((q) => {
            switch (q.type) {
              case quizTypes[1]:
                return <area className="w-full min-h-[50px]" />;
              case quizTypes[2]:
                return (
                  <input
                    type="file"
                    className="border border-gray-500 w-[50%] bg-[url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSshrGc3H1tmJPwlIDts0DaK67hMU45v6NH6y_5txdY&s')]"
                  />
                );
            }
          })}

          {/* qquiz content end */}

          <Link href="?modal=true">
            <AddComponent />
          </Link>
        </div>
      </div>
      {showModal && <AddQuizDetailComp />}
    </>
  );
}

const AddQuizDetailComp = ({ onSelectType = () => {} }) => {
  const [selected, setSelected] = useState(1);

  const setAsSelected = useCallback((value) => {
    return (event) => {
      console.log("selected==", value);
      setSelected(value);
      event.stopPropagation();
    };
  }, []);

  const setStyleAsSelected = useCallback(
    (value) => {
      return selected == value
        ? {
            backgroundColor: "rgb(59 130 246)",
            color: "white",
            borderColor: "rgb(29 78 216)",
          }
        : {};
    },
    [selected]
  );

  return (
    <div className="flex justify-center items-center backdrop-blur-sm w-[100vw] h-[100vh] fixed inset-0 bg-[rgba(0,0,0,0.5)]">
      <div className="flex flex-col bg-white  min-w-[310px] min-h-[300px] gap-1 px-5 py-2 ">
        <div
          className="flex flex-row items-center justify-center gap-2 py-2 my-2 border border-transparent cursor-pointer hover:bg-zinc-300"
          onClick={setAsSelected(1)}
          style={setStyleAsSelected(1)}
        >
          <FaTextWidth />
          <span>Text</span>
        </div>
        <div
          className="flex flex-row items-center justify-center gap-2 py-2 my-2 border border-transparent cursor-pointer hover:bg-zinc-300"
          onClick={setAsSelected(2)}
          style={setStyleAsSelected(2)}
        >
          <FaImage />
          <span>Image</span>
        </div>
        <div
          className="flex flex-row items-center justify-center gap-2 py-2 my-2 border border-transparent cursor-pointer hover:bg-zinc-300"
          onClick={setAsSelected(3)}
          style={setStyleAsSelected(3)}
        >
          <FaVideo />
          <span>Video</span>
        </div>
        <div
          className="flex flex-row items-center justify-center gap-2 py-2 my-2 border border-transparent cursor-pointer hover:bg-zinc-300"
          onClick={setAsSelected(4)}
          style={setStyleAsSelected(4)}
        >
          <FaVolumeUp />
          <span>Audio</span>
        </div>

        <div className="flex flex-row items-center justify-around">
          <Link href="?">
            <button className="self-center px-10 py-1 text-xs text-white bg-blue-500 drop-shadow-md hover:bg-blue-700">
              cancel
            </button>
          </Link>
          <button
            className="self-center px-10 py-1 text-xs text-white bg-blue-500 drop-shadow-md hover:bg-blue-700"
            onClick={() => {
              onSelectType(selected);
            }}
          >
            add
          </button>
        </div>
      </div>
    </div>
  );
};

const AddComponent = () => {
  return (
    <div className="flex flex-row items-center gap-2 px-5 py-2 border border-transparent cursor-pointer hover:border-gray-500 px">
      <FaPlusSquare />
      <span>Add</span>
    </div>
  );
};
export default QuizComp;
