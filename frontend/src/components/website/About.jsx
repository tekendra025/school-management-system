import { useSelector } from "react-redux";
import {
    School,
    GraduationCap,
} from "lucide-react";
import { BASE_URL } from "../../services/api";

const About = () => {

    const aboutReducer =
        useSelector(
            (state) => state.about.about
        );

    return (

        <section className="relative overflow-hidden py-28 px-6 lg:px-16 bg-linear-to-br from-slate-50 via-blue-50 to-indigo-50">

            {/* Floating Background Effects */}
            <div className="absolute top-10 left-10 w-72 h-72 bg-blue-300/20 rounded-full blur-3xl animate-pulse"></div>

            <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-300/20 rounded-full blur-3xl animate-pulse"></div>

            <div className="relative max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">

                {/* IMAGE SECTION */}
                <div className="relative group">

                    {/* Glow */}
                    <div className="absolute -inset-6 bg-linear-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-[40px] blur-3xl opacity-20 group-hover:opacity-40 transition-all duration-700"></div>

                    {/* Main Image */}
                    <div className="relative overflow-hidden rounded-4xl shadow-2xl">

                        <img
                            src={
                                aboutReducer?.image
                                    ? `${BASE_URL}/${aboutReducer.image}`
                                    : "https://images.unsplash.com/photo-1529390079861-591de354faf5?q=80&w=1200&auto=format&fit=crop"
                            }
                            alt="About"
                            className="
                                w-full
                                h-137.5
                                object-cover
                                transition-all
                                duration-700
                                group-hover:scale-110
                            "
                        />

                    </div>

                    {/* Floating Card */}
                    <div className="absolute -bottom-8 -right-8 bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-6 border border-white/50">

                        <div className="flex items-center gap-4">

                            <div className="w-14 h-14 rounded-2xl bg-linear-to-r from-blue-500 to-indigo-600 text-white flex items-center justify-center">

                                <GraduationCap />

                            </div>

                            <div>

                                <h3 className="text-2xl font-bold text-gray-900">
                                    100%
                                </h3>

                                <p className="text-gray-500 text-sm">
                                    Student Focused
                                </p>

                            </div>

                        </div>

                    </div>

                </div>

                {/* CONTENT */}
                <div>

                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white shadow-lg border border-blue-100 text-blue-700 font-semibold">

                        <School size={18} />

                        About Our Institution

                    </div>

                    {/* Heading */}
                    <h2 className="mt-8 text-5xl lg:text-6xl font-black leading-tight">

                        Welcome To

                        <span className="block bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                            {aboutReducer?.schoolName}
                        </span>

                    </h2>

                    {/* Description */}
                    <p className="mt-8 text-lg text-gray-600 leading-9">

                        {aboutReducer?.description ||
                            "We provide a dynamic learning environment where students develop academically, socially, and personally. Our institution focuses on innovation, excellence, leadership, and values that prepare learners for a successful future."
                        }

                    </p>

                    {/* Quote */}
                    <div className="mt-10 p-6 rounded-3xl bg-linear-to-r from-blue-600 to-indigo-700 text-white shadow-2xl">

                        <p className="text-lg italic leading-8">
                            “Education is not just about acquiring knowledge;
                            it is about empowering young minds to shape a
                            better future.”
                        </p>

                    </div>

                </div>

            </div>

        </section>
    );
};

export default About;
