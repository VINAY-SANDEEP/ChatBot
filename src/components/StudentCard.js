import React from "react";
import {
  FaIdBadge,
  FaUniversity,
  FaEnvelope,
  FaPhone,
  FaVenusMars,
  FaGraduationCap,
} from "react-icons/fa";

const StudentCard = ({ student }) => {
  const getImageUrl = (student) => {
    if (student.college === "ACET") {
      return `https://info.aec.edu.in/ACET/StudentPhotos/${student.roll_number}.jpg`;
    } else if (student.college === "AEC") {
      return `https://info.aec.edu.in/AEC/StudentPhotos/${student.roll_number}.jpg`;
    }
    return "https://via.placeholder.com/150?text=No+Photo";
  };

  return (
    <div className="max-w-sm mx-auto bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700 p-6 text-center">
      <img
        className="h-32 w-32 mx-auto rounded-full object-cover border-4 border-indigo-500 shadow-md mb-4"
        src={getImageUrl(student)}
        alt={student.Name}
      />
      <h2 className="text-2xl font-extrabold text-indigo-700 dark:text-indigo-400">
        {student.Name}
      </h2>
      <p className="mt-1 text-gray-600 dark:text-gray-300 flex justify-center items-center gap-2">
        <FaIdBadge className="text-indigo-500" /> {student.roll_number}
      </p>
      <p className="mt-1 text-gray-600 dark:text-gray-300 flex justify-center items-center gap-2">
        <FaUniversity className="text-indigo-500" /> {student.college}
      </p>
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700 dark:text-gray-300 text-sm text-left">
        <div className="flex items-center gap-2">
          <FaGraduationCap className="text-indigo-500" />
          <span><strong>Branch:</strong> {student.branch || "N/A"}</span>
        </div>
        <div className="flex items-center gap-2">
          <FaGraduationCap className="text-indigo-500" />
          <span><strong>Year:</strong> {student.year || "N/A"}</span>
        </div>
        <div className="flex items-center gap-2">
          <FaPhone className="text-indigo-500" />
          <span><strong>Mobile:</strong> {student.mobile || "N/A"}</span>
        </div>
        <div className="flex items-center gap-2">
          <FaEnvelope className="text-indigo-500" />
          <span><strong>Email:</strong> {student.email || "N/A"}</span>
        </div>
        <div className="flex items-center gap-2 col-span-full">
          <FaVenusMars className="text-indigo-500" />
          <span><strong>Gender:</strong> {student.gender || "N/A"}</span>
        </div>
      </div>
    </div>
  );
};

export default StudentCard;
