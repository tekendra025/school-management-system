import { useEffect, useState, } from "react";
import { useParams } from "react-router-dom";
import API, { BASE_URL } from "../../../services/api";
import Layout from "../../../components/layout/Layout";
import { FaUser, FaCalendarAlt, } from "react-icons/fa";

function NoticeSingle() {
    const { id } = useParams();
    const [news, setNews] =
        useState(null);

    const [loading, setLoading] =
        useState(true);

    // FETCH SINGLE NEWS
    useEffect(() => {
        const fetchNews = async () => {
            try {
                const { data } =
                    await API.get(
                        `/news/${id}`
                    );

                setNews(
                    data.news
                );
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        };

        fetchNews();

    }, [id]);

    return (

        <Layout>

            {/* HERO */}
            <section className="bg-blue-700 text-white py-18">
                <div className="max-w-5xl mx-auto px-6 text-center">
                    <h1 className="text-4xl lg:text-5xl font-bold text-white">
                        News Details
                    </h1>
                </div>
            </section>

            {/* CONTENT */}
            <section className="py-20 bg-gray-100">
                <div className="max-w-4xl mx-auto px-6">
                    {loading ? (
                        <p className="text-center">
                            Loading...
                        </p>
                    ) : !news ? (
                        <p className="text-center">
                            Not Found
                        </p>
                    ) : (
                        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">

                            {/* FILE PREVIEW */}
                            {news?.file && (
                                <>
                                    {/* IMAGE */}
                                    {/\.(jpg|jpeg|png|webp)$/i.test(news.file) && (

                                        <img
                                            src={`${BASE_URL}/${news.file}`}
                                            alt={news.title}
                                            className="w-full h-96 object-cover"
                                        />

                                    )}

                                    {/* PDF */}
                                    {/\.pdf$/i.test(news.file) && (

                                        <div className="h-96 bg-red-50 flex flex-col items-center justify-center">

                                            <div className="text-8xl">
                                                📕
                                            </div>

                                            <h3 className="text-2xl font-bold text-red-600 mt-4">
                                                PDF Document
                                            </h3>

                                        </div>

                                    )}

                                    {/* WORD */}
                                    {/\.(doc|docx)$/i.test(news.file) && (

                                        <div className="h-96 bg-blue-50 flex flex-col items-center justify-center">

                                            <div className="text-8xl">
                                                📘
                                            </div>

                                            <h3 className="text-2xl font-bold text-blue-600 mt-4">
                                                Word Document
                                            </h3>

                                        </div>

                                    )}

                                    {/* EXCEL */}
                                    {/\.(xls|xlsx)$/i.test(news.file) && (

                                        <div className="h-96 bg-green-50 flex flex-col items-center justify-center">

                                            <div className="text-8xl">
                                                📗
                                            </div>

                                            <h3 className="text-2xl font-bold text-green-600 mt-4">
                                                Excel File
                                            </h3>

                                        </div>

                                    )}

                                    {/* POWERPOINT */}
                                    {/\.(ppt|pptx)$/i.test(news.file) && (

                                        <div className="h-96 bg-orange-50 flex flex-col items-center justify-center">

                                            <div className="text-8xl">
                                                📙
                                            </div>

                                            <h3 className="text-2xl font-bold text-orange-600 mt-4">
                                                PowerPoint Presentation
                                            </h3>

                                        </div>

                                    )}
                                </>

                            )}

                            <div className="p-10">

                                {/* CATEGORY */}
                                <span
                                    className={`
                                        px-4 py-1 rounded-full text-sm font-medium
                                        ${news.category === "News"
                                            ? "bg-green-100 text-green-700"
                                            : "bg-red-100 text-red-700"
                                        }
                                    `}
                                >
                                    {news?.category}
                                </span>

                                {/* TITLE */}
                                <h2 className="text-3xl font-bold text-gray-800 mt-5 mb-4">
                                    {news?.title}
                                </h2>

                                {/* META */}
                                <div className="flex flex-wrap gap-6 text-gray-500 text-sm mb-8">
                                    <div className="flex items-center gap-2">
                                        <FaCalendarAlt />
                                        <span>
                                            {new Date(
                                                news?.createdAt
                                            ).toDateString()}
                                        </span>
                                    </div>
                                    {news?.publishedBy && (
                                        <div className="flex items-center gap-2">
                                            <FaUser />
                                            <span>
                                                {news?.publishedBy}
                                            </span>
                                        </div>
                                    )}

                                </div>

                                {/* DESCRIPTION */}
                                <p className="text-gray-700 leading-9 text-lg whitespace-pre-line">
                                    {news?.description}
                                </p>

                                {/* DOWNLOAD BUTTON */}
                                {news?.file && (
                                    <div className="mt-10">
                                        <a
                                            to={`${BASE_URL}/${news.file}`}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="
                                                inline-flex
                                                items-center
                                                gap-2
                                                bg-blue-600
                                                hover:bg-blue-700
                                                text-white
                                                px-6
                                                py-3
                                                rounded-xl
                                                transition
                                            "
                                        >
                                            📎 View / Download Attachment
                                        </a>
                                    </div>


                                )}
                            </div>
                        </div>
                    )}

                </div>
            </section>
        </Layout>
    );
}

export default NoticeSingle;