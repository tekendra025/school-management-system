import { useEffect, useState, } from "react";
import { useSelector, } from "react-redux";
import API, { BASE_URL } from "../../services/api";
import Layout from "../../components/layout/Layout";
import WhyChoose from "../../components/website/WhyChoose";


function About() {

    // REDUX ABOUT
    const { about } = useSelector((state) => state.about);

    // STAFF STATE
    const [staffs, setStaffs] = useState([]);

    // FETCH STAFF
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

    // FIND PRINCIPAL
    const principal = staffs?.find((s) => s.position === "Principle");

    return (
        <Layout>
            {/* HERO SECTION */}
            <section className="relative bg-blue-700 text-white py-18  overflow-hidden">
                <div className="absolute inset-0 bg-black/30"></div>
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <h1 className="text-5xl lg:text-7xl font-bold mb-6">
                        About Us
                    </h1>

                    <p className="text-xl text-white/80 max-w-3xl mx-auto">
                        Learn more about our school,
                        our mission, and our commitment
                        to excellence in education.
                    </p>

                </div>

            </section>

            {/* ABOUT SECTION */}
            <section className="py-24 bg-white">

                <div className="max-w-7xl mx-auto px-6 lg:px-12">

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        {/* IMAGE */}
                        <div>
                            {about?.image && (
                                <img
                                    src={`${BASE_URL}/${about.image}`}
                                    alt="About"
                                    className="w-full h-137.5 object-cover rounded-3xl shadow-2xl"
                                />
                            )}
                        </div>

                        {/* CONTENT */}
                        <div>
                            <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-8 leading-tight">
                                {about?.schoolName}
                            </h2>

                            <p className="text-gray-600 text-lg leading-9 mb-8">
                                {about?.description}
                            </p>

                            {/* MISSION */}
                            <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-2xl mb-8">

                                <h3 className="text-2xl font-bold text-blue-700 mb-4">
                                    Our Mission
                                </h3>
                                <p className="text-gray-700 leading-8">
                                    {about?.mission}
                                </p>

                            </div>


                            {/* VISION */}
                            <div className="bg-green-50 border-l-4 border-green-600 p-6 rounded-2xl">

                                <h3 className="text-2xl font-bold text-green-700 mb-4">
                                    Our Vision
                                </h3>
                                <p className="text-gray-700 leading-8">
                                    {about?.vision}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* PRINCIPAL SECTION */}
            <section className="py-24 bg-gray-100">
                <div className="max-w-5xl mx-auto px-6 lg:px-12">
                    <div className="bg-white rounded-3xl shadow-2xl p-10 lg:p-16">
                        <div className="text-center mb-10">
                            <h2 className="text-4xl font-bold text-gray-800 mb-4">
                                Principal's Message
                            </h2>
                            <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full"></div>
                        </div>

                        {/* PRINCIPAL PROFILE */}
                        <div className="flex flex-col items-center mb-8">
                            {principal?.image && (
                                <img
                                    src={`${BASE_URL}/${principal.image}`}
                                    alt="Principal"
                                    className="w-32 h-32 rounded-full object-cover border-4 border-blue-600 mb-4"
                                />
                            )}

                            <h3 className="text-2xl font-bold text-gray-800">
                                {principal?.name || "Principal"}
                            </h3>

                            <p className="text-gray-500">
                                Principal
                            </p>
                        </div>


                        {/* MESSAGE */}
                        <p className="text-gray-700 text-xl leading-10 text-center italic">
                            “{about?.principalMessage}”
                        </p>
                    </div>
                </div>
            </section>
            <WhyChoose />
        </Layout>
    );
}

export default About;