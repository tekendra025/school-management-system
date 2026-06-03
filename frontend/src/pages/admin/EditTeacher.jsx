import { useEffect, useState } from "react";

import {
    useNavigate,
    useParams,
} from "react-router-dom";
import AdminLayout from "../../components/admin/AdminLayout";
import API, { BASE_URL } from "../../services/api";

function EditTeacher() {
    const navigate = useNavigate();
    const { id } = useParams();

    // FORM STATE
    const [formData, setFormData] =
        useState({
            name: "",
            subject: "",
            education: "",
            designation: "",
            experience: "",
            facebook: "",
            instagram: "",
            linkedin: "",
            description: "",
        });

    // IMAGE
    const [image, setImage] =
        useState(null);

    // OLD IMAGE
    const [previewImage, setPreviewImage] =
        useState("");

    // LOADING
    const [loading, setLoading] =
        useState(true);

    // UPDATE LOADING
    const [updateLoading, setUpdateLoading] =
        useState(false);

    // FETCH SINGLE TEACHER
    useEffect(() => {
        const fetchTeacher = async () => {
            try {
                const { data } = await API.get(
                    `/teachers/${id}`
                );

                const teacher = data.teacher;

                setFormData({
                    name: teacher.name || "",
                    subject: teacher.subject || "",
                    education:
                        teacher.education || "",
                    designation:
                        teacher.designation || "",
                    experience:
                        teacher.experience || "",
                    facebook:
                        teacher.facebook || "",
                    instagram:
                        teacher.instagram || "",
                    linkedin:
                        teacher.linkedin || "",
                    description:
                        teacher.description || "",
                });

                setPreviewImage(
                    `${BASE_URL}/${teacher.image}`
                );

            } catch (error) {
                console.log(error);
                alert("Failed to load teacher");

            } finally {
                setLoading(false);
            }
        };

        fetchTeacher();
    }, [id]);

    // HANDLE INPUT
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };


    // HANDLE IMAGE
    const handleImage = (e) => {
        const file = e.target.files[0];
        setImage(file);

        // PREVIEW
        if (file) {
            setPreviewImage(
                URL.createObjectURL(file)
            );
        }
    };

    // UPDATE TEACHER
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setUpdateLoading(true);

            // FORM DATA
            const teacherData =
                new FormData();

            teacherData.append(
                "name",
                formData.name
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
                "designation",
                formData.designation
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


            // IMAGE OPTIONAL
            if (image) {
                teacherData.append(
                    "image",
                    image
                );
            }

            // API UPDATE
            await API.put(
                `/teachers/${id}`,
                teacherData,
                {
                    headers: {
                        "Content-Type":
                            "multipart/form-data",
                    },
                }
            );

            alert("Teacher Updated");
            navigate("/admin/teachers");
        } catch (error) {
            console.log(error);
            alert(
                error.response?.data?.message ||
                "Update Failed"
            );

        } finally {
            setUpdateLoading(false);
        }
    };

    return (
        <AdminLayout>
            {
                loading ? (
                    <h1 className="text-2xl">
                        Loading Teacher...
                    </h1>

                ) : (
                    <>
                        {/* TITLE */}
                        <h1 className="text-3xl font-bold mb-8">
                            Edit Teacher
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
                                        className="w-full border border-gray-300 p-3 rounded-lg"
                                    />
                                </div>
                            </div>

                            {/* IMAGE PREVIEW */}
                            {
                                previewImage && (
                                    <div className="mt-6">
                                        <img
                                            src={previewImage}
                                            alt="Preview"
                                            className="w-40 h-40 object-cover rounded-xl border"
                                        />

                                    </div>
                                )
                            }


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
                                    className="w-full border border-gray-300 p-3 rounded-lg outline-none"
                                />

                            </div>

                            {/* BUTTON */}
                            <button
                                type="submit"
                                disabled={updateLoading}
                                className="mt-6 bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800"
                            >

                                {
                                    updateLoading
                                        ? "Updating..."
                                        : "Update Teacher"
                                }

                            </button>

                        </form>

                    </>
                )
            }

        </AdminLayout>
    );
}

export default EditTeacher;