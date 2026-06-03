import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    FaEdit,
    FaTrash,
    FaPlus,
} from "react-icons/fa";
import AdminLayout from "../../components/admin/AdminLayout";
import API, { BASE_URL } from "../../services/api";


function Teachers() {
    const [teachers, setTeachers] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    // FETCH TEACHERS
    useEffect(() => {
        const fetchTeachers = async () => {
            try {
                const { data } = await API.get(
                    "/teachers"
                );

                setTeachers(data.teachers);

            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        fetchTeachers();

    }, []);

    // DELETE TEACHER
    const deleteTeacher = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this teacher?"
        );

        if (!confirmDelete) return;

        try {

            await API.delete(
                `/teachers/${id}`
            );

            // REMOVE FROM UI
            setTeachers(
                teachers.filter(
                    (teacher) => teacher._id !== id
                )
            );
            alert("Teacher Deleted");

        } catch (error) {
            console.log(error);
            alert("Delete Failed");
        }
    };

    return (
        <AdminLayout>

            {/* TOP SECTION */}
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold">
                    Teachers Management
                </h1>

                <Link
                    to="/admin/teachers/add"
                    className="bg-black text-white px-5 py-3 rounded-lg flex items-center gap-2 hover:bg-gray-800"
                >
                    <FaPlus />
                    Add Teacher
                </Link>
            </div>

            {/* LOADING */}
            {
                loading ? (
                    <h1 className="text-xl">
                        Loading Teachers...
                    </h1>
                ) : (

                    <div className="overflow-x-auto bg-white rounded-2xl shadow-md">

                        <table className="w-full">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="p-4 text-left">
                                        Image
                                    </th>

                                    <th className="p-4 text-left">
                                        Name
                                    </th>

                                    <th className="p-4 text-left">
                                        Subject
                                    </th>

                                    <th className="p-4 text-left">
                                        Education
                                    </th>

                                    <th className="p-4 text-left">
                                        Experience
                                    </th>

                                    <th className="p-4 text-center">
                                        Actions
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    teachers.length > 0 ? (
                                        teachers.map((teacher) => (
                                            <tr
                                                key={teacher._id}
                                                className="border-b"
                                            >

                                                {/* IMAGE */}
                                                <td className="p-4">
                                                    <img
                                                        src={`${BASE_URL}/${teacher.image}`}
                                                        alt={teacher.name}
                                                        className="w-16 h-16 object-cover rounded-lg"
                                                    />

                                                </td>

                                                {/* NAME */}
                                                <td className="p-4 font-semibold">
                                                    {teacher.name}
                                                </td>

                                                {/* SUBJECT */}
                                                <td className="p-4">
                                                    {teacher.subject}
                                                </td>

                                                {/* EDUCATION */}
                                                <td className="p-4">
                                                    {teacher.education}
                                                </td>

                                                {/* EXPERIENCE */}
                                                <td className="p-4">
                                                    {teacher.experience}
                                                </td>

                                                {/* ACTIONS */}
                                                <td className="p-4">
                                                    <div className="flex items-center justify-center gap-3">
                                                        {/* EDIT */}
                                                        <Link
                                                            to={`/admin/teachers/edit/${teacher._id}`}
                                                            className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600"
                                                        >
                                                            <FaEdit />

                                                        </Link>

                                                        {/* DELETE */}
                                                        <button
                                                            onClick={() =>
                                                                deleteTeacher(
                                                                    teacher._id
                                                                )
                                                            }
                                                            className="bg-red-500 text-white p-3 rounded-lg hover:bg-red-600"
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
                                                colSpan="6"
                                                className="text-center p-10 text-gray-500"
                                            >
                                                No Teachers Found
                                            </td>
                                        </tr>
                                    )
                                }

                            </tbody>

                        </table>

                    </div>
                )
            }

        </AdminLayout>
    );
}

export default Teachers;