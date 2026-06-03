import {
    useEffect,
    useState,
} from "react";

import {
    FaTrash,
} from "react-icons/fa";
import AdminLayout from "../../components/admin/AdminLayout";
import API from "../../services/api";



function Admissions() {
    const [admissions, setAdmissions] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    // FETCH ADMISSIONS
    useEffect(() => {
        const fetchAdmissions =
            async () => {
                try {
                    const { data } =
                        await API.get(
                            "/admissions"
                        );

                    // console.log(data);

                    setAdmissions(
                        data.admissions
                    );

                } catch (error) {
                    console.log(error);
                } finally {
                    setLoading(false);
                }
            };
        fetchAdmissions();
    }, []);

    // UPDATE STATUS
    const updateStatus = async (
        id,
        status
    ) => {
        try {
            await API.put(
                `/admissions/${id}`,
                { status }
            );

            // UPDATE UI
            setAdmissions(
                admissions.map(
                    (item) =>
                        item._id === id
                            ? {
                                ...item,
                                status,
                            }

                            : item
                )
            );
            alert(
                "Status Updated"
            );

        } catch (error) {
            console.log(error);
            alert(
                "Update Failed"
            );
        }
    };

    // DELETE
    const deleteAdmission =
        async (id) => {
            const confirmDelete =
                window.confirm(
                    "Delete this admission?"
                );

            if (!confirmDelete)
                return;

            try {
                await API.delete(
                    `/admission/${id}`
                );

                setAdmissions(
                    admissions.filter(
                        (item) =>
                            item._id !== id
                    )
                );

                alert(
                    "Admission Deleted"
                );

            } catch (error) {
                console.log(error);
                alert(
                    "Delete Failed"
                );
            }
        };

    return (
        <AdminLayout>
            {/* HEADER */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold">
                        Admission Management
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Total Admissions:
                        {" "}
                        {
                            admissions?.length
                        }

                    </p>
                </div>

            </div>

            {/* LOADING */}
            {
                loading ? (
                    <h1 className="text-xl">
                        Loading Admissions...
                    </h1>

                ) : (
                    <>
                        {
                            admissions?.length > 0 ? (
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    {
                                        admissions.map(
                                            (
                                                admission
                                            ) => (

                                                <div
                                                    key={
                                                        admission._id
                                                    }
                                                    className="bg-white rounded-2xl shadow-md p-6"
                                                >

                                                    {/* TOP */}
                                                    <div className="flex items-start justify-between">
                                                        <div>
                                                            <h2 className="text-2xl font-bold">
                                                                {
                                                                    admission.fullName
                                                                }
                                                            </h2>

                                                            <p className="text-gray-500 mt-1">
                                                                {
                                                                    new Date(
                                                                        admission.createdAt
                                                                    ).toLocaleDateString()
                                                                }

                                                            </p>
                                                        </div>

                                                        <button
                                                            onClick={() =>
                                                                deleteAdmission(
                                                                    admission._id
                                                                )
                                                            }
                                                            className="bg-red-500 text-white p-3 rounded-lg"
                                                        >
                                                            <FaTrash />
                                                        </button>
                                                    </div>



                                                    {/* DETAILS */}
                                                    <div className="mt-6 space-y-3">
                                                        <p>
                                                            <span className="font-bold">
                                                                Email:
                                                            </span>
                                                            {" "}
                                                            {
                                                                admission.email
                                                            }
                                                        </p>

                                                        <p>
                                                            <span className="font-bold">
                                                                Phone:
                                                            </span>
                                                            {" "}
                                                            {
                                                                admission.phone
                                                            }
                                                        </p>

                                                        <p>
                                                            <span className="font-bold">
                                                                Class:
                                                            </span>

                                                            {" "}
                                                            {
                                                                admission.className
                                                            }
                                                        </p>

                                                        <p>
                                                            <span className="font-bold">
                                                                Address:
                                                            </span>
                                                            {" "}
                                                            {
                                                                admission.address
                                                            }
                                                        </p>

                                                        <p>
                                                            <span className="font-bold">
                                                                Previous School:
                                                            </span>

                                                            {" "}
                                                            {
                                                                admission.previousSchool
                                                            }

                                                        </p>

                                                        <p>
                                                            <span className="font-bold">
                                                                Message:
                                                            </span>
                                                            {" "}
                                                            {
                                                                admission.message
                                                            }

                                                        </p>

                                                    </div>


                                                    {/* STATUS */}
                                                    <div className="mt-6">
                                                        <label className="font-bold block mb-2">
                                                            Admission Status
                                                        </label>

                                                        <select
                                                            value={
                                                                admission.status
                                                            }
                                                            onChange={(e) =>
                                                                updateStatus(
                                                                    admission._id,
                                                                    e.target.value
                                                                )
                                                            }
                                                            className="border border-gray-300 p-3 rounded-lg w-full"
                                                        >
                                                            <option value="Pending">
                                                                Pending
                                                            </option>

                                                            <option value="Approved">
                                                                Approved
                                                            </option>
                                                            <option value="Rejected">
                                                                Rejected
                                                            </option>
                                                        </select>

                                                    </div>
                                                </div>
                                            )
                                        )
                                    }

                                </div>

                            ) : (

                                <div className="bg-white p-10 rounded-2xl shadow-md text-center">
                                    <h1 className="text-2xl font-bold">
                                        No Admissions Found
                                    </h1>

                                </div>
                            )
                        }

                    </>
                )
            }

        </AdminLayout>
    );
}

export default Admissions;