import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import API from "../../services/api";
import { FaQuoteLeft } from "react-icons/fa";

export default function PrincipalMessage() {
    const aboutReducer = useSelector(
        (state) => state.about.about
    );

    const [staffs, setStaffs] = useState([]);

    useEffect(() => {
        const fetchStaffs = async () => {
            try {
                const { data } = await API.get("/staff");
                setStaffs(data.staff);
            } catch (error) {
                console.log(error);
            }
        };

        fetchStaffs();
    }, []);

    const principal = staffs?.find(
        (s) =>
            s.position?.toLowerCase() === "principal" ||
            s.position?.toLowerCase() === "principle"
    );

    return (
        <section className="relative py-24 px-6 overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50">

            {/* Background Blur Effects */}
            <div className="absolute top-0 left-0 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl"></div>

            <div className="absolute bottom-0 right-0 w-80 h-80 bg-indigo-200/30 rounded-full blur-3xl"></div>

            <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10">

                {/* LEFT SIDE */}
                <div className="flex justify-center">

                    <div className="text-center group">

                        {/* Image */}
                        <div className="relative">

                            {/* Glow */}
                            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 blur-xl opacity-30 animate-pulse"></div>

                            <img
                                src={
                                    principal?.image
                                        ? `http://localhost:8000/${principal.image}`
                                        : "https://via.placeholder.com/400"
                                }
                                alt={principal?.name}
                                className="
                                    relative
                                    w-80
                                    h-80
                                    object-cover
                                    rounded-full
                                    border-8
                                    border-white
                                    shadow-2xl
                                    transition-all
                                    duration-500
                                    hover:scale-105
                                    float-animation
                                "
                            />

                        </div>

                        {/* Name */}
                        <div className="mt-6">

                            <h3 className="text-3xl font-bold text-gray-900">
                                {principal?.name || "Hira Bahadur Thapa"}
                            </h3>

                            <span className="inline-block mt-3 px-5 py-2 bg-blue-100 text-blue-700 rounded-full font-medium shadow-sm">
                                {principal?.position || "Principal"}
                            </span>

                        </div>

                    </div>

                </div>

                {/* RIGHT SIDE */}
                <div>

                    <span className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full font-semibold mb-4">
                        Leadership Message
                    </span>

                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Principal's Message
                    </h2>

                    <div className="relative bg-white p-8 rounded-3xl shadow-xl border border-gray-100">

                        <FaQuoteLeft
                            className="
                                text-blue-200
                                text-5xl
                                absolute
                                top-6
                                left-6
                            "
                        />

                        <p className="text-gray-600 leading-8 text-lg relative z-10 pl-10">
                            {aboutReducer?.principalMessage}
                        </p>

                    </div>

                </div>

            </div>

        </section>
    );
}