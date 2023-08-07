import SingleQuestion from "@/components/SingleQuestion";
import { getDateTimeForInputFields } from "@/util/DateTimeUtil";
import React from "react";

function QuizCreatePage() {
  return (
    <div className="w-full min-h-screen p-3 md:p-5">
      {/* quiz description creation part */}
      <div className="bg-white min-h-[300px] rounded-md  p-3 md:p-5">
        <h2 className="text-xs md:text-sm md:text-md 2xl:text-lg">
          Describe your qustion paper here..
        </h2>
        <div className="grid w-full grid-cols-1 md:grid-cols-2 ">
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
              name="questionairName"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="ex:- Questionair on maths..."
              required
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
              name="classselect"
              className="  bg-gray-50 border border-gray-300 text-gray-900 text-xs md:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            >
              <option className="text-xs md:text-sm" value="maths-10">
                Maths Grade 10
              </option>
              <option className="text-xs md:text-sm" value="science-09">
                Science Grade 09
              </option>
              <option className="text-xs md:text-sm" value="science-06">
                Science Grade 06
              </option>
              <option className="text-xs md:text-sm" value="science-07">
                Science Grade 07
              </option>
            </select>
          </div>
          {/* class select end */}
          {/* publish time pick start */}
          <div className="col-start-1 my-3">
            <label
              htmlFor="publishdatetime"
              className="block text-xs font-medium text-gray-900 md:text-sm "
            >
              Select a publish date
            </label>

            <input
              defaultValue={getDateTimeForInputFields()}
              min={getDateTimeForInputFields()}
              type="datetime-local"
              id="publishdatetime"
              name="publishdatetime"
              className=" bg-gray-50 border border-gray-300 text-gray-900 text-xs md:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              required
            />
            <span className="text-xs">
              you may need to enter time by typing on some browsers.
            </span>
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
              defaultValue={getDateTimeForInputFields()}
              min={getDateTimeForInputFields()}
              type="datetime-local"
              id="validdatetime"
              name="validdatetime"
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
            <button className="self-center px-5 py-3 text-white bg-blue-700 cursor-pointer hover:bg-blue-600">
              Create Questionnaire
            </button>
          </div>
        </div>
      </div>
      {/* quiz description creation part end*/}

      {/* quiz creation div start */}
      <div className="flex flex-col w-full bg-white min-h-[300px] rounded-md  p-3 md:p-5 my-5">
        <h2 className="mb-5 text-xs md:text-sm md:text-md 2xl:text-lg">
          Create Questions here.
        </h2>
        <button className="self-start px-5 py-3 text-white bg-blue-700 cursor-pointer hover:bg-blue-600">
          Add Question
        </button>

        <SingleQuestion />
      </div>
      {/* quiz creation div end */}
    </div>
  );
}

export default QuizCreatePage;
