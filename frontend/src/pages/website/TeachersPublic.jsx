import {
    useEffect,
    useState,
} from "react";
import API, { BASE_URL } from "../../services/api";
import Layout from "../../components/layout/Layout";
import {
    FaFacebook,
    FaLinkedin,
    FaTwitter,
    FaInstagram,
} from "react-icons/fa";


function TeachersPublic() {

    const [teachers,
        setTeachers] =
        useState([]);

    const [loading,
        setLoading] =
        useState(true);


    // FETCH TEACHERS
    useEffect(() => {

        const fetchTeachers =
            async () => {

                try {

                    const { data } =
                        await API.get(
                            "/teachers"
                        );

                    setTeachers(
                        data.teachers
                    );

                } catch (error) {

                    console.log(
                        error
                    );

                } finally {

                    setLoading(
                        false
                    );
                }
            };

        fetchTeachers();

    }, []);


    return (

        <Layout>

            {/* HERO SECTION */}
            <section className="relative bg-blue-700 text-white py-18  overflow-hidden">

                <div className="absolute inset-0 bg-black/30"></div>

                <div className="max-w-7xl mx-auto px-6 text-center">

                    <h1 className="text-5xl lg:text-7xl font-bold mb-6">
                        Our Teachers
                    </h1>

                    <p className="text-xl text-white/80 max-w-3xl mx-auto">
                        Meet our experienced and dedicated teachers
                        who guide students toward success.
                    </p>

                </div>

            </section>


            {/* TEACHERS GRID */}
            <section className="py-24 bg-gray-100">

                <div className="max-w-7xl mx-auto px-6">


                    {loading ? (

                        <p className="text-center text-gray-600">
                            Loading...
                        </p>

                    ) : teachers.length === 0 ? (

                        <p className="text-center text-gray-600">
                            No teachers found
                        </p>

                    ) : (


                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">


                            {teachers.map(
                                (teacher) => (

                                    <div
                                        key={teacher._id}
                                        className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all overflow-hidden group border border-gray-100"
                                    >

                                        {/* IMAGE */}
                                        <div className="relative overflow-hidden">

                                            <img
                                                src={`${BASE_URL}/${teacher.image}`}
                                                alt={teacher.name}
                                                className="w-full h-52 object-cover group-hover:scale-110 transition-transform duration-500"
                                            />

                                            <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent"></div>

                                        </div>


                                        {/* CONTENT */}
                                        <div className="p-4 text-center">

                                            {/* NAME */}
                                            <h2 className="text-lg font-bold text-gray-800">

                                                {teacher.name}

                                            </h2>


                                            {/* SUBJECT */}
                                            <span className="inline-block mt-2 px-3 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded-full">

                                                {teacher.subject}

                                            </span>


                                            {/* EDUCATION */}
                                            <p className="text-gray-500 text-sm mt-3 line-clamp-2">

                                                {teacher.education}

                                            </p>


                                            {/* EXPERIENCE */}
                                            <p className="text-gray-400 text-xs mt-1">

                                                {teacher.experience} Experience

                                            </p>


                                            {/* SOCIAL LINKS */}
                                            <div className="flex justify-center gap-3 mt-4 text-sm">

                                                {teacher.socialLinks?.facebook && (

                                                    <a
                                                        href={
                                                            teacher.socialLinks.facebook
                                                        }
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="text-blue-600 hover:scale-110 transition"
                                                    >
                                                        <FaFacebook />
                                                    </a>

                                                )}


                                                {teacher.socialLinks?.linkedin && (

                                                    <a
                                                        href={
                                                            teacher.socialLinks.linkedin
                                                        }
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="text-blue-700 hover:scale-110 transition"
                                                    >
                                                        <FaLinkedin />
                                                    </a>

                                                )}


                                                {teacher.socialLinks?.twitter && (

                                                    <a
                                                        href={
                                                            teacher.socialLinks.twitter
                                                        }
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="text-sky-500 hover:scale-110 transition"
                                                    >
                                                        <FaTwitter />
                                                    </a>

                                                )}


                                                {teacher.socialLinks?.instagram && (

                                                    <a
                                                        href={
                                                            teacher.socialLinks.instagram
                                                        }
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="text-pink-500 hover:scale-110 transition"
                                                    >
                                                        <FaInstagram />
                                                    </a>

                                                )}

                                            </div>

                                        </div>

                                    </div>

                                )
                            )}

                        </div>

                    )}

                </div>

            </section>

        </Layout>
    );
}

export default TeachersPublic;