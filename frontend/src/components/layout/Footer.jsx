import {
    Link,
} from "react-router-dom";

import {
    useSelector,
} from "react-redux";

function Footer() {
    // GET SETTINGS FROM REDUX
    const { settings } =
        useSelector(
            (state) =>
                state.settings
        );
    return (

        <footer className="bg-gray-900 text-white pt-20 pb-10">

            <div className="max-w-7xl mx-auto px-6 lg:px-12">

                {/* TOP FOOTER */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">

                    {/* QUICK LINKS */}
                    <div>

                        <h3 className="text-xl font-semibold mb-6">
                            Quick Links
                        </h3>

                        <div className="space-y-4 text-gray-400">

                            <Link
                                to="/"
                                className="block hover:text-white transition"
                            >
                                Home
                            </Link>

                            <Link
                                to="/about"
                                className="block hover:text-white transition"
                            >
                                About Us
                            </Link>

                            <Link
                                to="/teachers"
                                className="block hover:text-white transition"
                            >
                                Teachers
                            </Link>

                            <Link
                                to="/gallery"
                                className="block hover:text-white transition"
                            >
                                Gallery
                            </Link>

                            <Link
                                to="/contact"
                                className="block hover:text-white transition"
                            >
                                Contact
                            </Link>

                        </div>

                    </div>

                    {/* CONTACT */}
                    <div>

                        <h3 className="text-xl font-semibold mb-6">
                            Contact Us
                        </h3>

                        <div className="space-y-4 text-gray-400 leading-7">

                            <p>
                                {settings?.address}
                            </p>

                            <p>
                                {settings?.email}
                            </p>

                            <p>
                                {settings?.phone}
                            </p>

                            <p>
                                {settings?.alternatePhone}
                            </p>

                        </div>

                    </div>

                    {/* SOCIAL LINKS */}
                    <div>

                        <h3 className="text-xl font-semibold mb-6">
                            Social Links
                        </h3>

                        <div className="space-y-4 text-gray-400">

                            {settings?.socialLinks?.facebook && (
                                <a
                                    href={settings.socialLinks.facebook}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="block hover:text-white transition"
                                >
                                    Facebook
                                </a>
                            )}

                            {settings?.socialLinks?.instagram && (
                                <a
                                    href={settings.socialLinks.instagram}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="block hover:text-white transition"
                                >
                                    Instagram
                                </a>
                            )}

                            {settings?.socialLinks?.youtube && (
                                <a
                                    href={settings.socialLinks.youtube}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="block hover:text-white transition"
                                >
                                    YouTube
                                </a>
                            )}

                            {settings?.socialLinks?.linkedin && (
                                <a
                                    href={settings.socialLinks.linkedin}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="block hover:text-white transition"
                                >
                                    LinkedIn
                                </a>
                            )}

                        </div>

                    </div>

                    {/* facebook page */}
                    <div className="col-span-1 lg:col-span-2">

                        <h3 className="text-xl font-semibold mb-6">
                            Facebook Page
                        </h3>

                        {settings?.socialLinks?.facebookPageUrl ? (

                            <div className="overflow-hidden rounded-2xl border border-gray-700 shadow-xl bg-white">

                                <iframe
                                    title="Facebook Page"
                                    src={`https://www.facebook.com/plugins/page.php?href=${encodeURIComponent(
                                        settings.socialLinks.facebookPageUrl
                                    )}&tabs=timeline&width=500&height=320&adapt_container_width=true&hide_cover=false&show_facepile=true`}
                                    width="100%"
                                    height="350"
                                    style={{
                                        border: "none",
                                        overflow: "hidden",
                                    }}
                                    scrolling="no"
                                    frameBorder="0"
                                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                                    className="w-full"
                                />

                            </div>

                        ) : (

                            <p className="text-gray-500">
                                Facebook page not available
                            </p>

                        )}

                    </div>

                </div>

                {/* GOOGLE MAP */}
                <div className="mt-16">

                    <h3 className="text-2xl font-semibold text-center mb-6">
                        Find Us On Map
                    </h3>

                    <div className="overflow-hidden rounded-3xl shadow-2xl border border-gray-800">

                        {settings?.googleMapLink ? (

                            <iframe
                                src={settings.googleMapLink}
                                width="100%"
                                height="400"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="School Location"
                                className="w-full"
                            />

                        ) : (

                            <div className="h-[400px] flex items-center justify-center text-gray-500">
                                Google Map not available
                            </div>

                        )}

                    </div>

                </div>

                {/* COPYRIGHT */}
                <div className="border-t border-gray-800 mt-16 pt-8 text-center text-gray-500">

                    <p>
                        © {new Date().getFullYear()} {settings?.schoolName}.
                        All Rights Reserved.
                    </p>

                    <p className="mt-2">
                        {settings?.footerText}
                    </p>

                </div>

            </div>

        </footer>
    );
}

export default Footer;