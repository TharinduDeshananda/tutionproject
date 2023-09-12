import React from "react";

function NoticeFilter() {
  return (
    <div className="gap-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 bg-white shadow-md rounded-sm mx-1 sm:mx-2 md:mx-5 p-1 sm:p-2 md:p-5 my-5">
      <div className="flex flex-col">
        <label htmlFor="title" className="text-xs md:text-sm">
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg outline-none focus:border-blue-500 block w-full p-2.5 "
          placeholder="Title"
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="dateAfter" className="text-xs md:text-sm">
          Date After
        </label>
        <input
          type="date"
          id="dateAfter"
          name="dateAfter"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg outline-none focus:border-blue-500 block w-full p-2.5 "
          placeholder="Title"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="dateBefore" className="text-xs md:text-sm">
          Date Before
        </label>
        <input
          type="date"
          id="dateBefore"
          name="dateBefore"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg outline-none focus:border-blue-500 block w-full p-2.5 "
          placeholder="Title"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="sender" className="text-xs md:text-sm">
          Sender
        </label>
        <input
          type="text"
          id="sender"
          name="sender"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg outline-none focus:border-blue-500 block w-full p-2.5 "
          placeholder="Sender"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="className" className="text-xs md:text-sm">
          Class Name
        </label>
        <input
          type="text"
          id="className"
          name="className"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg outline-none focus:border-blue-500 block w-full p-2.5 "
          placeholder="Sender"
        />
      </div>
      <div className="col-span-1 sm:col-span-2 md:col-span-3 flex justify-center">
        <button className="bg-blue-700 text-white text-xs md:text-base px-5 py-2 rounded-md hover:bg-blue-500 cursor-pointer">
          Filter
        </button>
      </div>
    </div>
  );
}

export default NoticeFilter;
