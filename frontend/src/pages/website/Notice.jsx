import { useEffect, useState } from "react";
import API, { BASE_URL } from "../../services/api";
import Layout from "../../components/layout/Layout";
import {
    FaRegCalendarAlt,
    FaUser,
} from "react-icons/fa";
import { Link } from "react-router-dom";

function Notice() {

    const [allData, setAllData] =
        useState([]);

    const [filter, setFilter] =
        useState("All");

    const [loading, setLoading] =
        useState(true);

    // FETCH NEWS + NOTICE
    useEffect(() => {

        const fetchData = async () => {
            try {
                const { data } =
                    await API.get("/news");

                setAllData(data.news);

            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // FILTER DATA
    const filteredData =
        allData.filter((item) => {

            if (filter === "All")
                return true;

            return (
                item.category === filter
            );
        });

    return (

        <Layout>

            {/* HERO */}
            <section className="relative bg-blue-700 text-white py-18 overflow-hidden">

                <div className="absolute inset-0 bg-black/30"></div>

                <div className="max-w-7xl mx-auto px-6 text-center relative z-10">

                    <h1 className="text-5xl lg:text-7xl text-white font-bold mb-6">
                        News & Notices
                    </h1>

                    <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                        Stay updated with latest school news,
                        announcements and important notices.
                    </p>

                </div>

            </section>

            {/* FILTERS */}
            <section className="py-10 bg-white">

                <div className="max-w-7xl mx-auto px-6 flex flex-wrap gap-4 justify-center">

                    {["All", "News", "Notice"].map((type) => (

                        <button
                            key={type}
                            onClick={() =>
                                setFilter(type)
                            }
                            className={`
                                px-6 py-2 rounded-full
                                border font-medium transition-all
                                ${filter === type
                                    ? "bg-blue-600 text-white"
                                    : "bg-white text-gray-700 hover:bg-blue-50"
                                }
                            `}
                        >
                            {type}
                        </button>

                    ))}

                </div>

            </section>

            {/* CONTENT */}
            <section className="py-20 bg-gray-100">

                <div className="max-w-7xl mx-auto px-6">

                    {loading ? (

                        <p className="text-center text-gray-600">
                            Loading...
                        </p>

                    ) : filteredData.length === 0 ? (

                        <p className="text-center text-gray-600">
                            No records found
                        </p>

                    ) : (

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">

                            {filteredData.map((item) => (

                                <Link
                                    key={item._id}
                                    to={`/notice/${item._id}`}
                                >

                                    <div className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">

                                        {/* FILE PREVIEW */}
                                        {item.file && (

                                            <>
                                                {/* IMAGE */}
                                                {/\.(jpg|jpeg|png|webp)$/i.test(item.file) && (

                                                    <img
                                                        src={`${BASE_URL}/${item.file}`}
                                                        alt={item.title}
                                                        className="w-full h-56 object-cover"
                                                    />

                                                )}

                                                {/* PDF */}
                                                {/\.pdf$/i.test(item.file) && (

                                                    <div className="h-56 bg-red-50 flex flex-col items-center justify-center">

                                                        <div className="text-7xl">
                                                            📕
                                                        </div>

                                                        <p className="font-semibold text-red-600 mt-3">
                                                            PDF Document
                                                        </p>

                                                    </div>

                                                )}

                                                {/* WORD */}
                                                {/\.(doc|docx)$/i.test(item.file) && (

                                                    <div className="h-56 bg-blue-50 flex flex-col items-center justify-center">

                                                        <div className="text-7xl">
                                                            📘
                                                        </div>

                                                        <p className="font-semibold text-blue-600 mt-3">
                                                            Word Document
                                                        </p>

                                                    </div>

                                                )}

                                                {/* EXCEL */}
                                                {/\.(xls|xlsx)$/i.test(item.file) && (

                                                    <div className="h-56 bg-green-50 flex flex-col items-center justify-center">

                                                        <div className="text-7xl">
                                                            📗
                                                        </div>

                                                        <p className="font-semibold text-green-600 mt-3">
                                                            Excel File
                                                        </p>

                                                    </div>

                                                )}

                                                {/* POWERPOINT */}
                                                {/\.(ppt|pptx)$/i.test(item.file) && (

                                                    <div className="h-56 bg-orange-50 flex flex-col items-center justify-center">

                                                        <div className="text-7xl">
                                                            📙
                                                        </div>

                                                        <p className="font-semibold text-orange-600 mt-3">
                                                            PowerPoint File
                                                        </p>

                                                    </div>

                                                )}
                                            </>

                                        )}

                                        <div className="p-6">

                                            {/* CATEGORY */}
                                            <div className="mb-3">

                                                <span
                                                    className={`
                                                        px-3 py-1 text-sm rounded-full font-medium
                                                        ${item.category === "News"
                                                            ? "bg-green-100 text-green-700"
                                                            : "bg-red-100 text-red-700"
                                                        }
                                                    `}
                                                >
                                                    {item.category}
                                                </span>

                                            </div>

                                            {/* TITLE */}
                                            <h2 className="text-2xl font-bold text-gray-800 mb-3">

                                                {item.title}

                                            </h2>

                                            {/* DESCRIPTION */}
                                            <p className="text-gray-600 leading-7 mb-4">

                                                {item.description?.length > 120
                                                    ? item.description.slice(0, 120) + "..."
                                                    : item.description
                                                }

                                            </p>

                                            {/* ATTACHMENT BUTTON */}
                                            {item.file && (

                                                <a
                                                    href={`${BASE_URL}/${item.file}`}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    onClick={(e) =>
                                                        e.stopPropagation()
                                                    }
                                                    className="
                                                        inline-block
                                                        bg-blue-600
                                                        text-white
                                                        px-4
                                                        py-2
                                                        rounded-lg
                                                        hover:bg-blue-700
                                                        mb-4
                                                    "
                                                >
                                                    View Attachment
                                                </a>

                                            )}

                                            {/* META */}
                                            <div className="flex justify-between text-sm text-gray-500">

                                                <div className="flex items-center gap-2">

                                                    <FaRegCalendarAlt />

                                                    <span>
                                                        {new Date(
                                                            item.createdAt
                                                        ).toDateString()}
                                                    </span>

                                                </div>

                                                {item.publishedBy && (

                                                    <div className="flex items-center gap-2">

                                                        <FaUser />

                                                        <span>
                                                            {item.publishedBy}
                                                        </span>

                                                    </div>

                                                )}

                                            </div>

                                        </div>

                                    </div>

                                </Link>

                            ))}

                        </div>

                    )}

                </div>

            </section>

        </Layout>

    );
}

export default Notice;