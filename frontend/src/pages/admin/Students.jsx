import { useEffect, useState } from "react";
import {
    Link,
} from "react-router-dom";
import {
    FaPlus,
    FaEdit,
    FaTrash,
} from "react-icons/fa";
import API, { BASE_URL } from "../../services/api";
import AdminLayout from "../../components/admin/AdminLayout";


function Students() {

    const [students, setStudents] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {
        // FETCH STUDENTS
        const fetchStudents = async () => {
            try {
                const { data } = await API.get(
                    "/students"
                );

                setStudents(
                    data.students || []
                );

            } catch (error) {
                console.log(error);

            } finally {
                setLoading(false);
            }
        };

        fetchStudents();

    }, []);


    // DELETE STUDENT
    const deleteHandler = async (id) => {

        if (
            !window.confirm(
                "Delete this student?"
            )
        ) {
            return;
        }


        try {

            await API.delete(
                `/students/${id}`,
                {
                    headers: {
                        Authorization:
                            localStorage.getItem(
                                "token"
                            ),
                    },
                }
            );
            const fetchStudents = async () => {

                try {

                    const { data } = await API.get(
                        "/students"
                    );

                    setStudents(
                        data.students || []
                    );

                } catch (error) {
                    console.log(error);
                } finally {
                    setLoading(false);
                }
            };

            fetchStudents();

        } catch (error) {

            console.log(error);
        }
    };


    return (

        <AdminLayout>

            <div className="p-6">

                {/* TOP */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">
                            Students Management
                        </h1>

                        <p className="text-gray-500 mt-2">
                            Manage all students
                        </p>

                    </div>

                    <Link
                        to="/admin/students/create"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl flex items-center gap-3"
                    >
                        <FaPlus />
                        Add Student
                    </Link>
                </div>

                {/* TABLE */}
                <div className="bg-white shadow-xl rounded-3xl overflow-x-auto">

                    <table className="w-full min-w-250">

                        <thead className="bg-gray-100 text-gray-700">

                            <tr>

                                <th className="p-5 text-left">
                                    Image
                                </th>

                                <th className="p-5 text-left">
                                    Name
                                </th>

                                <th className="p-5 text-left">
                                    Admission No
                                </th>

                                <th className="p-5 text-left">
                                    Roll No
                                </th>

                                <th className="p-5 text-left">
                                    Class
                                </th>

                                <th className="p-5 text-left">
                                    Phone
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

                            {
                                loading ? (

                                    <tr>
                                        <td
                                            colSpan="8"
                                            className="p-10 text-center"
                                        >
                                            Loading...
                                        </td>
                                    </tr>

                                ) : students.length > 0 ? (

                                    students.map((student) => (

                                        <tr
                                            key={student._id}
                                            className="border-b hover:bg-gray-50"
                                        >

                                            <td className="p-5">

                                                <img
                                                    src={`${BASE_URL}/${student.image}`}
                                                    alt={student.fullName}
                                                    className="w-14 h-14 rounded-full object-cover border"
                                                />

                                            </td>


                                            <td className="p-5 font-medium">
                                                {student.fullName}
                                            </td>

                                            <td className="p-5">
                                                {student.admissionNumber}
                                            </td>

                                            <td className="p-5">
                                                {student.rollNumber}
                                            </td>

                                            <td className="p-5">
                                                {student.className}
                                            </td>

                                            <td className="p-5">
                                                {student.phone}
                                            </td>

                                            <td className="p-5">

                                                <span className={`px-4 py-2 rounded-full text-sm font-medium ${student.status === "Active"
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-red-100 text-red-700"
                                                    }`}>
                                                    {student.status}
                                                </span>

                                            </td>


                                            <td className="p-5">

                                                <div className="flex items-center justify-center gap-4">

                                                    <Link
                                                        to={`/admin/students/edit/${student._id}`}
                                                        className="bg-blue-100 text-blue-600 p-3 rounded-xl"
                                                    >
                                                        <FaEdit />
                                                    </Link>


                                                    <button
                                                        onClick={() =>
                                                            deleteHandler(student._id)
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
                                            colSpan="8"
                                            className="p-10 text-center"
                                        >
                                            No Students Found
                                        </td>
                                    </tr>
                                )
                            }

                        </tbody>

                    </table>

                </div>

            </div>

        </AdminLayout>
    );
}

export default Students;
