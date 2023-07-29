import { randomQuizesList } from "@/constants";
import React, { useMemo } from "react";

function QuizesSummary() {
  const data = useMemo(() => randomQuizesList, []);
  return (
    <div className="w-full overflow-x-auto rounded-md drop-shadow-md">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-2 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
            >
              Name
            </th>
            <th
              scope="col"
              className="px-2 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
            >
              Class
            </th>
            <th
              scope="col"
              className="hidden px-2 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase sm:table-cell"
            >
              Status
            </th>
            <th
              scope="col"
              className="hidden px-2 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase md:table-cell"
            >
              Marks
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((item, index) => (
            <tr key={index}>
              <td className="px-2 py-4 text-xs font-medium text-gray-900 whitespace-nowrap">
                {item.name}
              </td>
              <td className="px-2 py-4 text-xs text-gray-500 whitespace-nowrap">
                {item.class}
              </td>
              <td className="hidden px-2 py-4 text-xs text-gray-500 whitespace-nowrap sm:table-cell">
                {item.status}
              </td>
              <td className="hidden px-2 py-4 text-xs text-gray-500 whitespace-nowrap md:table-cell">
                {item.Marks}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default QuizesSummary;
