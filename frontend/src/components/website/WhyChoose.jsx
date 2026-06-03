import {
    Award,
    GraduationCap,
    Star,
    Users,
} from "lucide-react";

const features = [
    {
        icon: Users,
        title: "Expert Faculty",
        description:
            "Highly qualified and experienced teachers dedicated to inspiring academic excellence.",
        color: "from-blue-500 to-blue-700",
    },
    {
        icon: Award,
        title: "Academic Excellence",
        description:
            "A strong curriculum designed to achieve outstanding academic performance and growth.",
        color: "from-purple-500 to-indigo-600",
    },
    {
        icon: Star,
        title: "Character Development",
        description:
            "We focus on integrity, discipline, leadership, and strong moral values.",
        color: "from-orange-400 to-amber-500",
    },
    {
        icon: GraduationCap,
        title: "Future Ready Education",
        description:
            "Preparing students with modern skills, creativity, and confidence for tomorrow.",
        color: "from-green-500 to-emerald-600",
    },
];

const WhyChoose = () => {
    return (
        <section className="relative py-28 overflow-hidden bg-linear-to-r from-slate-50 via-blue-50 to-indigo-50">

            {/* Background Effects */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl"></div>

            <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl"></div>

            <div className="max-w-7xl mx-auto px-6 relative">

                {/* Heading */}
                <div className="text-center mb-24">

                    <span className="inline-flex items-center px-5 py-2 rounded-full bg-blue-100 text-blue-700 font-semibold">
                        Why Choose Us
                    </span>

                    <h2 className="mt-6 text-5xl md:text-6xl font-black text-gray-900">
                        Building Future
                        <span className="block bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                            Leaders
                        </span>
                    </h2>

                    <p className="max-w-3xl mx-auto mt-6 text-lg text-gray-600 leading-8">
                        We nurture academic excellence, leadership,
                        innovation, and character development to help
                        students succeed in a rapidly changing world.
                    </p>

                </div>

                {/* Timeline */}
                <div className="relative">

                    {/* Center Line */}
                    <div className="hidden md:block absolute left-1/2 top-0 -translate-x-1/2 w-1 h-full bg-linear-to-r from-blue-500 via-purple-500 to-green-500 rounded-full"></div>

                    {features.map((item, index) => {
                        const Icon = item.icon;

                        return (
                            <div
                                key={index}
                                className={`relative flex items-center mb-20 ${index % 2 === 0
                                    ? "md:justify-start"
                                    : "md:justify-end"
                                    }`}
                            >

                                {/* Card */}
                                <div
                                    className="
                                        w-full
                                        md:w-[45%]
                                        bg-white/80
                                        backdrop-blur-xl
                                        rounded-4xl
                                        p-8
                                        shadow-xl
                                        hover:shadow-2xl
                                        transition-all
                                        duration-500
                                        hover:-translate-y-3
                                        group
                                    "
                                >

                                    <div
                                        className={`
                                            w-20 h-20 rounded-3xl
                                            bg-linear-to-r ${item.color}
                                            text-white
                                            flex items-center justify-center
                                            shadow-lg
                                            mb-6
                                            group-hover:rotate-12
                                            group-hover:scale-110
                                            transition-all duration-500
                                        `}
                                    >
                                        <Icon size={36} />
                                    </div>

                                    <h3 className="text-2xl font-bold text-gray-900">
                                        {item.title}
                                    </h3>

                                    <p className="text-gray-600 leading-8 mt-4">
                                        {item.description}
                                    </p>

                                </div>

                                {/* Timeline Circle */}
                                <div
                                    className="
                                        hidden md:flex
                                        absolute left-1/2
                                        -translate-x-1/2
                                        w-16 h-16
                                        rounded-full
                                        bg-white
                                        shadow-2xl
                                        items-center
                                        justify-center
                                        border-4 border-blue-100
                                        z-10
                                    "
                                >

                                    <div
                                        className={`
                                            w-10 h-10 rounded-full
                                            bg-linear-to-r ${item.color}
                                        `}
                                    />

                                </div>

                            </div>
                        );
                    })}

                </div>

                {/* Bottom CTA */}
                <div className="mt-20">

                    <div className="bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-[40px] p-10 md:p-14 text-white shadow-2xl">

                        <div className="flex flex-col md:flex-row justify-between items-center gap-8">

                            <div>

                                <h3 className="text-4xl font-black">
                                    Excellence Starts Here
                                </h3>

                                <p className="mt-4 text-white/90 text-lg">
                                    Inspiring students to learn, lead,
                                    and succeed every day.
                                </p>

                            </div>

                            <div className="text-center">

                                <h2 className="text-6xl font-black">
                                    20+
                                </h2>

                                <p className="text-white/80">
                                    Years of Excellence
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhyChoose;