import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../components/admin/AdminLayout";
import API from "../../services/api";

function AddTeacher() {
    const navigate = useNavigate();
    // FORM STATE
    const [formData, setFormData] =
        useState({
            name: "",
            subject: "",
            designation: "",
            education: "",
            experience: "",
            facebook: "",
            instagram: "",
            linkedin: "",
            description: "",
        });


    // IMAGE STATE
    const [image, setImage] =
        useState(null);

    // LOADING
    const [loading, setLoading] =
        useState(false);

    // HANDLE INPUT CHANGE
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // HANDLE IMAGE
    const handleImage = (e) => {
        setImage(e.target.files[0]);
    };

    // SUBMIT FORM
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            // FORM DATA
            const teacherData =
                new FormData();

            teacherData.append(
                "name",
                formData.name
            );

            teacherData.append(
                "designation",
                formData.designation
            );

            teacherData.append(
                "subject",
                formData.subject
            );

            teacherData.append(
                "education",
                formData.education
            );

            teacherData.append(
                "experience",
                formData.experience
            );

            teacherData.append(
                "facebook",
                formData.facebook
            );

            teacherData.append(
                "instagram",
                formData.instagram
            );

            teacherData.append(
                "linkedin",
                formData.linkedin
            );

            teacherData.append(
                "description",
                formData.description
            );

            teacherData.append(
                "image",
                image
            );

            // API REQUEST
            await API.post(
                "/teachers",
                teacherData,
                {
                    headers: {

                        "Content-Type":
                            "multipart/form-data",
                    },
                }
            );
            alert("Teacher Added");
            navigate("/admin/teachers");

        } catch (error) {
            console.log(error);
            alert(
                error.response?.data?.message ||
                "Something went wrong"
            );

        } finally {

            setLoading(false);
        }
    };

    return (
        <AdminLayout>
            {/* TITLE */}
            <h1 className="text-3xl font-bold mb-8">
                Add Teacher
            </h1>

            {/* FORM */}
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-2xl shadow-md"
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* NAME */}
                    <div>
                        <label className="block mb-2 font-medium">
                            Teacher Name
                        </label>

                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            placeholder="Enter teacher name"
                            className="w-full border border-gray-300 p-3 rounded-lg outline-none"
                        />

                    </div>

                    {/* designation*/}
                    <div>
                        <label className="block mb-2 font-medium">
                            Designation
                        </label>

                        <input
                            type="text"
                            name="designation"
                            value={formData.designation}
                            onChange={handleChange}
                            required
                            placeholder="Enter teacher designation"
                            className="w-full border border-gray-300 p-3 rounded-lg outline-none"
                        />
                    </div>



                    {/* SUBJECT */}

                    <div>
                        <label className="block mb-2 font-medium">
                            Subject
                        </label>
                        <input
                            type="text"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            required
                            placeholder="Enter subject"
                            className="w-full border border-gray-300 p-3 rounded-lg outline-none"
                        />
                    </div>

                    {/* EDUCATION */}
                    <div>
                        <label className="block mb-2 font-medium">
                            Education
                        </label>

                        <input
                            type="text"
                            name="education"
                            value={formData.education}
                            onChange={handleChange}
                            required
                            placeholder="Enter education"
                            className="w-full border border-gray-300 p-3 rounded-lg outline-none"
                        />
                    </div>

                    {/* EXPERIENCE */}
                    <div>
                        <label className="block mb-2 font-medium">
                            Experience
                        </label>

                        <input
                            type="text"
                            name="experience"
                            value={formData.experience}
                            onChange={handleChange}
                            required
                            placeholder="Enter experience"
                            className="w-full border border-gray-300 p-3 rounded-lg outline-none"
                        />
                    </div>

                    {/* FACEBOOK */}
                    <div>
                        <label className="block mb-2 font-medium">
                            Facebook Link
                        </label>

                        <input
                            type="text"
                            name="facebook"
                            value={formData.facebook}
                            onChange={handleChange}
                            placeholder="Facebook URL"
                            className="w-full border border-gray-300 p-3 rounded-lg outline-none"
                        />
                    </div>

                    {/* INSTAGRAM */}
                    <div>
                        <label className="block mb-2 font-medium">
                            Instagram Link
                        </label>
                        <input
                            type="text"
                            name="instagram"
                            value={formData.instagram}
                            onChange={handleChange}
                            placeholder="Instagram URL"
                            className="w-full border border-gray-300 p-3 rounded-lg outline-none"
                        />
                    </div>

                    {/* LINKEDIN */}
                    <div>
                        <label className="block mb-2 font-medium">
                            LinkedIn Link
                        </label>
                        <input
                            type="text"
                            name="linkedin"
                            value={formData.linkedin}
                            onChange={handleChange}
                            placeholder="LinkedIn URL"
                            className="w-full border border-gray-300 p-3 rounded-lg outline-none"
                        />

                    </div>

                    {/* IMAGE */}
                    <div>
                        <label className="block mb-2 font-medium">
                            Teacher Image

                        </label>
                        <input
                            type="file"
                            onChange={handleImage}
                            required
                            className="w-full border border-gray-300 p-3 rounded-lg"
                        />
                    </div>
                </div>



                {/* DESCRIPTION */}
                <div className="mt-6">
                    <label className="block mb-2 font-medium">
                        Description
                    </label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows="5"
                        placeholder="Teacher description"
                        className="w-full border border-gray-300 p-3 rounded-lg outline-none"
                    />
                </div>

                {/* BUTTON */}
                <button
                    type="submit"
                    disabled={loading}
                    className="mt-6 bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800"
                >
                    {
                        loading
                            ? "Adding..."
                            : "Add Teacher"
                    }
                </button>

            </form>
        </AdminLayout>
    );
}

export default AddTeacher;