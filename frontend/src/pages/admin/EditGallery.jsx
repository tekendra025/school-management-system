import {
    useEffect,
    useState,
} from "react";

import {
    useNavigate,
    useParams,
} from "react-router-dom";

import {
    FaTrash,
} from "react-icons/fa";

import AdminLayout from "../../components/admin/AdminLayout";

import API, { BASE_URL } from "../../services/api";



function EditGallery() {

    const { id } = useParams();
    const navigate = useNavigate();

    // STATE
    const [title, setTitle] =
        useState("");

    const [gallery, setGallery] =
        useState(null);

    const [images, setImages] =
        useState([]);

    const [preview, setPreview] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [updating, setUpdating] =
        useState(false);


    // FETCH SINGLE GALLERY
    useEffect(() => {
        const fetchGallery = async () => {
            try {
                const { data } = await API.get(
                    `/gallery/${id}`
                );
                setGallery(data.gallery);
                setTitle(
                    data.gallery.title
                );

            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        fetchGallery();

    }, [id]);


    // IMAGE HANDLER
    const imageHandler = (e) => {
        const files = Array.from(
            e.target.files
        );
        setImages(files);
        const previewImages = files.map(
            (file) =>
                URL.createObjectURL(file)
        );

        setPreview(previewImages);
    };

    // UPDATE GALLERY
    const updateGallery = async (e) => {
        e.preventDefault();
        try {
            setUpdating(true);
            const formData = new FormData();
            formData.append(
                "title",
                title
            );

            images.forEach((image) => {

                formData.append(
                    "images",
                    image
                );
            });

            await API.put(
                `/gallery/${id}`,
                formData
            );

            alert("Gallery Updated");

            navigate(
                "/admin/gallery"
            );

        } catch (error) {

            console.log(error);

            alert("Update Failed");

        } finally {

            setUpdating(false);
        }
    };

    // DELETE SINGLE IMAGE
    const deleteImage = async (
        image
    ) => {
        const confirmDelete =
            window.confirm(
                "Delete this image?"
            );

        if (!confirmDelete) return;

        try {

            await API.delete(
                `/gallery/image/${id}`,
                {
                    data: {
                        image,
                    },
                }
            );

            setGallery({
                ...gallery,
                images:
                    gallery.images.filter(
                        (img) =>
                            img !== image
                    ),
            });

            alert("Image Deleted");

        } catch (error) {
            console.log(error);
            alert("Delete Failed");
        }
    };

    return (
        <AdminLayout>
            {
                loading ? (
                    <h1 className="text-2xl">
                        Loading...
                    </h1>

                ) : (
                    <div className="bg-white p-8 rounded-2xl shadow-md">
                        <h1 className="text-3xl font-bold mb-8">
                            Edit Gallery
                        </h1>

                        <form
                            onSubmit={updateGallery}
                            className="space-y-6"
                        >
                            {/* TITLE */}
                            <div>
                                <label className="block mb-2 font-semibold">
                                    Gallery Title
                                </label>

                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) =>
                                        setTitle(
                                            e.target.value
                                        )
                                    }
                                    required
                                    className="w-full border p-3 rounded-xl"
                                />
                            </div>

                            {/* IMAGE INPUT */}
                            <div>
                                <label className="block mb-2 font-semibold">
                                    Add More Images
                                </label>

                                <input
                                    type="file"
                                    multiple
                                    onChange={imageHandler}
                                    className="w-full border p-3 rounded-xl"
                                />
                            </div>

                            {/* NEW IMAGE PREVIEW */}
                            {
                                preview.length > 0 && (
                                    <div>
                                        <h2 className="text-xl font-bold mb-4">
                                            New Images Preview
                                        </h2>

                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                            {
                                                preview.map(
                                                    (
                                                        image,
                                                        index
                                                    ) => (

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

                                    </div>
                                )
                            }

                            {/* OLD IMAGES */}
                            <div>
                                <h2 className="text-xl font-bold mb-4">
                                    Existing Images
                                </h2>

                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

                                    {
                                        gallery?.images?.map(
                                            (
                                                image,
                                                index
                                            ) => (

                                                <div
                                                    key={index}
                                                    className="relative"
                                                >

                                                    <img
                                                        src={`${BASE_URL}/${image}`}
                                                        alt="Gallery"
                                                        className="w-full h-40 object-cover rounded-xl border"
                                                    />

                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            deleteImage(
                                                                image
                                                            )
                                                        }
                                                        className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full"
                                                    >

                                                        <FaTrash />

                                                    </button>

                                                </div>
                                            )
                                        )
                                    }
                                </div>
                            </div>

                            {/* SUBMIT BUTTON */}
                            <button
                                type="submit"
                                disabled={updating}
                                className="bg-black hover:bg-gray-800 text-white px-6 py-3 rounded-xl"
                            >

                                {
                                    updating
                                        ? "Updating..."
                                        : "Update Gallery"
                                }

                            </button>

                        </form>

                    </div>
                )
            }

        </AdminLayout>
    );
}

export default EditGallery;