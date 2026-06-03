import { useEffect, useState } from "react";

import {
    FaUserGraduate,
    FaChalkboardTeacher,
    FaUsers,
    FaNewspaper,
    FaImages,
    FaEnvelope,
} from "react-icons/fa";

import DashboardCard from "../../components/admin/DashboardCard";
import AdminLayout from "../../components/admin/AdminLayout";
import API from "../../services/api";



function AdminDashboard() {

    const [stats, setStats] = useState({
        admissions: 0,
        students: 0,
        teachers: 0,
        staff: 0,
        news: 0,
        gallery: 0,
        messages: 0,
    });

    const [loading, setLoading] =
        useState(true);

    // LOAD DATA
    useEffect(() => {
        const fetchStats = async () => {
            try {
                const { data } = await API.get(
                    "/dashboard/stats"
                );
                setStats(data.stats);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        fetchStats()
    }, []);

    return (
        <AdminLayout>
            {/* TITLE */}
            <h1 className="text-3xl font-bold mb-8">
                Dashboard Overview
            </h1>

            {/* LOADING */}
            {
                loading ? (
                    <h1 className="text-xl">
                        Loading Dashboard...
                    </h1>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                        {/* ADMISSIONS */}
                        <DashboardCard
                            title="Admissions"
                            value={stats.admissions}
                            icon={<FaUserGraduate />}
                        />

                        {/* TEACHERS */}
                        <DashboardCard
                            title="Teachers"
                            value={stats.teachers}
                            icon={<FaChalkboardTeacher />}
                        />

                        {/* Students */}
                        <DashboardCard
                            title="Students"
                            value={stats.students}
                            icon={<FaChalkboardTeacher />}
                        />

                        {/* STAFF */}
                        <DashboardCard
                            title="Staff"
                            value={stats.staff}
                            icon={<FaUsers />}
                        />

                        {/* NEWS */}
                        <DashboardCard
                            title="News"
                            value={stats.news}
                            icon={<FaNewspaper />}
                        />

                        {/* GALLERY */}
                        <DashboardCard
                            title="Gallery"
                            value={stats.gallery}
                            icon={<FaImages />}
                        />

                        {/* MESSAGES */}
                        <DashboardCard
                            title="Messages"
                            value={stats.messages}
                            icon={<FaEnvelope />}
                        />
                    </div>
                )
            }

        </AdminLayout>
    );
}

export default AdminDashboard;