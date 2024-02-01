"use client";
import React, { useEffect, useState } from "react";
import AnswerAddModal from "./AnswerAddModal";
import { FaPencilAlt, FaRemoveFormat, FaTrashAlt } from "react-icons/fa";

// const questionStateObj = {
//   id: questionId,
//   question: "What is the name of current president?",
//   mutipleCorrect: false,
//   anyCorrect: true,
//   editing: true,
//   answers: [
//     { correct: true, text: "asnwer one", id: 1 },
//     { correct: false, text: "asnwer two", id: 2 },
//     { correct: false, text: "asnwer three", id: 3 },
//     { correct: false, text: "asnwer four", id: 4 },
//   ],
// }

function SingleQuestion({
  onQuesionChange = () => {},
  onRemoveQuestion = () => {},
  questionId,
  index,
  initQuestionState = {},
}) {
  const [haveChanges, setHaveChanges] = useState(false);
  const [showModal, setShowModal] = useState({ show: false, data: {} });
  const [questionState, setQuestionState] = useState({
    id: initQuestionState.id,
    text: initQuestionState.text,
    mutipleCorrect: false,
    anyCorrect: false,
    editing: false,
    answers: initQuestionState.answers ?? [],
  });

  console.log(questionState);
  console.log(initQuestionState);
  const getFieldNameForAnswer = (answerId) => {
    return `q${questionState.id}-${answerId}`;
  };

  const removeAnswer = (answerId) => {
    setHaveChanges(true);
    setQuestionState((current) => {
      const filteredAnswers = current?.answers?.filter(
        (c) => c.id !== answerId
      );
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
        current.answers.length === 0
          ? 0
          : current.answers.sort(sortAnswersWithId)[current.answers.length - 1]
              .id;

      if (answerId === 0) {
        return {
          ...current,
          answers: [...current.answers, { ...answer, id: maxCurrentId + 1 }],
        };
      } else {
        const existingAnswer = current.answers.find((a) => a.id === answer.id);
        if (!existingAnswer)
          throw new Error("Existing answer not found for id: ", answer.id);

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
      <div className="relative grid w-full grid-cols-2 p-6 my-4 border border-gray-500 rounded-md ">
        <span className="absolute text-sm left-1 top-1">{index + 1})</span>
        <FaRemoveFormat
          className="absolute right-0 top-[-20px] cursor-pointer hover:text-red-500 w-[20px] h-[20px]"
          onClick={() => {
            onRemoveQuestion(questionId);
          }}
        />
        <textarea
          rows={3}
          defaultValue={questionState.text}
          placeholder="type your question here..."
          onInput={(event) => {
            setHaveChanges(true);
            setQuestionState((current) => ({
              ...current,
              text: event.target.value,
            }));
          }}
          className="col-span-2 p-2 mb-2 text-xs text-gray-900 border border-gray-300 rounded-lg md:text-sm lg:text-md focus:outline-blue-700 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
        />
        {questionState.answers.map((answer, index) => {
          return (
            <div
              className="flex items-start col-span-2 gap-1 mb-4 md:col-span-1 sm:gap-2"
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
                className="flex-1 ml-2 text-sm font-medium text-gray-900 break-words"
              >
                {answer.id}){"  "}
                {answer.text}
              </label>
            </div>
          );
        })}

        <div className="flex items-center justify-end w-full col-span-2 ">
          <button
            className="self-end px-5 py-2 text-xs text-white bg-blue-700 rounded-md cursor-pointer hover:bg-blue-600"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              setShowModal({ show: true, data: {} });
            }}
          >
            Add answer
          </button>
        </div>

        <div className="flex items-center justify-center col-span-2">
          <button
            className="self-start px-5 py-2 text-xs text-white bg-blue-700 rounded-md cursor-pointer disabled:bg-gray-500 disabled:hover:bg-gray-500 disabled:cursor-default hover:bg-blue-600"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              onQuesionChange(questionState);
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
