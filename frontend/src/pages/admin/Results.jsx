import {
    useEffect,
    useState,
} from "react";

import {
    Link,
} from "react-router-dom";

import {
    FaTrash,
    FaPlus,
} from "react-icons/fa";
import API from "../../services/api";
import AdminLayout from "../../components/admin/AdminLayout";


function Results() {

    const [results, setResults] =
        useState([]);

    const [loading, setLoading] =
        useState(true);


    useEffect(() => {
        // FETCH RESULTS
        const fetchResults =
            async () => {

                try {

                    const { data } =
                        await API.get(
                            "/results",
                            {
                                headers: {
                                    Authorization:
                                        localStorage.getItem(
                                            "token"
                                        ),
                                },
                            }
                        );

                    setResults(
                        data.results || []
                    );

                } catch (error) {

                    console.log(error);

                } finally {

                    setLoading(false);
                }
            };

        fetchResults();

    }, []);

    // DELETE RESULT
    const deleteHandler =
        async (id) => {

            if (
                !window.confirm(
                    "Delete this result?"
                )
            ) {
                return;
            }

            try {

                await API.delete(
                    `/results/${id}`,
                    {
                        headers: {
                            Authorization:
                                localStorage.getItem(
                                    "token"
                                ),
                        },
                    }
                );
                // FETCH RESULTS
                const fetchResults =
                    async () => {

                        try {

                            const { data } =
                                await API.get(
                                    "/results",
                                    {
                                        headers: {
                                            Authorization:
                                                localStorage.getItem(
                                                    "token"
                                                ),
                                        },
                                    }
                                );

                            setResults(
                                data.results || []
                            );

                        } catch (error) {

                            console.log(error);

                        } finally {

                            setLoading(false);
                        }
                    };

                fetchResults();

            } catch (error) {

                console.log(error);
            }
        };

    return (

        <AdminLayout>

            <div className="p-6">

                {/* HEADER */}

                <div className="flex items-center justify-between mb-8">

                    <div>

                        <h1 className="text-3xl font-bold text-gray-800">
                            Result Management
                        </h1>

                        <p className="text-gray-500 mt-2">
                            Manage all student results
                        </p>

                    </div>

                    <Link
                        to="/admin/results/create"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl flex items-center gap-3"
                    >
                        <FaPlus />
                        Add Result
                    </Link>

                </div>

                {/* TABLE */}

                <div className="bg-white shadow-2xl rounded-3xl overflow-hidden">

                    <div className="overflow-x-auto">

                        <table className="w-full">

                            <thead className="bg-gray-100 text-gray-700">

                                <tr>

                                    <th className="p-5 text-left">
                                        Student
                                    </th>

                                    <th className="p-5 text-left">
                                        Roll No
                                    </th>

                                    <th className="p-5 text-left">
                                        Class
                                    </th>

                                    <th className="p-5 text-left">
                                        Section
                                    </th>

                                    <th className="p-5 text-left">
                                        Exam
                                    </th>

                                    <th className="p-5 text-left">
                                        GPA
                                    </th>

                                    <th className="p-5 text-left">
                                        Percentage
                                    </th>

                                    <th className="p-5 text-left">
                                        Status
                                    </th>

                                    <th className="p-5 text-center">
                                        Actions
                                    </th>

                                </tr>

                            </thead>

                            <tbody>

                                {loading ? (

                                    <tr>
                                        <td
                                            colSpan="9"
                                            className="p-10 text-center"
                                        >
                                            Loading...
                                        </td>
                                    </tr>

                                ) : results.length > 0 ? (

                                    results.map((result) => (

                                        <tr
                                            key={result._id}
                                            className="border-b hover:bg-gray-50"
                                        >

                                            <td className="p-5 font-medium">
                                                {result.fullName}
                                            </td>

                                            <td className="p-5">
                                                {result.rollNumber}
                                            </td>

                                            <td className="p-5">
                                                {result.className}
                                            </td>

                                            <td className="p-5">
                                                {result.section}
                                            </td>

                                            <td className="p-5">
                                                {result.examType}
                                            </td>

                                            <td className="p-5">
                                                {result.gpa.toFixed(
                                                    2
                                                )}
                                            </td>

                                            <td className="p-5">
                                                {result.percentage.toFixed(
                                                    2
                                                )}
                                                %
                                            </td>

                                            <td className="p-5">

                                                <span
                                                    className={`px-4 py-2 rounded-full text-sm font-medium ${result.resultStatus ===
                                                        "Pass"
                                                        ? "bg-green-100 text-green-700"
                                                        : "bg-red-100 text-red-700"
                                                        }`}
                                                >
                                                    {
                                                        result.resultStatus
                                                    }
                                                </span>

                                            </td>

                                            <td className="p-5">

                                                <div className="flex items-center justify-center gap-4">

                                                    <button
                                                        onClick={() =>
                                                            deleteHandler(
                                                                result._id
                                                            )
                                                        }
                                                        className="bg-red-100 text-red-600 p-3 rounded-xl"
                                                    >
                                                        <FaTrash />
                                                    </button>

                                                </div>

                                            </td>

                                        </tr>
                                    ))

                                ) : (

                                    <tr>
                                        <td
                                            colSpan="9"
                                            className="p-10 text-center"
                                        >
                                            No Results Found
                                        </td>
                                    </tr>
                                )}

                            </tbody>

                        </table>
                    </div>

                </div>

            </div>

        </AdminLayout>
    );
}

export default Results;