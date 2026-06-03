import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../components/admin/AdminLayout";
import API from "../../services/api";



function AddGallery() {
    const navigate = useNavigate();
    // STATES
    const [title, setTitle] =
        useState("");
    const [images, setImages] =
        useState([]);
    const [previewImages, setPreviewImages] =
        useState([]);
    const [loading, setLoading] =
        useState(false);




    // HANDLE IMAGES
    const handleImages = (e) => {
        const files =
            Array.from(e.target.files);
        setImages(files);

        // PREVIEW
        const previews = files.map((file) =>
            URL.createObjectURL(file)
        );
        setPreviewImages(previews);
    };

    // SUBMIT
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            setLoading(true);
            // FORM DATA
            const galleryData =
                new FormData();

            galleryData.append(
                "title",
                title
            );

            // MULTIPLE IMAGES
            images.forEach((image) => {
                galleryData.append(
                    "images",
                    image
                );
            });

            // API
            await API.post(
                "/gallery",
                galleryData,
                {
                    headers: {
                        "Content-Type":
                            "multipart/form-data",
                    },
                }
            );
            alert("Gallery Added");
            navigate("/admin/gallery");
        } catch (error) {
            console.log(error);
            alert("Upload Failed");
        } finally {

            setLoading(false);
        }
    };

    return (

        <AdminLayout>
            {/* TITLE */}
            <h1 className="text-3xl font-bold mb-8">
                Add Gallery
            </h1>

            {/* FORM */}
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-2xl shadow-md"
            >
                <div className="grid grid-cols-1 gap-6">

                    {/* TITLE */}
                    <input
                        type="text"
                        placeholder="Gallery Title"
                        value={title}
                        onChange={(e) =>
                            setTitle(e.target.value)
                        }
                        required
                        className="border border-gray-300 p-3 rounded-lg outline-none"
                    />

                    {/* MULTIPLE IMAGES */}
                    <input
                        type="file"
                        multiple
                        onChange={handleImages}
                        required
                        className="border border-gray-300 p-3 rounded-lg"
                    />

                </div>

                {/* IMAGE PREVIEW */}
                {
                    previewImages.length > 0 && (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                            {
                                previewImages.map(
                                    (image, index) => (

                                        <img
                                            key={index}
                                            src={image}
                                            alt="Preview"
                                            className="w-full h-40 object-cover rounded-xl border"
                                        />
                                    )
                                )
                            }

                        </div>
                    )
                }

                {/* BUTTON */}
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-black hover:bg-gray-800 text-white px-8 py-3 rounded-lg mt-6"
                >
                    {
                        loading
                            ? "Uploading..."
                            : "Upload Gallery"
                    }
                </button>
            </form>
        </AdminLayout>
    );
}

export default AddGallery;