import React from "react";

function AssignmentDetails() {
  return (
    <div className="w-full overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
            >
              Assignment Name
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
            >
              Class
            </th>
            <th
              scope="col"
              className="hidden px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase sm:table-cell"
            >
              Teacher
            </th>
            <th
              scope="col"
              className="hidden px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase md:table-cell"
            >
              Due Date
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
            >
              Status
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((item, index) => (
            <tr key={index}>
              <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                {item.assignmentName}
              </td>
              <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                {item.class}
              </td>
              <td className="hidden px-6 py-4 text-sm text-gray-500 whitespace-nowrap sm:table-cell">
                {item.teacher}
              </td>
              <td className="hidden px-6 py-4 text-sm text-gray-500 whitespace-nowrap md:table-cell">
                {item.dueDate}
              </td>
              <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                {item.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AssignmentDetails;
