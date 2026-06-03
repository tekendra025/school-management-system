import {
    useEffect,
    useState,
} from "react";

import {
    useParams,
} from "react-router-dom";

import API, { BASE_URL } from "../../../services/api";
import Layout from "../../../components/layout/Layout";

function SingleGallery() {
    const { id } = useParams();
    const [gallery, setGallery] = useState(null);
    const [loading, setLoading] = useState(true);

    // Lightbox state
    const [selectedImage, setSelectedImage] = useState(null);

    // FETCH SINGLE GALLERY
    useEffect(() => {
        const fetchSingle = async () => {
            try {
                const { data } = await API.get(
                    `/gallery/${id}`
                );

                setGallery(
                    data.gallery
                );

            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        fetchSingle();
    }, [id]);

    return (
        <Layout>

            {/* HERO */}
            <section className="relative bg-blue-700 text-white py-18  overflow-hidden">
                <div className="absolute inset-0 bg-black/30"></div>
                <div className="max-w-5xl mx-auto text-center px-6">
                    <h1 className="text-4xl md:text-5xl font-bold">
                        {gallery?.title}
                    </h1>

                </div>
            </section>

            {/* IMAGES */}
            <section className="py-20 bg-gray-100">
                <div className="max-w-7xl mx-auto px-6">
                    {loading ? (
                        <p className="text-center text-lg">
                            Loading...
                        </p>

                    ) : !gallery ? (
                        <p className="text-center text-lg">
                            Gallery not found
                        </p>

                    ) : (

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                            {gallery.images?.map(
                                (img, index) => (
                                    <div
                                        key={index}
                                        className="overflow-hidden rounded-2xl shadow-lg bg-white"
                                    >
                                        <img
                                            src={`${BASE_URL}/${img}`}
                                            alt={`Gallery ${index + 1}`}
                                            onClick={() =>
                                                setSelectedImage(
                                                    `${BASE_URL}/${img}`
                                                )
                                            }
                                            className="w-full h-64 object-cover cursor-pointer hover:scale-110 transition-transform duration-500"
                                        />

                                    </div>
                                )
                            )}

                        </div>

                    )}

                </div>

            </section>

            {/* IMAGE LIGHTBOX */}
            {selectedImage && (

                <div
                    className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
                    onClick={() =>
                        setSelectedImage(null)
                    }
                >

                    {/* Close Button */}
                    <button
                        onClick={() =>
                            setSelectedImage(null)
                        }
                        className="absolute top-5 right-6 text-white text-5xl font-light hover:text-red-400 transition"
                    >
                        ×
                    </button>

                    {/* Image */}
                    <img
                        src={selectedImage}
                        alt="Preview"
                        onClick={(e) =>
                            e.stopPropagation()
                        }
                        className="max-w-full max-h-[90vh] rounded-2xl shadow-2xl"
                    />

                </div>

            )}

        </Layout>
    );
}

export default SingleGallery;