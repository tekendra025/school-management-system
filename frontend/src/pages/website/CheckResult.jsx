import {
    useState,
} from "react";

import API from "../../services/api";
import Layout from "../../components/layout/Layout";

function CheckResult() {

    const [fullName,
        setFullName] =
        useState("");

    const [className,
        setClassName] =
        useState("");

    const [dateOfBirth,
        setDateOfBirth] =
        useState("");

    const [result,
        setResult] =
        useState(null);

    const [error,
        setError] =
        useState("");

    const submitHandler =
        async (e) => {

            e.preventDefault();

            try {

                setError("");

                const { data } =
                    await API.post(
                        "/results/check",

                        {
                            fullName,
                            className,
                            dateOfBirth,
                        }

                    );

                setResult(
                    data.result
                );

            } catch (error) {

                setError(
                    error.response.data.message
                );
            }
        };

    return (
        <Layout>


            <div className="max-w-6xl mx-auto py-20 px-6">

                <h1 className="text-5xl font-bold text-center mb-12">
                    Result Checking
                </h1>

                <form
                    onSubmit={
                        submitHandler
                    }
                    className="bg-white shadow-xl rounded-3xl p-10 grid grid-cols-1 md:grid-cols-2 gap-6"
                >

                    <input
                        type="text"
                        placeholder="Student Full Name"
                        value={fullName}
                        onChange={(e) =>
                            setFullName(
                                e.target.value
                            )
                        }
                        className="border p-4 rounded-xl"
                    />

                    <input
                        type="text"
                        placeholder="Class"
                        value={className}
                        onChange={(e) =>
                            setClassName(
                                e.target.value
                            )
                        }
                        className="border p-4 rounded-xl"
                    />

                    <input
                        type="date"
                        value={dateOfBirth}
                        onChange={(e) =>
                            setDateOfBirth(
                                e.target.value
                            )
                        }
                        className="border p-4 rounded-xl md:col-span-2"
                    />

                    <button className="bg-blue-600 text-white py-4 rounded-xl md:col-span-2">
                        Check Result
                    </button>

                </form>

                {error && (
                    <p className="text-red-500 mt-6 text-center">
                        {error}
                    </p>
                )}

                {result && (

                    <div className="bg-white shadow-2xl rounded-3xl p-10 mt-12">

                        <h2 className="text-4xl font-bold mb-10">
                            Student Result
                        </h2>

                        <button
                            onClick={() => window.print()}
                            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl"
                        >
                            Print Result
                        </button>

                        <div className="grid grid-cols-2 gap-6 mb-10">

                            <p>
                                <strong>Name:</strong>
                                {" "}
                                {result.fullName}
                            </p>

                            <p>
                                <strong>Roll:</strong>
                                {" "}
                                {result.rollNumber}
                            </p>

                            <p>
                                <strong>Class:</strong>
                                {" "}
                                {result.className}
                            </p>

                            <p>
                                <strong>Exam:</strong>
                                {" "}
                                {result.examType}
                            </p>

                            <p>
                                <strong>GPA:</strong>
                                {" "}
                                {result.gpa.toFixed(2)}
                            </p>

                            <p>
                                <strong>Status:</strong>
                                {" "}
                                {result.resultStatus}
                            </p>

                        </div>

                        <table className="w-full border">

                            <thead className="bg-gray-100">

                                <tr>
                                    <th className="p-4 border">
                                        Subject
                                    </th>

                                    <th className="p-4 border">
                                        Marks
                                    </th>

                                    <th className="p-4 border">
                                        Grade
                                    </th>

                                </tr>

                            </thead>

                            <tbody>

                                {result.subjects.map(
                                    (subject) => (

                                        <tr
                                            key={
                                                subject._id
                                            }
                                        >

                                            <td className="p-4 border">
                                                {
                                                    subject.subjectName
                                                }
                                            </td>

                                            <td className="p-4 border">
                                                {
                                                    subject.marks
                                                }
                                            </td>

                                            <td className="p-4 border">
                                                {
                                                    subject.grade
                                                }
                                            </td>

                                        </tr>
                                    )
                                )}

                            </tbody>

                        </table>

                    </div>
                )}

            </div>
        </Layout>
    );
}

export default CheckResult;