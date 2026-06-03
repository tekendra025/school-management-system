import {
    FaUserGraduate,
    FaChalkboardTeacher,
    FaUsers,
    FaNewspaper,
    FaImages,
    FaEnvelope,
    FaInfoCircle,
    FaCog,
    FaSignOutAlt,
    FaTachometerAlt,
} from "react-icons/fa";

import { Link, useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";

import { logout } from "../../redux/features/authSlice";



function Sidebar() {

    const dispatch = useDispatch();

    const navigate = useNavigate();


    // LOGOUT
    const handleLogout = () => {

        dispatch(logout());

        navigate("/admin/login");
    };


    return (

        <div className="w-[280px] min-h-screen bg-[#111827] text-white p-5">

            {/* LOGO */}

            <div className="mb-10">

                <h1 className="text-3xl font-bold">

                    School Admin

                </h1>

            </div>



            {/* MENU */}

            <div className="space-y-2">

                <Link
                    to="/admin/dashboard"
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#1F2937]"
                >
                    <FaTachometerAlt />

                    Dashboard
                </Link>


                <Link
                    to="/admin/admissions"
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#1F2937]"
                >
                    <FaUserGraduate />

                    Admissions
                </Link>


                <Link
                    to="/admin/teachers"
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#1F2937]"
                >
                    <FaChalkboardTeacher />

                    Teachers
                </Link>

                <Link
                    to="/admin/students"
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#1F2937]"
                >
                    <FaChalkboardTeacher />
                    Students
                </Link>

                <Link
                    to="/admin/results"
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#1F2937]"
                >
                    <FaChalkboardTeacher />
                    Result
                </Link>


                <Link
                    to="/admin/staff"
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#1F2937]"
                >
                    <FaUsers />

                    Staff
                </Link>


                <Link
                    to="/admin/news"
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#1F2937]"
                >
                    <FaNewspaper />

                    News & Notice
                </Link>


                <Link
                    to="/admin/gallery"
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#1F2937]"
                >
                    <FaImages />

                    Gallery
                </Link>


                <Link
                    to="/admin/messages"
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#1F2937]"
                >
                    <FaEnvelope />

                    Contact Messages
                </Link>


                <Link
                    to="/admin/about"
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#1F2937]"
                >
                    <FaInfoCircle />

                    About Us
                </Link>


                <Link
                    to="/admin/settings"
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#1F2937]"
                >
                    <FaCog />

                    Settings
                </Link>



                {/* LOGOUT */}

                <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 p-3 rounded-lg bg-red-500 hover:bg-red-600 mt-5"
                >
                    <FaSignOutAlt />

                    Logout
                </button>

            </div>

        </div>
    );
}

export default Sidebar;