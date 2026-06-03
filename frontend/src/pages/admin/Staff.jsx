import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    FaEdit,
    FaTrash,
    FaPlus,
} from "react-icons/fa";
import AdminLayout from "../../components/admin/AdminLayout";
import API, { BASE_URL } from "../../services/api";

function Staff() {

    const [staffs, setStaffs] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    // FETCH STAFF
    useEffect(() => {
        const fetchStaff = async () => {
            try {
                const { data } = await API.get(
                    "/staff"
                );
                setStaffs(data.staff);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        fetchStaff();
    }, []);


    // DELETE STAFF
    const deleteStaff = async (id) => {
        const confirmDelete = window.confirm(
            "Delete this staff?"
        );

        if (!confirmDelete) return;

        try {
            await API.delete(`/staff/${id}`);
            setStaffs(
                staffs.filter(
                    (staff) => staff._id !== id
                )
            );

            alert("Staff Deleted");

        } catch (error) {
            console.log(error);
            alert("Delete Failed");
        }
    };

    return (
        <AdminLayout>

            {/* TOP */}
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold">
                    Staff Management
                </h1>

                <Link
                    to="/admin/staff/add"
                    className="bg-black text-white px-5 py-3 rounded-lg flex items-center gap-2"
                >
                    <FaPlus />
                    Add Staff
                </Link>
            </div>

            {
                loading ? (
                    <h1>Loading...</h1>
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
                                        Position
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
                                    staffs?.length > 0 ? (
                                        staffs.map((staff) => (
                                            <tr
                                                key={staff._id}
                                                className="border-b"
                                            >

                                                <td className="p-4">

                                                    <img
                                                        src={`${BASE_URL}/${staff.image}`}
                                                        alt={staff.name}
                                                        className="w-16 h-16 object-cover rounded-lg"
                                                    />

                                                </td>

                                                <td className="p-4 font-semibold">
                                                    {staff.name}
                                                </td>

                                                <td className="p-4">
                                                    {staff.position}
                                                </td>

                                                <td className="p-4">
                                                    {staff.education}
                                                </td>

                                                <td className="p-4">
                                                    {staff.experience}
                                                </td>

                                                <td className="p-4">
                                                    <div className="flex items-center justify-center gap-3">
                                                        <Link
                                                            to={`/admin/staff/edit/${staff._id}`}
                                                            className="bg-blue-500 text-white p-3 rounded-lg"
                                                        >
                                                            <FaEdit />
                                                        </Link>

                                                        <button
                                                            onClick={() =>
                                                                deleteStaff(
                                                                    staff._id
                                                                )
                                                            }
                                                            className="bg-red-500 text-white p-3 rounded-lg"
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
                                                className="text-center p-10"
                                            >
                                                No Staff Found
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

export default Staff;