import {
    useEffect,
    useState,
} from "react";
import API, { BASE_URL } from "../../services/api";
import Layout from "../../components/layout/Layout";



function StaffPublic() {

    const [staffs,
        setStaffs] =
        useState([]);

    const [loading,
        setLoading] =
        useState(true);


    // FETCH Staffs
    useEffect(() => {

        const fetchStaffs =
            async () => {
                try {
                    const { data } =
                        await API.get("/staff");

                    setStaffs(data.staff);
                } catch (error) {
                    console.log(error)
                } finally {
                    setLoading(false)
                }
            };

        fetchStaffs();

    }, []);


    return (

        <Layout>

            {/* HERO SECTION */}
            <section className="relative bg-blue-700 text-white py-18  overflow-hidden">

                <div className="absolute inset-0 bg-black/30"></div>

                <div className="max-w-7xl mx-auto px-6 text-center">

                    <h1 className="text-5xl lg:text-7xl font-bold mb-6">
                        Our Staffs
                    </h1>

                    <p className="text-xl text-white/80 max-w-3xl mx-auto">
                        Meet our experienced and dedicated Staff Member
                    </p>
                </div>
            </section>


            {/* TEACHERS GRID */}
            <section className="py-24 bg-gray-100">
                <div className="max-w-7xl mx-auto px-6">
                    {loading ? (
                        <p className="text-center text-gray-600">
                            Loading...
                        </p>

                    ) : staffs.length === 0 ? (

                        <p className="text-center text-gray-600">
                            No teachers found
                        </p>

                    ) : (

                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">


                            {staffs.map(
                                (staff) => (

                                    <div
                                        key={staff._id}
                                        className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all overflow-hidden group border border-gray-100"
                                    >

                                        {/* IMAGE */}
                                        <div className="relative overflow-hidden">

                                            <img
                                                src={`${BASE_URL}/${staff.image}`}
                                                alt={staff.name}
                                                className="w-full h-52 object-cover group-hover:scale-110 transition-transform duration-500"
                                            />
                                            <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent"></div>
                                        </div>

                                        {/* CONTENT */}
                                        <div className="p-4 text-center">
                                            {/* NAME */}
                                            <h2 className="text-lg font-bold text-gray-800">
                                                {staff.name}
                                            </h2>


                                            {/* SUBJECT */}
                                            <span className="inline-block mt-2 px-3 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded-full">
                                                {staff.position}
                                            </span>


                                            {/* EDUCATION */}
                                            <p className="text-gray-500 text-sm mt-3 line-clamp-2">
                                                {staff.education}
                                            </p>


                                            {/* EXPERIENCE */}
                                            <p className="text-gray-400 text-xs mt-1">
                                                {staff.experience} Experience
                                            </p>
                                        </div>
                                    </div>
                                )
                            )}
                        </div>
                    )}

                </div>

            </section>

        </Layout>
    );
}

export default StaffPublic;