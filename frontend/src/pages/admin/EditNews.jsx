import { useEffect, useState } from "react";

import {
    useNavigate,
    useParams,
} from "react-router-dom";
import AdminLayout from "../../components/admin/AdminLayout";
import API, { BASE_URL } from "../../services/api";


function EditNews() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] =
        useState({
            title: "",
            category: "",
            description: "",
        });

    const [file, setFile] = useState(null);
    const [previewFile, setPreviewFile] = useState("");
    const [loading, setLoading] =
        useState(true);


    // FETCH SINGLE NEWS
    useEffect(() => {
        const fetchNews = async () => {

            try {

                const { data } = await API.get(
                    `/news/${id}`
                );

                const news = data.news;
                setFormData({
                    title: news.title || "",
                    category:
                        news.category || "",
                    description:
                        news.description || "",
                });

                if (news.file) {
                    setPreviewFile(
                        `${BASE_URL}/${news.file}`
                    );
                }

            } catch (error) {

                console.log(error);

            } finally {

                setLoading(false);
            }
        };
        fetchNews();
    }, [id]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleFile = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        if (
            selectedFile &&
            selectedFile.type.startsWith("image/")
        ) {
            setPreviewFile(
                URL.createObjectURL(selectedFile)
            );
        } else {
            setPreviewFile("");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
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

            await API.put(
                `/news/${id}`,
                newsData,
                {
                    headers: {

                        "Content-Type":
                            "multipart/form-data",
                    },
                }
            );
            alert("News Updated");
            navigate("/admin/news");

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
                            Edit News
                        </h1>

                        <form
                            onSubmit={handleSubmit}
                            className="bg-white p-8 rounded-2xl shadow-md"
                        >

                            <div className="grid grid-cols-1 gap-6">

                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    className="border p-3 rounded-lg"
                                />


                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    className="border p-3 rounded-lg"
                                >
                                    <option value="News">
                                        News
                                    </option>

                                    <option value="Notice">
                                        Notice
                                    </option>
                                </select>

                                <input
                                    type="file"
                                    accept=" image/*, .pdf, .doc, .docx, .xls, .xlsx, .ppt, .pptx"
                                    onChange={handleFile}
                                    className="border p-3 rounded-lg"
                                />

                                {previewFile && (
                                    <>
                                        {/\.(jpg|jpeg|png|webp)$/i.test(previewFile) ? (
                                            <img
                                                src={previewFile}
                                                alt="Preview"
                                                className="w-48 h-32 object-cover rounded-xl"
                                            />
                                        ) : (
                                            <a
                                                href={previewFile}
                                                target="_blank"
                                                rel="noreferrer"
                                                className=" inline-block bg-blue-600  text-white px-4 py-2 rounded-lg"
                                            >
                                                View Current File
                                            </a>
                                        )}
                                    </>
                                )}

                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    rows="6"
                                    className="border p-3 rounded-lg"
                                />
                            </div>

                            <button
                                type="submit"
                                className="bg-black text-white px-8 py-3 rounded-lg mt-6"
                            >
                                Update News
                            </button>

                        </form>
                    </>
                )
            }

        </AdminLayout>
    );
}

export default EditNews;