import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
    FaEdit,
    FaTrash,
    FaPlus,
} from "react-icons/fa";

import AdminLayout from "../../components/admin/AdminLayout";
import API, { BASE_URL } from "../../services/api";


function News() {
    const [news, setNews] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    // FETCH NEWS
    useEffect(() => {
        const fetchNews = async () => {
            try {
                const { data } = await API.get(
                    "/news"
                );

                setNews(data.news);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        fetchNews();
    }, []);

    // DELETE NEWS
    const deleteNews = async (id) => {

        const confirmDelete = window.confirm(
            "Delete this news?"
        );
        if (!confirmDelete) return;

        try {
            await API.delete(`/news/${id}`);
            setNews(
                news.filter(
                    (item) => item._id !== id
                )
            );
            alert("News Deleted");

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
                    News & Notice Management
                </h1>

                <Link
                    to="/admin/news/add"
                    className="bg-black text-white px-5 py-3 rounded-lg flex items-center gap-2"
                >
                    <FaPlus />
                    Add News
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
                                        File
                                    </th>

                                    <th className="p-4 text-center">
                                        Attachment
                                    </th>

                                    <th className="p-4 text-left">
                                        Title
                                    </th>

                                    <th className="p-4 text-left">
                                        Category
                                    </th>

                                    <th className="p-4 text-left">
                                        Date
                                    </th>

                                    <th className="p-4 text-center">
                                        Actions
                                    </th>
                                </tr>
                            </thead>

                            <tbody>

                                {
                                    news?.length > 0 ? (
                                        news.map((item) => (
                                            <tr
                                                key={item._id}
                                                className="border-b"
                                            >

                                                <td className="p-4">

                                                    {item.file ? (

                                                        <>
                                                            {/* IMAGE */}
                                                            {/\.(jpg|jpeg|png|webp)$/i.test(item.file) && (
                                                                <img
                                                                    src={`${BASE_URL}/${item.file}`}
                                                                    alt={item.title}
                                                                    className="w-20 h-16 object-cover rounded-lg"
                                                                />
                                                            )}

                                                            {/* PDF */}
                                                            {/\.pdf$/i.test(item.file) && (
                                                                <div className="bg-red-100 text-red-600 px-3 py-2 rounded-lg text-sm font-semibold text-center">
                                                                    PDF
                                                                </div>
                                                            )}

                                                            {/* WORD */}
                                                            {/\.(doc|docx)$/i.test(item.file) && (
                                                                <div className="bg-blue-100 text-blue-600 px-3 py-2 rounded-lg text-sm font-semibold text-center">
                                                                    WORD
                                                                </div>
                                                            )}

                                                            {/* EXCEL */}
                                                            {/\.(xls|xlsx)$/i.test(item.file) && (
                                                                <div className="bg-green-100 text-green-600 px-3 py-2 rounded-lg text-sm font-semibold text-center">
                                                                    EXCEL
                                                                </div>
                                                            )}

                                                            {/* POWERPOINT */}
                                                            {/\.(ppt|pptx)$/i.test(item.file) && (
                                                                <div className="bg-orange-100 text-orange-600 px-3 py-2 rounded-lg text-sm font-semibold text-center">
                                                                    PPT
                                                                </div>
                                                            )}
                                                        </>

                                                    ) : (

                                                        <span className="text-gray-400">
                                                            No File
                                                        </span>
                                                    )}
                                                </td>

                                                <td className="p-4 text-center">
                                                    {item.file && (

                                                        <a
                                                            href={`${BASE_URL}/${item.file}`}
                                                            target="_blank"
                                                            rel="noreferrer"
                                                            className=" bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 "
                                                        >
                                                            View File
                                                        </a>
                                                    )}
                                                </td>

                                                <td className="p-4 font-semibold">
                                                    {item.title}
                                                </td>

                                                <td className="p-4">
                                                    {item.category}
                                                </td>

                                                <td className="p-4">
                                                    {
                                                        new Date(
                                                            item.createdAt
                                                        ).toLocaleDateString()
                                                    }
                                                </td>

                                                <td className="p-4">

                                                    <div className="flex items-center justify-center gap-3">

                                                        <Link
                                                            to={`/admin/news/edit/${item._id}`}
                                                            className="bg-blue-500 text-white p-3 rounded-lg"
                                                        >
                                                            <FaEdit />
                                                        </Link>

                                                        <button
                                                            onClick={() =>
                                                                deleteNews(
                                                                    item._id
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
                                                colSpan="5"
                                                className="text-center p-10"
                                            >
                                                No News Found
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

export default News;