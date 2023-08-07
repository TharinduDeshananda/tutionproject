"use client";
import React, { useState } from "react";
import AnswerAddModal from "./AnswerAddModal";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";

const questionStateObj = {
  question: "What is the name of current president?",
  mutipleCorrect: false,
  editing: true,
  answers: [
    { correct: true, text: "asnwer one" },
    { correct: false, text: "asnwer two" },
    { correct: false, text: "asnwer three" },
    { correct: false, text: "asnwer four" },
  ],
};

function SingleQuestion({ onQuesionChange = () => {}, questionId }) {
  const [haveChanges, setHaveChanges] = useState(true);
  const [showModal, setShowModal] = useState({ show: false, data: {} });
  const [questionState, setQuestionState] = useState({
    id: questionId,
    question: "What is the name of current president?",
    mutipleCorrect: false,
    anyCorrect: true,
    editing: true,
    answers: [
      { correct: true, text: "asnwer one", id: 1 },
      { correct: false, text: "asnwer two", id: 2 },
      { correct: false, text: "asnwer three", id: 3 },
      { correct: false, text: "asnwer four", id: 4 },
    ],
  });

  const getFieldNameForAnswer = (answerId) => {
    return `q${questionState.id}-${answerId}`;
  };

  const removeAnswer = (answerId) => {
    setHaveChanges(true);
    setQuestionState((current) => {
      const filteredAnswers = current.answers.filter((c) => c.id !== answerId);
      for (let i = 0; i < filteredAnswers.length; ++i) {
        filteredAnswers[i].id = i + 1;
      }
      return { ...current, answers: [...filteredAnswers] };
    });
  };

  const onAnswerChange = (answerId, correct) => {
    setHaveChanges(true);
    setQuestionState((current) => {
      const answer = current.answers.find((a) => {
        return a.id === answerId;
      });

      if (!answer) {
        throw new Error("method onAnswerChange() : Specified answer not found");
      }
      answer.correct = correct;

      return { ...current };
    });
  };

  const sortAnswersWithId = (a, b) => {
    if (a.id < b.id) return -1;
    if (a.id === b.id)
      throw new Error("method addAnswer() : answers with same id found");
    if (a.id > b.id) return +1;
  };

  const addAnswer = (answer) => {
    setHaveChanges(true);
    setQuestionState((current) => {
      const answerId = answer?.id ?? 0;
      const maxCurrentId =
        current.answers.sort(sortAnswersWithId)[current.answers.length - 1].id;

      if (answerId === 0) {
        return {
          ...current,
          answers: [...current.answers, { ...answer, id: maxCurrentId + 1 }],
        };
      } else {
        const existingAnswer = current.answers.find((a) => a.id === answer.id);
        if (!existingAnswer)
          throw new Error("Existing answer not found for id: ", answer.id);
        if (answer.correct === true)
          current.answers.forEach((c) => (c.correct = false));
        if (answer.correct === false && existingAnswer.correct) {
          current.anyCorrect = false;
        }
        return {
          ...current,
          answers: [
            ...current.answers.filter((b) => b.id != existingAnswer.id),
            answer,
          ].sort(sortAnswersWithId),
        };
      }
    });
  };

  return (
    <>
      <div className=" grid w-full  p-5 my-4 border border-gray-500 rounded-md grid-cols-2">
        <textarea
          rows={3}
          defaultValue={questionState.question}
          placeholder="type your question here..."
          onInput={() => {
            setHaveChanges(true);
          }}
          className="col-span-2 p-2 mb-2 text-xs  md:text-sm lg:text-md focus:outline-blue-700 bg-gray-50 border border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 "
        />
        {questionState.answers.map((answer, index) => {
          return (
            <div
              className="flex items-center mb-4 col-span-2 md:col-span-1 gap-1 sm:gap-2"
              key={answer.id}
            >
              <FaPencilAlt
                className="cursor-pointer hover:text-green-500"
                onClick={() => {
                  setShowModal({
                    show: true,
                    data: {
                      answerId: answer.id,
                      text: answer.text,
                      correct: answer.correct,
                    },
                  });
                }}
              />
              <FaTrashAlt
                className="cursor-pointer hover:text-red-500"
                onClick={() => {
                  removeAnswer(answer.id);
                }}
              />
              <input
                id={getFieldNameForAnswer(answer.id)}
                type="checkbox"
                checked={answer.correct}
                name={getFieldNameForAnswer(answer.id)}
                onChange={(event) => {
                  onAnswerChange(answer.id, event.target.checked);
                }}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 "
              />
              <label
                htmlFor={getFieldNameForAnswer(answer.id)}
                className="ml-2 text-sm font-medium text-gray-900 flex-1"
              >
                {answer.id}){"  "}
                {answer.text}
              </label>
            </div>
          );
        })}

        <div className="flex items-center justify-end col-span-2 w-full ">
          <button
            className="self-end px-5 py-2 text-xs rounded-md text-white bg-blue-700 cursor-pointer hover:bg-blue-600"
            onClick={() => {
              setShowModal({ show: true, data: {} });
            }}
          >
            Add answer
          </button>
        </div>

        <div className="flex items-center justify-center col-span-2">
          <button
            className="disabled:bg-gray-500 disabled:hover:bg-gray-500 disabled:cursor-default self-start px-5 py-2 text-white bg-blue-700 cursor-pointer hover:bg-blue-600 text-xs rounded-md"
            onClick={() => {
              onQuesionChange();
              setHaveChanges(false);
            }}
            disabled={!haveChanges}
          >
            Apply Changes
          </button>
        </div>
        {showModal.show && (
          <AnswerAddModal
            onCancel={() => setShowModal({ show: false, data: {} })}
            onAddAnswer={addAnswer}
            answerId={showModal.data.answerId}
            text={showModal.data.text}
            correct={showModal.data.correct}
          />
        )}
      </div>
    </>
  );
}

export default SingleQuestion;
