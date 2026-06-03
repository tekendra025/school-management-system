import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../components/admin/AdminLayout";
import API from "../../services/api";



function AddStaff() {
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

    const [loading, setLoading] =
        useState(false);




    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleImage = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const staffData =
                new FormData();
            Object.keys(formData).forEach((key) => {
                staffData.append(
                    key,
                    formData[key]
                );
            });
            staffData.append("image", image);

            await API.post(
                "/staff",
                staffData,
                {
                    headers: {

                        "Content-Type":
                            "multipart/form-data",
                    },
                }
            );

            alert("Staff Added");
            navigate("/admin/staff");

        } catch (error) {
            console.log(error);
            alert("Add Failed");

        } finally {
            setLoading(false);
        }
    };

    return (
        <AdminLayout>
            <h1 className="text-3xl font-bold mb-8">
                Add Staff
            </h1>

            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-2xl shadow-md"
            >

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    <input
                        type="text"
                        name="name"
                        placeholder="Staff Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="border p-3 rounded-lg"
                    />


                    <input
                        type="text"
                        name="position"
                        placeholder="Position"
                        value={formData.position}
                        onChange={handleChange}
                        required
                        className="border p-3 rounded-lg"
                    />


                    <input
                        type="text"
                        name="education"
                        placeholder="Education"
                        value={formData.education}
                        onChange={handleChange}
                        required
                        className="border p-3 rounded-lg"
                    />


                    <input
                        type="text"
                        name="experience"
                        placeholder="Experience"
                        value={formData.experience}
                        onChange={handleChange}
                        required
                        className="border p-3 rounded-lg"
                    />


                    <input
                        type="text"
                        name="facebook"
                        placeholder="Facebook Link"
                        value={formData.facebook}
                        onChange={handleChange}
                        className="border p-3 rounded-lg"
                    />


                    <input
                        type="text"
                        name="instagram"
                        placeholder="Instagram Link"
                        value={formData.instagram}
                        onChange={handleChange}
                        className="border p-3 rounded-lg"
                    />


                    <input
                        type="text"
                        name="linkedin"
                        placeholder="LinkedIn Link"
                        value={formData.linkedin}
                        onChange={handleChange}
                        className="border p-3 rounded-lg"
                    />


                    <input
                        type="file"
                        onChange={handleImage}
                        required
                        className="border p-3 rounded-lg"
                    />

                </div>


                <textarea
                    name="description"
                    placeholder="Description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="5"
                    className="w-full border p-3 rounded-lg mt-6"
                />


                <button
                    type="submit"
                    disabled={loading}
                    className="bg-black text-white px-8 py-3 rounded-lg mt-6"
                >

                    {
                        loading
                            ? "Adding..."
                            : "Add Staff"
                    }

                </button>

            </form>

        </AdminLayout>
    );
}

export default AddStaff;