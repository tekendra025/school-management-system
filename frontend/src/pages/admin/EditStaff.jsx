import { useEffect, useState } from "react";

import {
    useNavigate,
    useParams,
} from "react-router-dom";
import AdminLayout from "../../components/admin/AdminLayout";
import API, { BASE_URL } from "../../services/api";


function EditStaff() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] =
        useState({
            name: "",
            position: "",
            education: "",
            experience: "",
        });

    const [image, setImage] =
        useState(null);

    const [previewImage, setPreviewImage] =
        useState("");

    const [loading, setLoading] =
        useState(true);

    // FETCH STAFF
    useEffect(() => {
        const fetchStaff = async () => {
            try {
                const { data } = await API.get(
                    `/staff/${id}`
                );

                const staff = data.staff;
                setFormData({
                    name: staff.name || "",
                    position:
                        staff.position || "",
                    education:
                        staff.education || "",
                    experience:
                        staff.experience || "",
                });
                setPreviewImage(
                    `${BASE_URL}/${staff.image}`
                );

            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        fetchStaff();
    }, [id]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleImage = (e) => {
        const file = e.target.files[0];
        setImage(file);
        setPreviewImage(
            URL.createObjectURL(file)
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const staffData =
                new FormData();

            Object.keys(formData).forEach((key) => {

                staffData.append(
                    key,
                    formData[key]
                );
            });

            if (image) {
                staffData.append(
                    "image",
                    image
                );
            }

            await API.put(
                `/staff/${id}`,
                staffData,
                {
                    headers: {

                        "Content-Type":
                            "multipart/form-data",
                    },
                }
            );
            alert("Staff Updated");
            navigate("/admin/staff");

        } catch (error) {
            console.log(error);
            alert("Update Failed");
        }
    };

    return (
        <AdminLayout>
            {
                loading ? (
                    <h1>Loading...</h1>
                ) : (
                    <>
                        <h1 className="text-3xl font-bold mb-8">
                            Edit Staff
                        </h1>

                        <form
                            onSubmit={handleSubmit}
                            className="bg-white p-8 rounded-2xl shadow-md"
                        >

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="border p-3 rounded-lg"
                                />

                                <input
                                    type="text"
                                    name="position"
                                    value={formData.position}
                                    onChange={handleChange}
                                    className="border p-3 rounded-lg"
                                />

                                <input
                                    type="text"
                                    name="education"
                                    value={formData.education}
                                    onChange={handleChange}
                                    className="border p-3 rounded-lg"
                                />

                                <input
                                    type="text"
                                    name="experience"
                                    value={formData.experience}
                                    onChange={handleChange}
                                    className="border p-3 rounded-lg"
                                />

                                <input
                                    type="file"
                                    onChange={handleImage}
                                    className="border p-3 rounded-lg"
                                />

                            </div>

                            {
                                previewImage && (
                                    <img
                                        src={previewImage}
                                        alt="Preview"
                                        className="w-40 h-40 object-cover rounded-xl mt-6"
                                    />
                                )
                            }

                            <button
                                type="submit"
                                className="bg-black text-white px-8 py-3 rounded-lg mt-6"
                            >
                                Update Staff
                            </button>
                        </form>

                    </>
                )
            }

        </AdminLayout>
    );
}

export default EditStaff;