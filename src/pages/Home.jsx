import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const [companyDomain, setCompanyDomain] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (companyDomain.trim() === "") return alert("Please enter a company domain");
        navigate("/employees", { state: { companyDomain } });
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4
                                        animate-fadeIn fade">
            <h1 className="text-4xl font-bold mb-8 text-gray-800 select-none
                                         drop-shadow-md transition-transform duration-500 hover:scale-105">
                LinkedIn Employee Fetcher
            </h1>

            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg
                                     transform transition-transform duration-300 hover:shadow-2xl"
            >
                <label htmlFor="domain" className="block text-gray-700 text-lg font-semibold mb-3">
                    Enter Company Domain
                </label>
                <input
                    id="domain"
                    type="text"
                    value={companyDomain}
                    onChange={(e) => setCompanyDomain(e.target.value)}
                    placeholder="example.com"
                    className="w-full border border-gray-300 rounded px-4 py-3 mb-6
                                         focus:outline-none focus:ring-4 focus:ring-blue-400
                                         transition duration-300 placeholder-gray-400"
                />
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg
                                         hover:bg-blue-700 hover:scale-105 transition-transform duration-300 shadow-md"
                >
                    Fetch Employees
                </button>
            </form>
        </div>
    );
};

export default Home;
