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
    <div className="max-w-sm mx-auto rounded-xl overflow-hidden shadow-xl border border-gray-200 dark:border-gray-700 p-6 text-center bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 text-white">
      <img
        className="h-32 w-32 mx-auto rounded-full object-cover border-4 border-white shadow-md mb-4"
        src={getImageUrl(student)}
        alt={student.Name}
      />
      <h2 className="text-2xl font-extrabold">{student.Name}</h2>
      <p className="mt-1 flex justify-center items-center gap-2">
        <FaIdBadge className="text-white" /> {student.roll_number}
      </p>
      <p className="mt-1 flex justify-center items-center gap-2">
        <FaUniversity className="text-white" /> {student.college}
      </p>
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-left">
        <div className="flex items-center gap-2">
          <FaGraduationCap className="text-white" />
          <span><strong>Branch:</strong> {student.branch || "N/A"}</span>
        </div>
        <div className="flex items-center gap-2">
          <FaGraduationCap className="text-white" />
          <span><strong>Year:</strong> {student.year || "N/A"}</span>
        </div>
        <div className="flex items-center gap-2">
          <FaPhone className="text-white" />
          <span><strong>Mobile:</strong> {student.mobile || "N/A"}</span>
        </div>
        <div className="flex items-center gap-2">
          <FaEnvelope className="text-white" />
          <span><strong>Email:</strong> {student.email || "N/A"}</span>
        </div>
        <div className="flex items-center gap-2 col-span-full">
          <FaVenusMars className="text-white" />
          <span><strong>Gender:</strong> {student.gender || "N/A"}</span>
        </div>
      </div>
    </div>
  );
};

export default StudentCard;
