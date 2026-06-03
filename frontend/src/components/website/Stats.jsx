import { useEffect, useState } from "react";
import API from "../../services/api";
import {
    Users,
    GraduationCap,
    UserCheck,
} from "lucide-react";

export default function Stats() {
    const [teachers, setTeachers] = useState([]);
    const [students, setStudents] = useState([]);
    const [staffs, setStaffs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [teacherRes, studentRes, staffRes] = await Promise.all([
                    API.get("/teachers"),
                    API.get("/students"),
                    API.get("/staff"),
                ]);

                setTeachers(teacherRes.data.teachers ?? teacherRes.data ?? []);
                setStudents(studentRes.data.students ?? studentRes.data ?? []);
                setStaffs(staffRes.data.staff || []);
            } catch (error) {
                console.log("API Error:", error.response?.data || error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center text-2xl font-semibold">
                Loading Dashboard...
            </div>
        );
    }

    return (
        <section className="relative overflow-hidden py-24 px-6 bg-gradient-to-br from-blue-50 via-white to-indigo-50">

            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl"></div>

            <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl"></div>

            <div className="relative max-w-7xl mx-auto">

                {/* Heading */}
                <div className="text-center mb-16">

                    <span className="inline-block px-5 py-2 rounded-full bg-blue-100 text-blue-700 font-semibold mb-4">
                        School Overview
                    </span>

                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                        Growing Together With Excellence
                    </h2>

                    <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
                        Our dedicated educators, talented students, and supportive
                        staff create an inspiring learning environment.
                    </p>

                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    {/* Teachers */}
                    <div className="group relative overflow-hidden rounded-3xl bg-white/80 backdrop-blur-lg p-8 shadow-xl hover:shadow-blue-200/70 hover:shadow-2xl transition-all duration-500 hover:-translate-y-4">

                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-blue-600/10 opacity-0 group-hover:opacity-100 transition duration-500"></div>

                        <div className="relative">

                            <div className="w-20 h-20 rounded-2xl bg-gradient-to-r from-blue-500 to-blue-700 text-white flex items-center justify-center shadow-lg group-hover:rotate-6 group-hover:scale-110 transition-all duration-500">

                                <Users size={38} />

                            </div>

                            <h3 className="mt-8 text-5xl font-extrabold text-gray-900">
                                {teachers?.length}+
                            </h3>

                            <h4 className="text-xl font-bold mt-2 text-gray-800">
                                Teachers
                            </h4>

                            <p className="text-gray-500 mt-3">
                                Highly qualified educators committed to academic excellence.
                            </p>

                        </div>

                    </div>

                    {/* Students */}
                    <div className="group relative overflow-hidden rounded-3xl bg-white/80 backdrop-blur-lg p-8 shadow-xl hover:shadow-green-200/70 hover:shadow-2xl transition-all duration-500 hover:-translate-y-4">

                        <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-green-600/10 opacity-0 group-hover:opacity-100 transition duration-500"></div>

                        <div className="relative">

                            <div className="w-20 h-20 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 text-white flex items-center justify-center shadow-lg group-hover:rotate-6 group-hover:scale-110 transition-all duration-500">

                                <GraduationCap size={38} />

                            </div>

                            <h3 className="mt-8 text-5xl font-extrabold text-gray-900">
                                {students?.length}+
                            </h3>

                            <h4 className="text-xl font-bold mt-2 text-gray-800">
                                Students
                            </h4>

                            <p className="text-gray-500 mt-3">
                                Bright minds learning, growing, and succeeding every day.
                            </p>

                        </div>

                    </div>

                    {/* Staff */}
                    <div className="group relative overflow-hidden rounded-3xl bg-white/80 backdrop-blur-lg p-8 shadow-xl hover:shadow-purple-200/70 hover:shadow-2xl transition-all duration-500 hover:-translate-y-4">

                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-purple-600/10 opacity-0 group-hover:opacity-100 transition duration-500"></div>

                        <div className="relative">

                            <div className="w-20 h-20 rounded-2xl bg-gradient-to-r from-purple-500 to-indigo-600 text-white flex items-center justify-center shadow-lg group-hover:rotate-6 group-hover:scale-110 transition-all duration-500">

                                <UserCheck size={38} />

                            </div>

                            <h3 className="mt-8 text-5xl font-extrabold text-gray-900">
                                {staffs?.length}+
                            </h3>

                            <h4 className="text-xl font-bold mt-2 text-gray-800">
                                Staff Members
                            </h4>

                            <p className="text-gray-500 mt-3">
                                Supporting students and teachers with dedication and care.
                            </p>

                        </div>

                    </div>

                </div>

            </div>

        </section>
    );
}