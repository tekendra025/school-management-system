import { useEffect, useState } from "react";
import API, { BASE_URL } from "../../services/api";

function Gallery() {
    const [gallery, setGallery] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        const fetchGallery = async () => {
            try {
                const { data } = await API.get("/gallery");
                setGallery(data.galleries || []);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        fetchGallery();
    }, []);

    return (
        <>
            <section className="py-20 bg-gray-50 px-6">
                <h2 className="text-4xl font-bold text-center mb-12">
                    Gallery
                </h2>

                {loading ? (
                    <p className="text-center text-lg">
                        Loading...
                    </p>
                ) : gallery.length === 0 ? (
                    <p className="text-center text-lg">
                        No gallery found
                    </p>
                ) : (
                    <div className="max-w-7xl mx-auto space-y-16">
                        {gallery.map((item) => (
                            <div key={item._id}>

                                {/* Gallery Title */}
                                <h3 className="text-3xl font-bold mb-6 text-gray-800 border-l-4 border-blue-600 pl-4">
                                    {item.title}
                                </h3>

                                {/* Images */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                    {item.images?.map((image, index) => (
                                        <div
                                            key={index}
                                            className="overflow-hidden rounded-2xl shadow-lg bg-white"
                                        >
                                            <img
                                                src={`${BASE_URL}/${image}`}
                                                alt={`${item.title}-${index}`}
                                                onClick={() =>
                                                    setSelectedImage(
                                                        `${BASE_URL}/${image}`
                                                    )
                                                }
                                                className="w-full h-64 object-cover cursor-pointer hover:scale-110 transition duration-500"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>

            {/* Image Modal */}
            {selectedImage && (
                <div
                    className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
                    onClick={() => setSelectedImage(null)}
                >
                    <button
                        onClick={() => setSelectedImage(null)}
                        className="absolute top-5 right-5 text-white text-5xl font-light hover:text-red-400"
                    >
                        ×
                    </button>

                    <img
                        src={selectedImage}
                        alt="Gallery Preview"
                        onClick={(e) => e.stopPropagation()}
                        className="max-w-full max-h-[90vh] rounded-2xl shadow-2xl"
                    />
                </div>
            )}
        </>
    );
}

export default Gallery;
