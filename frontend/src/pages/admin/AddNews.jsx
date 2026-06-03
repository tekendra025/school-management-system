import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../components/admin/AdminLayout";
import API from "../../services/api";

function AddNews() {
    const navigate = useNavigate();
    const [formData, setFormData] =
        useState({
            title: "",
            category: "",
            description: "",
        });

    const [file, setFile] =
        useState(null);

    const [loading, setLoading] =
        useState(false);

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleFile = (e) => {
        setFile(
            e.target.files[0]
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const newsData =
                new FormData();

            newsData.append(
                "title",
                formData.title
            );

            newsData.append(
                "category",
                formData.category
            );

            newsData.append(
                "description",
                formData.description
            );

            if (file) {

                newsData.append(
                    "file",
                    file
                );
            }

            await API.post(
                "/news",
                newsData,
                {
                    headers: {
                        "Content-Type":
                            "multipart/form-data",
                    },
                }
            );

            alert(
                "News Added Successfully"
            );

            navigate(
                "/admin/news"
            );

        } catch (error) {
            console.log(error);
            alert(
                error?.response?.data?.message ||
                error.message ||
                "Add Failed"
            );

        } finally {

            setLoading(false);
        }
    };

    return (

        <AdminLayout>
            <h1 className="text-3xl font-bold mb-8">
                Add News / Notice
            </h1>

            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-2xl shadow-md"
            >

                <div className="grid grid-cols-1 gap-6">

                    {/* TITLE */}
                    <input
                        type="text"
                        name="title"
                        placeholder="News Title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        className="border p-3 rounded-lg"
                    />

                    {/* CATEGORY */}
                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                        className="border p-3 rounded-lg"
                    >

                        <option value="">
                            Select Category
                        </option>

                        <option value="News">
                            News
                        </option>

                        <option value="Notice">
                            Notice
                        </option>

                    </select>

                    {/* FILE */}
                    <div>

                        <label className="block mb-2 font-medium">
                            Attachment
                        </label>

                        <input
                            type="file"
                            accept="
                            image/*,
                            .pdf,
                            .doc,
                            .docx,
                            .xls,
                            .xlsx,
                            .ppt,
                            .pptx
                            "
                            onChange={handleFile}
                            className="border p-3 rounded-lg w-full"
                        />

                        <p className="text-sm text-gray-500 mt-2">
                            Supported:
                            JPG, PNG, WEBP,
                            PDF, Word,
                            Excel, PowerPoint
                        </p>

                    </div>

                    {/* DESCRIPTION */}
                    <textarea
                        name="description"
                        placeholder="Description"
                        value={formData.description}
                        onChange={handleChange}
                        rows="6"
                        required
                        className="border p-3 rounded-lg"
                    />

                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="
                        bg-black
                        text-white
                        px-8
                        py-3
                        rounded-lg
                        mt-6
                    "
                >

                    {
                        loading
                            ? "Adding..."
                            : "Add News"
                    }
                </button>
            </form>

        </AdminLayout>
    );
}

export default AddNews;