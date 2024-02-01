"use client";
import SingleQuestion from "@/components/SingleQuestion";
import { getDateTimeForInputFields } from "@/util/DateTimeUtil";
import Spin from "@/util/Spin";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useFormik } from "formik";
import React, { useState } from "react";
import { toast } from "react-toastify";
import useIsBusy from "src/hooks/useIsBusy";
import { startQuiz } from "src/mutations/QuizMutations";
import { getTeacherOwnClassRoomsCodes } from "src/queries/classroom/ClassRoomQueries";
import { getQuizesQueryById } from "src/queries/quiz/QuizQueries";

const formInitValues = {
  name: "",
  description: "",
  status: "PUBLISHED",
  classCode: "",
  deadline: getDateTimeForInputFields(new Date()),
  id: "",
};

function QuizUpdatePage({ params }) {
  const quizId = params.id;
  const startQuizMutation = useMutation({
    mutationFn: async (dto) => {
      console.log(dto);
      const result = await startQuiz(dto);
      return result;
    },
    onSuccess: (data) => {
      formik.setFieldValue("id", data.id);
      toast.success("Quiz updated.");
    },
    onError: (error) => {
      toast.error("Failed: " + error.message);
    },
  });

  const isBusy = useIsBusy();
  const [currentQuestions, setCurrentQuestions] = useState([]);
  const formik = useFormik({
    initialValues: formInitValues,
    onSubmit: (values) => {
      const data = {
        ...values,
        questions: currentQuestions ?? [],
      };
      console.log(data);

      startQuizMutation.mutate(data);
    },
  });
  const teacherClassRoomsQuery = useQuery({
    queryKey: ["classRoom", "own"],
    queryFn: async () => {
      const result = await getTeacherOwnClassRoomsCodes();

      console.log(result);
      formik.setFieldValue("classCode", result?.[0]?.classCode);
      return result;
    },
  });

  const quizQuery = useQuery({
    queryKey: ["quiz", quizId],
    queryFn: async ({ queryKey }) => {
      const result = await getQuizesQueryById(queryKey[1]);
      console.log(result);

      formik.setValues({
        classCode: result.classCode,
        deadline: getDateTimeForInputFields(new Date(result.deadline)),
        description: result.description,
        id: result.id,
        name: result.name,
        status: result.status,
      });
      if (!result.id) throw new Error("Quiz details fetching failed");
      console.log(result.questions);
      setCurrentQuestions(result.questions);
      return result;
    },
  });

  const [currentId, setCurrentId] = useState(0);
  const removeQuestion = (questionId) => {
    setCurrentQuestions((current) => {
      console.log("before removing : ", current);
      console.log("removing questionid : ", questionId);
      const filteredList = current.filter((q) => q.id !== questionId);

      return [...filteredList];
    });
  };

  const addQuestion = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (currentQuestions.length === 20) return;
    setCurrentQuestions((current) => {
      return [...current, { id: currentId + 1 }];
    });
    setCurrentId((c) => ++c);
  };

  const onQuestionUpdate = (question) => {
    setCurrentQuestions((current) => {
      if (!question.id)
        throw new Error(
          "method QuizCreatePage.onQuestionUpdate  : Question id not found"
        );
      const filteredList = current.filter((q) => q.id !== question.id);
      return [...filteredList, question].sort((a, b) => {
        if (!a.id || !b.id)
          throw new Error(
            "Method QuizCreatePage.removeQuestion when sorting undefined ids found id1: ",
            a.id,
            " id2: ",
            b.id
          );
        if (a.id < b.id) return -1;
        if (a.id === b.id)
          throw new Error(
            "Method QuizCreatePage.remove Question two questions with same id found id: ",
            a.id
          );
        else return +1;
      });
    });
  };

  return (
    <div className="w-full min-h-screen p-3 md:p-5">
      {/* quiz description creation part */}
      <div className="bg-white min-h-[300px] rounded-md  p-3 md:p-5">
        <div className="flex flex-col items-center justify-center w-full my-2">
          <Spin show={isBusy} label="please wait" />
        </div>
        <h2 className="text-xs md:text-sm md:text-md 2xl:text-lg">
          Describe your question paper here..
        </h2>
        <form
          className="grid w-full grid-cols-1 md:grid-cols-2 "
          onSubmit={formik.handleSubmit}
        >
          {/* questionair name start */}
          <div className="my-3 ">
            <label
              htmlFor="questionairName"
              className="block text-xs font-medium text-gray-900 md:text-sm lg:text-md "
            >
              Name
            </label>
            <input
              type="text"
              id="questionairName"
              name="name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="ex:- Questionair on maths..."
              required
              value={formik.values.name}
              onChange={formik.handleChange}
            />
          </div>
          {/* questionair name end */}
          {/* questionair name start */}
          <div className="col-span-2 col-start-1 my-3">
            <label
              htmlFor="description"
              className="block text-xs font-medium text-gray-900 md:text-sm lg:text-md "
            >
              Description
            </label>
            <textarea
              type="text"
              id="description"
              name="description"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="Questionnaire description..."
              required
              value={formik.values.description}
              onChange={formik.handleChange}
            />
          </div>
          {/* Questionnaire name end */}

          {/* class select start */}
          <div className="my-3">
            <label
              htmlFor="classselect"
              className="block text-sm font-medium text-gray-900 "
            >
              Select a class
            </label>
            <select
              id="classselect"
              name="classCode"
              value={formik.values.classCode}
              onChange={formik.handleChange}
              disabled={!teacherClassRoomsQuery.isSuccess}
              className="  bg-gray-50 border border-gray-300 text-gray-900 text-xs md:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            >
              {teacherClassRoomsQuery.isSuccess &&
                teacherClassRoomsQuery.data?.map((i, index) => (
                  <option
                    key={index}
                    className="text-xs md:text-sm"
                    value={i.classCode}
                  >
                    {i.classCode}
                  </option>
                ))}
            </select>
          </div>
          {/* class select end */}
          {/* publish time pick start */}
          <div className="col-start-1 my-3">
            <label
              htmlFor="publishStatus"
              className="block text-xs font-medium text-gray-900 md:text-sm "
            >
              Select a publish status
            </label>

            <select
              id="publishStatus"
              name="status"
              value={formik.values.status}
              onChange={formik.handleChange}
              className="  bg-gray-50 border border-gray-300 text-gray-900 text-xs md:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            >
              <option className="text-xs md:text-sm" value="PUBLISHED">
                PUBLISHED
              </option>
              <option className="text-xs md:text-sm" value="UNPUBLISHED">
                UNPUBLISHED
              </option>
            </select>

            {/* <input
              defaultValue={getDateTimeForInputFields()}
              min={getDateTimeForInputFields()}
              type="datetime-local"
              id="publishdatetime"
              name="publishdatetime"
              className=" bg-gray-50 border border-gray-300 text-gray-900 text-xs md:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              required
            /> */}
          </div>
          {/* publish time pick end */}
          {/* valid time pick start */}
          <div className="col-start-1 my-3">
            <label
              htmlFor="validdatetime"
              className="block text-xs font-medium text-gray-900 md:text-sm "
            >
              This questionair available until
            </label>

            <input
              min={getDateTimeForInputFields()}
              type="datetime-local"
              id="validdatetime"
              name="deadline"
              value={formik.values.deadline}
              onChange={formik.handleChange}
              className=" bg-gray-50 border border-gray-300 text-gray-900 text-xs md:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              required
            />
            <span className="text-xs">
              you may need to enter time by typing on some browsers.
            </span>
          </div>
          {/* valie time pick end */}
          {/* create questionnaire button */}
          <div className="flex items-center justify-center col-span-2 col-start-1">
            <input
              className="self-center genbtn"
              type="submit"
              value={formik.values.id ? "Update" : "Create"}
              disabled={isBusy}
            />
          </div>
        </form>
      </div>
      {/* quiz description creation part end*/}

      {/* quiz creation div start */}
      <div className="flex flex-col w-full bg-white min-h-[300px] rounded-md  p-3 md:p-5 my-5">
        <h2 className="text-xs md:text-sm md:text-md 2xl:text-lg">
          Create Questions here.
        </h2>
        <h5 className="mb-5 text-xs">
          Maximum of 20 questions.{" "}
          <span className="text-blue-600">{currentQuestions.length}/20</span> of
          questions created.
        </h5>
        <button
          className="self-start genbtn"
          onClick={addQuestion}
          disabled={currentQuestions.length === 20 || isBusy}
        >
          Add Question
        </button>

        {currentQuestions.map((i, index) => (
          <SingleQuestion
            key={i.id}
            onRemoveQuestion={removeQuestion}
            onQuesionChange={onQuestionUpdate}
            questionId={i.id}
            index={index}
            initQuestionState={{
              id: i.id,
              text: i.text,
              mutipleCorrect: false,
              anyCorrect: false,
              editing: false,
              answers:
                i?.answers?.map((j) => ({
                  text: j.text,
                  correct: j.correct,
                  id: j.id,
                })) ?? [],
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default QuizUpdatePage;
