import {
    FaGraduationCap,
    FaBookReader,
    FaLaptopCode,
    FaFlask,
    FaFutbol,
    FaPalette,
} from "react-icons/fa";

const programs = [
    {
        title: "Primary Education",
        icon: <FaBookReader />,
        description:
            "Building strong academic foundations through engaging and interactive learning experiences.",
    },
    {
        title: "Secondary Education",
        icon: <FaGraduationCap />,
        description:
            "Preparing students for higher education with comprehensive academic excellence.",
    },
    {
        title: "Computer Lab",
        icon: <FaLaptopCode />,
        description:
            "Modern technology education with practical learning and digital literacy programs.",
    },
    {
        title: "Science Laboratory",
        icon: <FaFlask />,
        description:
            "Hands-on experiments and scientific exploration to inspire innovation and discovery.",
    },
    {
        title: "Sports & Athletics",
        icon: <FaFutbol />,
        description:
            "Encouraging physical fitness, teamwork, leadership, and healthy competition.",
    },
    {
        title: "Arts & Creativity",
        icon: <FaPalette />,
        description:
            "Nurturing creativity through music, drawing, painting, and cultural activities.",
    },
];

function Programs() {
    return (
        <section className="py-24 bg-gradient-to-b from-white to-blue-50">

            <div className="max-w-7xl mx-auto px-6">

                {/* Heading */}
                <div className="text-center mb-16">

                    <span className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full font-semibold">
                        Academic Excellence
                    </span>

                    <h2 className="text-4xl md:text-5xl font-bold mt-5 text-gray-900">
                        Our Programs
                    </h2>

                </div>

                {/* Cards */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

                    {programs.map((program, index) => (

                        <div
                            key={index}
                            className="
                                group
                                bg-white
                                rounded-3xl
                                p-8
                                shadow-lg
                                hover:shadow-2xl
                                transition-all
                                duration-500
                                hover:-translate-y-3
                                border
                                border-gray-100
                                relative
                                overflow-hidden
                            "
                        >

                            {/* Background Effect */}
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>

                            {/* Icon */}
                            <div
                                className="
                                    w-20
                                    h-20
                                    rounded-2xl
                                    bg-gradient-to-r
                                    from-blue-500
                                    to-indigo-600
                                    text-white
                                    flex
                                    items-center
                                    justify-center
                                    text-3xl
                                    mb-6
                                    shadow-lg
                                    group-hover:rotate-6
                                    transition-all
                                    duration-500
                                "
                            >
                                {program.icon}
                            </div>

                            {/* Content */}
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">
                                {program.title}
                            </h3>

                            <p className="text-gray-600 leading-7">
                                {program.description}
                            </p>

                        </div>

                    ))}

                </div>

            </div>

        </section>
    );
}

export default Programs;