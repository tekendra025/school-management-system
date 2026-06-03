import { useState } from "react";

import API from "../../services/api";
import Layout from "../../components/layout/Layout";



function AdmissionForm() {

    const [formData, setFormData] =
        useState({

            fullName: "",

            email: "",

            phone: "",

            className: "",

            address: "",

            previousSchool: "",

            message: "",
        });


    const [loading, setLoading] =
        useState(false);




    // HANDLE CHANGE
    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]:
                e.target.value,
        });
    };




    // SUBMIT
    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);


            const { data } =
                await API.post(

                    "/admissions",

                    formData
                );


            alert(data.message);


            // RESET FORM
            setFormData({

                fullName: "",

                email: "",

                phone: "",

                className: "",

                address: "",

                previousSchool: "",

                message: "",
            });

        } catch (error) {

            console.log(error);

            alert(

                error.response?.data?.message ||
                "Submission Failed"
            );

        } finally {

            setLoading(false);
        }
    };




    return (
        <Layout >


            <div className="min-h-screen bg-gray-100 py-12 px-4">
                <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-md">
                    <h1 className="text-4xl font-bold mb-8 text-center">
                        Admission Form
                    </h1>

                    <form
                        onSubmit={handleSubmit}
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* FULL NAME */}
                            <input
                                type="text"
                                name="fullName"
                                placeholder="Full Name"
                                value={formData.fullName}
                                onChange={handleChange}
                                required
                                className="border border-gray-300 p-3 rounded-lg"
                            />

                            {/* EMAIL */}
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="border border-gray-300 p-3 rounded-lg"
                            />

                            {/* PHONE */}
                            <input
                                type="text"
                                name="phone"
                                placeholder="Phone Number"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                                className="border border-gray-300 p-3 rounded-lg"
                            />

                            {/* CLASS */}
                            <input
                                type="text"
                                name="className"
                                placeholder="Class Name"
                                value={formData.className}
                                onChange={handleChange}
                                required
                                className="border border-gray-300 p-3 rounded-lg"
                            />
                        </div>



                        {/* ADDRESS */}
                        <textarea
                            name="address"
                            placeholder="Address"
                            value={formData.address}
                            onChange={handleChange}
                            rows="3"
                            required
                            className="w-full border border-gray-300 p-3 rounded-lg mt-6"
                        />

                        {/* PREVIOUS SCHOOL */}
                        <input
                            type="text"
                            name="previousSchool"
                            placeholder="Previous School"
                            value={formData.previousSchool}
                            onChange={handleChange}
                            className="w-full border border-gray-300 p-3 rounded-lg mt-6"
                        />

                        {/* MESSAGE */}
                        <textarea
                            name="message"
                            placeholder="Message"
                            value={formData.message}
                            onChange={handleChange}
                            rows="5"
                            className="w-full border border-gray-300 p-3 rounded-lg mt-6"
                        />

                        {/* BUTTON */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-black hover:bg-gray-800 text-white px-8 py-3 rounded-lg mt-8 w-full"
                        >
                            {
                                loading
                                    ? "Submitting..."
                                    : "Submit Admission Form"
                            }

                        </button>
                    </form>
                </div>
            </div>
        </Layout>
    );
}

export default AdmissionForm;
