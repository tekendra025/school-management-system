import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
    FaTrash,
    FaPlus,
    FaEdit,
} from "react-icons/fa";
import AdminLayout from "../../components/admin/AdminLayout";
import API, { BASE_URL } from "../../services/api";


function Gallery() {
    // STATE
    const [gallery, setGallery] =
        useState([]);

    const [loading, setLoading] =
        useState(true);


    // FETCH GALLERY
    useEffect(() => {
        const fetchGallery = async () => {
            try {
                const { data } = await API.get(
                    "/gallery"
                );

                // IMPORTANT
                setGallery(data.galleries);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        fetchGallery();
    }, []);

    // DELETE GALLERY
    const deleteGallery = async (id) => {
        const confirmDelete = window.confirm(
            "Delete this gallery?"
        );

        if (!confirmDelete) return;
        try {
            await API.delete(
                `/gallery/${id}`
            );

            // REMOVE FROM UI
            setGallery(
                gallery.filter(
                    (item) => item._id !== id
                )
            );

            alert("Gallery Deleted");
        } catch (error) {
            console.log(error);
            alert("Delete Failed");
        }
    };

    return (
        <AdminLayout>
            {/* TOP SECTION */}
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold">
                    Gallery Management
                </h1>

                <Link
                    to="/admin/gallery/add"
                    className="bg-black text-white px-5 py-3 rounded-lg flex items-center gap-2"
                >
                    <FaPlus />
                    Add Gallery
                </Link>
            </div>

            {/* LOADING */}
            {
                loading ? (
                    <h1 className="text-xl">
                        Loading Gallery...
                    </h1>

                ) : (
                    <>
                        {
                            gallery?.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {
                                        gallery.map((item) => (

                                            <div
                                                key={item._id}
                                                className="bg-white rounded-2xl shadow-md overflow-hidden p-4"
                                            >

                                                {/* TITLE */}
                                                <div className="flex items-center justify-between mb-4">
                                                    <h2 className="text-xl font-bold">
                                                        {item.title}
                                                    </h2>
                                                </div>

                                                {/* IMAGES GRID */}
                                                <div className="grid grid-cols-2 gap-3">
                                                    {
                                                        item.images?.map(
                                                            (
                                                                image,
                                                                index
                                                            ) => (

                                                                <img
                                                                    key={index}
                                                                    src={`${BASE_URL}/${image}`}
                                                                    alt="Gallery"
                                                                    className="w-full h-40 object-cover rounded-xl border"
                                                                />
                                                            )
                                                        )
                                                    }

                                                </div>

                                                {/* TOTAL IMAGES */}
                                                <p className="text-gray-500 mt-4">
                                                    Total Images:
                                                    {" "}
                                                    {
                                                        item.images?.length
                                                    }
                                                </p>

                                                {/* DELETE BUTTON */}
                                                <Link
                                                    to={`/admin/gallery/edit/${item._id}`}
                                                    className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-lg mt-4 w-full flex items-center justify-center gap-2"
                                                >
                                                    <FaEdit />
                                                </Link>

                                                <button
                                                    onClick={() =>
                                                        deleteGallery(
                                                            item._id
                                                        )
                                                    }
                                                    className="bg-red-500 hover:bg-red-600 text-white p-3 rounded-lg mt-4 w-full flex items-center justify-center gap-2"
                                                >
                                                    <FaTrash />
                                                    Delete Gallery
                                                </button>

                                            </div>
                                        ))
                                    }

                                </div>

                            ) : (

                                <div className="bg-white p-10 rounded-2xl text-center shadow-md">
                                    <h1 className="text-2xl font-bold">
                                        No Gallery Found
                                    </h1>

                                </div>
                            )
                        }

                    </>
                )
            }

        </AdminLayout>
    );
}

export default Gallery;