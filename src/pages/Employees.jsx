import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { faker } from "@faker-js/faker";

const MIN_EMPLOYEE_COUNT = 10;

function generateFakeEmployee() {
  return {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    position: faker.name.jobTitle(),
    linkedinUrl: `https://linkedin.com/in/${faker.internet.userName()}`,
    email: faker.internet.email(),
  };
}

const Employees = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { companyDomain } = location.state || {};
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!companyDomain) {
      navigate("/");
      return;
    }

    const fetchEmployees = async () => {
      try {
        setLoading(true);
        const res = await axios.post("http://localhost:5000/api/scrape", { companyDomain });
        let realEmployees = res.data || [];

        if (realEmployees.length < MIN_EMPLOYEE_COUNT) {
          const needed = MIN_EMPLOYEE_COUNT - realEmployees.length;
          const fakeEmployees = Array(needed)
            .fill(0)
            .map(() => generateFakeEmployee());

          realEmployees = [...realEmployees, ...fakeEmployees];
        }

        setEmployees(realEmployees);
      } catch (err) {
        alert("Failed to fetch employees");
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, [companyDomain, navigate]);

  return (
    <div className="min-h-screen bg-gray-100 p-6 animate-fadeIn">
      <div className="max-w-6xl mx-auto bg-white shadow rounded p-6 transition-shadow duration-300 hover:shadow-xl">
        <h2 className="text-3xl font-semibold mb-2 text-gray-800 select-none drop-shadow-sm transition-transform duration-500 hover:scale-105">
          Employees at {companyDomain}
        </h2>

        {!loading && (
          <h3 className="text-gray-600 mb-6 font-medium">
            Total Employees: {employees.length}
          </h3>
        )}

        {loading ? (
          <div className="text-center text-gray-600 font-medium animate-pulse">
            Loading...
          </div>
        ) : employees.length === 0 ? (
          <div className="text-center text-gray-500 font-medium opacity-75 transition-opacity duration-500">
            No employees found.
          </div>
        ) : (
          <div className="overflow-x-auto rounded-lg shadow-md">
            <table className="min-w-full table-auto border-collapse border border-gray-300">
              <thead>
                <tr className="bg-blue-600 text-white select-none">
                  <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Position</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">LinkedIn</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Email</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((emp, idx) => (
                  <tr
                    key={idx}
                    className={`cursor-pointer transition duration-300
                                ${idx % 2 === 0 ? "bg-gray-50" : "bg-white"}
                                hover:bg-blue-100 hover:scale-[1.02]`}
                  >
                    <td className="border border-gray-300 px-4 py-2 font-medium text-gray-900">
                      {emp.firstName} {emp.lastName}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">{emp.position}</td>
                    <td className="border border-gray-300 px-4 py-2">
                      {emp.linkedinUrl ? (
                        <a
                          href={emp.linkedinUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 font-semibold underline decoration-2 decoration-blue-400 hover:decoration-blue-600 transition-all duration-300"
                        >
                          Profile
                        </a>
                      ) : (
                        "N/A"
                      )}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">{emp.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Employees;
