import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../../services/api";

function NewsTicker() {
    const [news, setNews] = useState([]);
    useEffect(() => {
        const fetchNews = async () => {
            try {
                const { data } = await API.get("/news");
                setNews(data.news || []);
            } catch (error) {
                console.log(error);
            }
        };
        fetchNews();

    }, []);

    if (news.length === 0) return null;

    return (

        <section className="bg-linear-to-r from-red-600 to-red-700 text-white shadow-lg overflow-hidden">
            <div className="flex items-center">

                {/* Label */}
                <div className="bg-yellow-400 text-black font-bold px-6 py-4 whitespace-nowrap shrink-0">
                    📢 NEWS & NOTICE
                </div>

                {/* Scrolling Content */}
                <div className="overflow-hidden flex-1">

                    <div className="ticker-track">

                        {/* First Set */}
                        {news.map((item) => (

                            <Link
                                key={item._id}
                                to={`/notice/${item._id}`}
                                className="
                                    ticker-item
                                    hover:text-yellow-300
                                    transition-all
                                    duration-300
                                "
                            >
                                📌 {item.title}
                            </Link>

                        ))}

                    </div>

                </div>

            </div>

        </section>
    );
}

export default NewsTicker;