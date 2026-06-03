import {
    useState,
} from "react";

import {
    useSelector,
} from "react-redux";

import Layout from "../../components/layout/Layout";
import API from "../../services/api"


function Contact() {

    // REDUX SETTINGS
    const { settings } =
        useSelector(
            (state) =>
                state.settings
        );

    // FORM STATE
    const [formData,
        setFormData] =
        useState({

            name: "",

            email: "",

            phone: "",

            subject: "",

            message: "",
        });

    // LOADING
    const [loading,
        setLoading] =
        useState(false);

    // SUCCESS
    const [success,
        setSuccess] =
        useState("");

    // ERROR
    const [error,
        setError] =
        useState("");


    // CHANGE HANDLER
    const changeHandler =
        (e) => {

            setFormData({

                ...formData,

                [e.target.name]:
                    e.target.value,
            });
        };


    // SUBMIT
    const submitHandler =
        async (e) => {

            e.preventDefault();

            try {
                setLoading(true);
                setSuccess("");
                setError("");
                const { data } =
                    await API.post(
                        "/contact",
                        formData
                    );

                setSuccess(
                    data.message
                );

                setFormData({
                    name: "",
                    email: "",
                    phone: "",
                    subject: "",
                    message: "",
                });

            } catch (error) {

                setError(
                    error.response?.data?.message ||
                    "Something went wrong"
                );

            } finally {

                setLoading(false);
            }
        };


    return (

        <Layout>

            {/* HERO */}

            <section className="relative bg-blue-700 text-white py-18  overflow-hidden">

                <div className="absolute inset-0 bg-black/30"></div>

                <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">

                    <h1 className="text-5xl lg:text-7xl font-bold mb-6">

                        Contact Us

                    </h1>

                    <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-9">

                        We would love to hear from you.
                        Contact us for admissions, inquiries,
                        or any support regarding our school.

                    </p>

                </div>

            </section>


            {/* CONTACT SECTION */}

            <section className="py-24 bg-gray-100">

                <div className="max-w-7xl mx-auto px-6 lg:px-12">

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">


                        {/* LEFT SIDE */}

                        <div className="bg-white rounded-3xl shadow-2xl p-10">

                            <h2 className="text-4xl font-bold text-gray-800 mb-10">

                                Get In Touch

                            </h2>


                            {/* CONTACT INFO */}

                            <div className="space-y-8">


                                {/* ADDRESS */}

                                <div className="flex items-start gap-5">

                                    <div className="bg-blue-100 text-blue-700 w-14 h-14 rounded-2xl flex items-center justify-center text-2xl">

                                        📍

                                    </div>

                                    <div>

                                        <h3 className="text-xl font-semibold text-gray-800 mb-2">

                                            Address

                                        </h3>

                                        <p className="text-gray-600 leading-8">

                                            {settings?.address}

                                        </p>

                                    </div>

                                </div>


                                {/* EMAIL */}

                                <div className="flex items-start gap-5">

                                    <div className="bg-green-100 text-green-700 w-14 h-14 rounded-2xl flex items-center justify-center text-2xl">

                                        ✉️

                                    </div>

                                    <div>

                                        <h3 className="text-xl font-semibold text-gray-800 mb-2">

                                            Email

                                        </h3>

                                        <a className="text-gray-600" href={`mailto:${settings?.email}`}>
                                            {settings?.email}
                                        </a>

                                    </div>

                                </div>


                                {/* PHONE */}

                                <div className="flex items-start gap-5">

                                    <div className="bg-yellow-100 text-yellow-700 w-14 h-14 rounded-2xl flex items-center justify-center text-2xl">

                                        📞

                                    </div>

                                    <div>

                                        <h3 className="text-xl font-semibold text-gray-800 mb-2">

                                            Phone

                                        </h3>


                                        <a className="text-gray-600" href={`tel:${settings?.phone}`}>
                                            {settings?.phone}
                                        </a>


                                        <p className="text-gray-600 mt-1">

                                            {settings?.alternatePhone}

                                        </p>

                                    </div>

                                </div>


                                {/* HOURS */}

                                <div className="flex items-start gap-5">

                                    <div className="bg-purple-100 text-purple-700 w-14 h-14 rounded-2xl flex items-center justify-center text-2xl">

                                        ⏰

                                    </div>

                                    <div>

                                        <h3 className="text-xl font-semibold text-gray-800 mb-2">

                                            Opening Hours

                                        </h3>

                                        <p className="text-gray-600 leading-8">

                                            {settings?.openingHours}

                                        </p>

                                    </div>

                                </div>

                            </div>


                            {/* SOCIAL LINKS */}

                            <div className="mt-14">

                                <h3 className="text-2xl font-bold text-gray-800 mb-6">

                                    Follow Us

                                </h3>

                                <div className="flex flex-wrap gap-4">


                                    {
                                        settings?.socialLinks?.facebook && (

                                            <a
                                                href={
                                                    settings.socialLinks.facebook
                                                }
                                                target="_blank"
                                                rel="noreferrer"
                                                className="bg-blue-600 text-white px-6 py-3 rounded-2xl hover:bg-blue-700 transition-all"
                                            >
                                                Facebook
                                            </a>
                                        )
                                    }


                                    {
                                        settings?.socialLinks?.instagram && (

                                            <a
                                                href={
                                                    settings.socialLinks.instagram
                                                }
                                                target="_blank"
                                                rel="noreferrer"
                                                className="bg-pink-600 text-white px-6 py-3 rounded-2xl hover:bg-pink-700 transition-all"
                                            >
                                                Instagram
                                            </a>
                                        )
                                    }


                                    {
                                        settings?.socialLinks?.youtube && (

                                            <a
                                                href={
                                                    settings.socialLinks.youtube
                                                }
                                                target="_blank"
                                                rel="noreferrer"
                                                className="bg-red-600 text-white px-6 py-3 rounded-2xl hover:bg-red-700 transition-all"
                                            >
                                                YouTube
                                            </a>
                                        )
                                    }

                                </div>

                            </div>

                        </div>


                        {/* RIGHT SIDE FORM */}

                        <div className="bg-white rounded-3xl shadow-2xl p-10">

                            <h2 className="text-4xl font-bold text-gray-800 mb-10">

                                Send Message

                            </h2>


                            {/* SUCCESS */}

                            {
                                success && (

                                    <div className="bg-green-100 text-green-700 p-4 rounded-2xl mb-6">

                                        {success}

                                    </div>
                                )
                            }


                            {/* ERROR */}

                            {
                                error && (

                                    <div className="bg-red-100 text-red-700 p-4 rounded-2xl mb-6">

                                        {error}

                                    </div>
                                )
                            }


                            {/* FORM */}

                            <form
                                onSubmit={submitHandler}
                                className="space-y-6"
                            >

                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Your Name"
                                    value={formData.name}
                                    onChange={changeHandler}
                                    className="w-full border p-4 rounded-2xl outline-none focus:border-blue-500"
                                />

                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Your Email"
                                    value={formData.email}
                                    onChange={changeHandler}
                                    className="w-full border p-4 rounded-2xl outline-none focus:border-blue-500"
                                />

                                <input
                                    type="text"
                                    name="phone"
                                    placeholder="Phone Number"
                                    value={formData.phone}
                                    onChange={changeHandler}
                                    className="w-full border p-4 rounded-2xl outline-none focus:border-blue-500"
                                />

                                <input
                                    type="text"
                                    name="subject"
                                    placeholder="Subject"
                                    value={formData.subject}
                                    onChange={changeHandler}
                                    className="w-full border p-4 rounded-2xl outline-none focus:border-blue-500"
                                />

                                <textarea
                                    rows="6"
                                    name="message"
                                    placeholder="Write your message..."
                                    value={formData.message}
                                    onChange={changeHandler}
                                    className="w-full border p-4 rounded-2xl outline-none focus:border-blue-500"
                                ></textarea>

                                <button
                                    disabled={loading}
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl text-lg font-semibold transition-all"
                                >
                                    {
                                        loading
                                            ? "Sending..."
                                            : "Send Message"
                                    }
                                </button>

                            </form>

                        </div>

                    </div>

                </div>

            </section>

        </Layout>
    );
}

export default Contact;