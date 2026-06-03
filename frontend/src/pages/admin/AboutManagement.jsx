import {
    useEffect,
    useState,
} from "react";

import AdminLayout from "../../components/admin/AdminLayout";

import API, { BASE_URL } from "../../services/api";



function AboutManagement() {

    // STATES
    const [formData, setFormData] =
        useState({

            schoolName: "",

            description: "",

            mission: "",

            vision: "",

            principalMessage: "",
        });


    const [image, setImage] =
        useState(null);

    const [previewImage, setPreviewImage] =
        useState("");

    const [loading, setLoading] =
        useState(true);

    const [updateLoading, setUpdateLoading] =
        useState(false);




    // FETCH ABOUT DATA
    useEffect(() => {

        const fetchAbout = async () => {

            try {

                const { data } = await API.get(
                    "/about"
                );


                console.log(data);


                const about = data.about;


                if (about) {

                    setFormData({

                        schoolName:
                            about.schoolName || "",

                        description:
                            about.description || "",

                        mission:
                            about.mission || "",

                        vision:
                            about.vision || "",

                        principalMessage:
                            about.principalMessage || "",
                    });


                    // IMAGE
                    if (about.image) {

                        setPreviewImage(

                            `${BASE_URL}/${about.image}`
                        );
                    }
                }

            } catch (error) {

                console.log(error);

            } finally {

                setLoading(false);
            }
        };


        fetchAbout();

    }, []);




    // HANDLE CHANGE
    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]:
                e.target.value,
        });
    };




    // HANDLE IMAGE
    const handleImage = (e) => {

        const file = e.target.files[0];

        setImage(file);


        if (file) {

            setPreviewImage(

                URL.createObjectURL(file)
            );
        }
    };




    // SUBMIT
    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setUpdateLoading(true);


            // FORM DATA
            const aboutData =
                new FormData();


            aboutData.append(
                "schoolName",
                formData.schoolName
            );

            aboutData.append(
                "description",
                formData.description
            );

            aboutData.append(
                "mission",
                formData.mission
            );

            aboutData.append(
                "vision",
                formData.vision
            );

            aboutData.append(
                "principalMessage",
                formData.principalMessage
            );


            // IMAGE
            if (image) {

                aboutData.append(
                    "image",
                    image
                );
            }



            // API CALL
            await API.post(

                "/about",

                aboutData,

                {
                    headers: {

                        "Content-Type":
                            "multipart/form-data",
                    },
                }
            );


            alert("About Updated Successfully");

        } catch (error) {

            console.log(error);

            alert("Update Failed");

        } finally {

            setUpdateLoading(false);
        }
    };




    return (

        <AdminLayout>

            {/* PAGE TITLE */}

            <h1 className="text-3xl font-bold mb-8">

                About Us Management

            </h1>



            {
                loading ? (

                    <h1 className="text-xl">

                        Loading...

                    </h1>

                ) : (

                    <form
                        onSubmit={handleSubmit}
                        className="bg-white p-8 rounded-2xl shadow-md"
                    >

                        {/* SCHOOL NAME */}

                        <div className="mb-6">

                            <label className="block font-medium mb-2">

                                School Name

                            </label>

                            <input
                                type="text"
                                name="schoolName"
                                value={formData.schoolName}
                                onChange={handleChange}
                                required
                                className="w-full border border-gray-300 p-3 rounded-lg"
                            />

                        </div>



                        {/* DESCRIPTION */}

                        <div className="mb-6">

                            <label className="block font-medium mb-2">

                                Description

                            </label>

                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows="5"
                                required
                                className="w-full border border-gray-300 p-3 rounded-lg"
                            />

                        </div>



                        {/* MISSION */}

                        <div className="mb-6">

                            <label className="block font-medium mb-2">

                                Mission

                            </label>

                            <textarea
                                name="mission"
                                value={formData.mission}
                                onChange={handleChange}
                                rows="4"
                                required
                                className="w-full border border-gray-300 p-3 rounded-lg"
                            />

                        </div>



                        {/* VISION */}

                        <div className="mb-6">

                            <label className="block font-medium mb-2">

                                Vision

                            </label>

                            <textarea
                                name="vision"
                                value={formData.vision}
                                onChange={handleChange}
                                rows="4"
                                required
                                className="w-full border border-gray-300 p-3 rounded-lg"
                            />

                        </div>



                        {/* PRINCIPAL MESSAGE */}

                        <div className="mb-6">

                            <label className="block font-medium mb-2">

                                Principal Message

                            </label>

                            <textarea
                                name="principalMessage"
                                value={formData.principalMessage}
                                onChange={handleChange}
                                rows="5"
                                required
                                className="w-full border border-gray-300 p-3 rounded-lg"
                            />

                        </div>



                        {/* IMAGE */}

                        <div className="mb-6">

                            <label className="block font-medium mb-2">

                                About Image

                            </label>

                            <input
                                type="file"
                                onChange={handleImage}
                                className="w-full border border-gray-300 p-3 rounded-lg"
                            />

                        </div>



                        {/* IMAGE PREVIEW */}

                        {
                            previewImage && (

                                <div className="mb-6">

                                    <img
                                        src={previewImage}
                                        alt="Preview"
                                        className="w-72 h-52 object-cover rounded-xl border"
                                    />

                                </div>
                            )
                        }



                        {/* BUTTON */}

                        <button
                            type="submit"
                            disabled={updateLoading}
                            className="bg-black hover:bg-gray-800 text-white px-8 py-3 rounded-lg"
                        >

                            {
                                updateLoading
                                    ? "Updating..."
                                    : "Update About Us"
                            }

                        </button>

                    </form>
                )
            }

        </AdminLayout>
    );
}

export default AboutManagement;