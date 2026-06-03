import { useState } from "react";

import {
    Link,
    NavLink,
} from "react-router-dom";

import {
    useSelector,
} from "react-redux";
import { FaClock, FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter, FaWhatsapp, FaYoutube } from "react-icons/fa";
import { BASE_URL } from "../../services/api";


function Navbar() {

    // MOBILE MENU
    const [mobileMenu, setMobileMenu] =
        useState(false);

    // GET SETTINGS FROM REDUX
    const { settings } =
        useSelector(
            (state) =>
                state.settings
        );


    return (
        <>
            {/* TOP BAR */}
            <div className="hidden md:block bg-linear-to-r from-blue-700 to-indigo-700 text-white">

                <div className="max-w-7xl mx-auto px-6 lg:px-12 py-2 flex items-center justify-between">

                    {/* OPENING TIME - LEFT */}
                    <div className="flex items-center gap-2 text-sm font-medium">

                        <FaClock className="text-yellow-300" />

                        <span>
                            {settings?.openingHours ||
                                "Sun - Fri : 10:00 AM - 4:00 PM"}
                        </span>

                    </div>

                    {/* SOCIAL ICONS - RIGHT */}
                    <div className="flex items-center gap-3">

                        {settings?.socialLinks?.facebook && (
                            <a
                                href={settings.socialLinks.facebook}
                                target="_blank"
                                rel="noreferrer"
                                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white hover:text-blue-700 flex items-center justify-center transition-all duration-300 hover:scale-110"
                            >
                                <FaFacebookF size={14} />
                            </a>
                        )}

                        {settings?.socialLinks?.twitter && (
                            <a
                                href={settings.socialLinks.twitter}
                                target="_blank"
                                rel="noreferrer"
                                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white hover:text-blue-700 flex items-center justify-center transition-all duration-300 hover:scale-110"
                            >
                                <FaTwitter size={14} />
                            </a>
                        )}
                        {settings?.socialLinks?.whatsapp && (
                            <a
                                href={settings.socialLinks.whatsapp}
                                target="_blank"
                                rel="noreferrer"
                                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white hover:text-blue-700 flex items-center justify-center transition-all duration-300 hover:scale-110"
                            >
                                <FaWhatsapp size={14} />
                            </a>
                        )}

                        {settings?.socialLinks?.instagram && (
                            <a
                                href={settings.socialLinks.instagram}
                                target="_blank"
                                rel="noreferrer"
                                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white hover:text-pink-600 flex items-center justify-center transition-all duration-300 hover:scale-110"
                            >
                                <FaInstagram size={14} />
                            </a>
                        )}

                        {settings?.socialLinks?.youtube && (
                            <a
                                href={settings.socialLinks.youtube}
                                target="_blank"
                                rel="noreferrer"
                                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white hover:text-red-600 flex items-center justify-center transition-all duration-300 hover:scale-110"
                            >
                                <FaYoutube size={14} />
                            </a>
                        )}

                        {settings?.socialLinks?.linkedin && (
                            <a
                                href={settings.socialLinks.linkedin}
                                target="_blank"
                                rel="noreferrer"
                                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white hover:text-blue-700 flex items-center justify-center transition-all duration-300 hover:scale-110"
                            >
                                <FaLinkedinIn size={14} />
                            </a>
                        )}

                    </div>

                </div>

            </div>


            <header className="bg-white shadow-md sticky top-0 z-50">

                <div className="max-w-7xl mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">


                    {/* LOGO */}

                    <Link
                        to="/"
                        className="flex items-center gap-4"
                    >

                        {
                            settings?.logo && (

                                <img
                                    src={`${BASE_URL}/${settings.logo}`}
                                    alt="Logo"
                                    className="w-14 h-14 rounded-full object-cover border"
                                />
                            )
                        }


                        <div>

                            <h1 className="text-2xl font-bold text-gray-800 leading-none">
                                {settings?.schoolName}
                            </h1>

                            <p className="text-sm text-gray-500 mt-1">
                                Excellence In Education
                            </p>

                        </div>

                    </Link>


                    {/* DESKTOP MENU */}

                    <nav className="hidden lg:flex items-center gap-8 font-medium text-gray-700">

                        <NavLink to="/">
                            Home
                        </NavLink>

                        <NavLink to="/about">
                            About
                        </NavLink>

                        <NavLink to="/teachers">
                            Teachers
                        </NavLink>

                        <NavLink to="/staffs">
                            Staffs
                        </NavLink>

                        <NavLink to="/gallery">
                            Gallery
                        </NavLink>

                        <NavLink to="/notice">
                            Notice
                        </NavLink>

                        <NavLink to="/contact">
                            Contact
                        </NavLink>

                        <NavLink to="/result-check">
                            Results
                        </NavLink>

                    </nav>


                    {/* RIGHT SIDE */}

                    <div className="hidden lg:flex items-center gap-4">

                        <Link
                            to="/admission"
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-all"
                        >
                            Apply Now
                        </Link>

                    </div>


                    {/* MOBILE BUTTON */}

                    <button
                        onClick={() =>
                            setMobileMenu(!mobileMenu)
                        }
                        className="lg:hidden text-3xl"
                    >
                        ☰
                    </button>

                </div>


                {/* MOBILE MENU */}

                {
                    mobileMenu && (

                        <div className="lg:hidden bg-white border-t px-6 py-6 space-y-5 font-medium">

                            <NavLink
                                to="/"
                                className="block"
                                onClick={() =>
                                    setMobileMenu(false)
                                }
                            >
                                Home
                            </NavLink>

                            <NavLink
                                to="/about"
                                className="block"
                                onClick={() =>
                                    setMobileMenu(false)
                                }
                            >
                                About
                            </NavLink>

                            <NavLink
                                to="/teachers"
                                className="block"
                                onClick={() =>
                                    setMobileMenu(false)
                                }
                            >
                                Teachers
                            </NavLink>

                            <NavLink
                                to="/staffs"
                                className="block"
                                onClick={() =>
                                    setMobileMenu(false)
                                }
                            >
                                Staffs
                            </NavLink>

                            <NavLink
                                to="/gallery"
                                className="block"
                                onClick={() =>
                                    setMobileMenu(false)
                                }
                            >
                                Gallery
                            </NavLink>

                            <NavLink
                                to="/news"
                                className="block"
                                onClick={() =>
                                    setMobileMenu(false)
                                }
                            >
                                News
                            </NavLink>

                            <NavLink
                                to="/contact"
                                className="block"
                                onClick={() =>
                                    setMobileMenu(false)
                                }
                            >
                                Contact
                            </NavLink>

                            <NavLink
                                to="/result-check"
                                className="block"
                                onClick={() =>
                                    setMobileMenu(false)
                                }
                            >
                                Results
                            </NavLink>


                            <Link
                                to="/admission"
                                onClick={() =>
                                    setMobileMenu(false)
                                }
                                className="block bg-blue-600 text-white text-center py-3 rounded-xl"
                            >
                                Apply For Admission
                            </Link>

                        </div>
                    )
                }

            </header>
        </>
    );
}

export default Navbar;
