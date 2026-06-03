import {
    useEffect,
    useState,
} from "react";
import API, { BASE_URL } from "../../services/api";
import Layout from "../../components/layout/Layout";
import { Link } from "react-router-dom";


function Galleries() {

    const [galleries,
        setGalleries] =
        useState([]);

    const [loading,
        setLoading] =
        useState(true);


    // FETCH GALLERIES
    useEffect(() => {

        const fetchGallery =
            async () => {

                try {

                    const { data } =
                        await API.get(
                            "/gallery"
                        );

                    setGalleries(
                        data.galleries
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

        fetchGallery();

    }, []);


    return (

        <Layout>

            {/* HERO */}
            <section className="relative bg-blue-700 text-white py-18  overflow-hidden">

                <div className="absolute inset-0 bg-black/30"></div>

                <div className="max-w-7xl mx-auto px-6 text-center">

                    <h1 className="text-5xl lg:text-7xl text-white font-bold mb-6">
                        School Gallery
                    </h1>

                    <p className="text-xl text-white/80 max-w-3xl mx-auto">
                        Explore beautiful memories,
                        events, and moments captured
                        in our school life.
                    </p>

                </div>

            </section>


            {/* GALLERY GRID */}
            <section className="py-24 bg-gray-100">

                <div className="max-w-7xl mx-auto px-6">

                    {loading ? (

                        <p className="text-center">
                            Loading...
                        </p>

                    ) : galleries.length === 0 ? (

                        <p className="text-center">
                            No gallery found
                        </p>

                    ) : (

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                            {galleries.map(
                                (item) => (

                                    <Link
                                        key={item._id}
                                        to={`/gallery/${item._id}`}
                                        className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all"
                                    >

                                        {/* FIRST IMAGE */}
                                        {item.images?.[0] && (
                                            <img
                                                src={`${BASE_URL}/${item.images[0]}`}
                                                alt={item.title}
                                                className="w-full h-60 object-cover hover:scale-110 transition-transform duration-500"
                                            />

                                        )}


                                        <div className="p-6">
                                            <h2 className="text-2xl font-bold text-gray-800 mb-2">
                                                {item.title}
                                            </h2>

                                            <p className="text-gray-500">
                                                {item.images?.length} Photos
                                            </p>

                                        </div>

                                    </Link>

                                )
                            )}

                        </div>

                    )}

                </div>

            </section>

        </Layout>
    );
}

export default Galleries;