import {
    useEffect,
    useState,
} from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import API, { BASE_URL } from "../../services/api";



function SettingsManagement() {

    // STATES
    const [formData, setFormData] =
        useState({
            schoolName: "",
            email: "",
            phone: "",
            alternatePhone: "",
            address: "",
            websiteDescription: "",
            footerText: "",
            openingHours: "",
            facebook: "",
            instagram: "",
            youtube: "",
            linkedin: "",
            twitter: "",
            whatsapp: "",
            facebookPageUrl: "",
            googleMapLink: "",
            seoKeywords: "",
            seoDescription: "",
        });


    const [logo, setLogo] =
        useState(null);

    const [previewLogo, setPreviewLogo] =
        useState("");

    const [loading, setLoading] =
        useState(true);

    const [updateLoading, setUpdateLoading] =
        useState(false);


    // FETCH SETTINGS
    useEffect(() => {

        const fetchSettings = async () => {

            try {
                const { data } = await API.get(
                    "/settings"
                );

                console.log(data);

                const settings =
                    data.settings;

                if (settings) {

                    setFormData({
                        schoolName:
                            settings.schoolName || "",

                        email:
                            settings.email || "",

                        phone:
                            settings.phone || "",

                        alternatePhone:
                            settings.alternatePhone || "",

                        address:
                            settings.address || "",

                        websiteDescription:
                            settings.websiteDescription || "",

                        footerText:
                            settings.footerText || "",

                        openingHours:
                            settings.openingHours || "",

                        googleMapLink:
                            settings.googleMapLink || "",

                        facebookPageUrl:
                            settings.socialLinks?.facebookPageUrl || "",

                        seoKeywords:
                            settings.seoKeywords || "",

                        seoDescription:
                            settings.seoDescription || "",

                        facebook:
                            settings.socialLinks
                                ?.facebook || "",

                        instagram:
                            settings.socialLinks
                                ?.instagram || "",

                        youtube:
                            settings.socialLinks
                                ?.youtube || "",

                        linkedin:
                            settings.socialLinks
                                ?.linkedin || "",

                        twitter:
                            settings.socialLinks
                                ?.twitter || "",

                        whatsapp:
                            settings.socialLinks
                                ?.whatsapp || "",
                    });


                    // LOGO
                    if (settings.logo) {
                        setPreviewLogo(
                            `${BASE_URL}/${settings.logo}`
                        );
                    }
                }

            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        fetchSettings();
    }, []);


    // HANDLE CHANGE
    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]:
                e.target.value,
        });
    };

    // HANDLE LOGO
    const handleLogo = (e) => {
        const file = e.target.files[0];
        setLogo(file);

        if (file) {
            setPreviewLogo(
                URL.createObjectURL(file)
            );
        }
    };

    // SUBMIT
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setUpdateLoading(true);

            const settingsData =
                new FormData();

            // APPEND ALL FIELDS
            Object.keys(formData).forEach((key) => {
                settingsData.append(
                    key,
                    formData[key]
                );
            });

            // LOGO
            if (logo) {
                settingsData.append(
                    "logo",
                    logo
                );
            }

            // API CALL
            await API.post(
                "/settings",
                settingsData,
                {
                    headers: {

                        "Content-Type":
                            "multipart/form-data",
                    },
                }
            );
            alert("Settings Updated Successfully");

        } catch (error) {
            console.log(error);
            alert("Update Failed");
        } finally {

            setUpdateLoading(false);
        }
    };




    return (

        <AdminLayout>

            {/* TITLE */}
            <h1 className="text-3xl font-bold mb-8">
                School Settings
            </h1>

            {
                loading ? (
                    <h1 className="text-xl">
                        Loading...
                    </h1>

                ) : (

                    <form
                        onSubmit={handleSubmit}
                        className="bg-white p-8 rounded-2xl shadow-md"
                    >

                        {/* BASIC INFO */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block font-medium mb-2">
                                    School Name
                                </label>

                                <input
                                    type="text"
                                    name="schoolName"
                                    value={formData.schoolName}
                                    onChange={handleChange}
                                    required
                                    className="w-full border border-gray-300 p-3 rounded-lg"
                                />
                            </div>

                            <div>
                                <label className="block font-medium mb-2">
                                    Email
                                </label>

                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full border border-gray-300 p-3 rounded-lg"
                                />
                            </div>

                            <div>
                                <label className="block font-medium mb-2">
                                    Phone
                                </label>

                                <input
                                    type="text"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                    className="w-full border border-gray-300 p-3 rounded-lg"
                                />
                            </div>

                            <div>
                                <label className="block font-medium mb-2">
                                    Alternate Phone
                                </label>

                                <input
                                    type="text"
                                    name="alternatePhone"
                                    value={formData.alternatePhone}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 p-3 rounded-lg"
                                />
                            </div>
                        </div>

                        {/* ADDRESS */}
                        <div className="mt-6">
                            <label className="block font-medium mb-2">
                                Address
                            </label>

                            <textarea
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                rows="3"
                                required
                                className="w-full border border-gray-300 p-3 rounded-lg"
                            />
                        </div>

                        {/* WEBSITE DESCRIPTION */}
                        <div className="mt-6">
                            <label className="block font-medium mb-2">
                                Website Description
                            </label>

                            <textarea
                                name="websiteDescription"
                                value={formData.websiteDescription}
                                onChange={handleChange}
                                rows="4"
                                className="w-full border border-gray-300 p-3 rounded-lg"
                            />

                        </div>

                        {/* FOOTER */}
                        <div className="mt-6">
                            <label className="block font-medium mb-2">
                                Footer Text
                            </label>

                            <input
                                type="text"
                                name="footerText"
                                value={formData.footerText}
                                onChange={handleChange}
                                className="w-full border border-gray-300 p-3 rounded-lg"
                            />
                        </div>

                        {/* OPENING HOURS */}
                        <div className="mt-6">
                            <label className="block font-medium mb-2">
                                Opening Hours
                            </label>

                            <input
                                type="text"
                                name="openingHours"
                                value={formData.openingHours}
                                onChange={handleChange}
                                className="w-full border border-gray-300 p-3 rounded-lg"
                            />
                        </div>

                        {/* SOCIAL LINKS */}
                        <h2 className="text-2xl font-bold mt-10 mb-6">
                            Social Links
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                            <input
                                type="text"
                                name="facebook"
                                placeholder="Facebook Link"
                                value={formData.facebook}
                                onChange={handleChange}
                                className="border border-gray-300 p-3 rounded-lg"
                            />

                            <input
                                type="text"
                                name="facebookPageUrl"
                                placeholder="Facebook Page Url"
                                value={formData.facebookPageUrl}
                                onChange={handleChange}
                                className="border border-gray-300 p-3 rounded-lg"
                            />

                            <input
                                type="text"
                                name="instagram"
                                placeholder="Instagram Link"
                                value={formData.instagram}
                                onChange={handleChange}
                                className="border border-gray-300 p-3 rounded-lg"
                            />

                            <input
                                type="text"
                                name="youtube"
                                placeholder="YouTube Link"
                                value={formData.youtube}
                                onChange={handleChange}
                                className="border border-gray-300 p-3 rounded-lg"
                            />

                            <input
                                type="text"
                                name="linkedin"
                                placeholder="LinkedIn Link"
                                value={formData.linkedin}
                                onChange={handleChange}
                                className="border border-gray-300 p-3 rounded-lg"
                            />

                            <input
                                type="text"
                                name="twitter"
                                placeholder="Twitter Link"
                                value={formData.twitter}
                                onChange={handleChange}
                                className="border border-gray-300 p-3 rounded-lg"
                            />

                            <input
                                type="text"
                                name="whatsapp"
                                placeholder="WhatsApp Link"
                                value={formData.whatsapp}
                                onChange={handleChange}
                                className="border border-gray-300 p-3 rounded-lg"
                            />

                        </div>

                        {/* MAP */}
                        <div className="mt-6">
                            <label className="block font-medium mb-2">
                                Google Map Link
                            </label>

                            <input
                                type="text"
                                name="googleMapLink"
                                value={formData.googleMapLink}
                                onChange={handleChange}
                                className="w-full border border-gray-300 p-3 rounded-lg"
                            />
                        </div>

                        {/* SEO */}
                        <h2 className="text-2xl font-bold mt-10 mb-6">
                            SEO Settings
                        </h2>

                        <div className="mt-6">
                            <label className="block font-medium mb-2">
                                SEO Keywords
                            </label>

                            <textarea
                                name="seoKeywords"
                                value={formData.seoKeywords}
                                onChange={handleChange}
                                rows="3"
                                className="w-full border border-gray-300 p-3 rounded-lg"
                            />

                        </div>

                        <div className="mt-6">
                            <label className="block font-medium mb-2">
                                SEO Description
                            </label>

                            <textarea
                                name="seoDescription"
                                value={formData.seoDescription}
                                onChange={handleChange}
                                rows="4"
                                className="w-full border border-gray-300 p-3 rounded-lg"
                            />

                        </div>

                        {/* LOGO */}
                        <div className="mt-6">
                            <label className="block font-medium mb-2">
                                School Logo
                            </label>

                            <input
                                type="file"
                                onChange={handleLogo}
                                className="w-full border border-gray-300 p-3 rounded-lg"
                            />
                        </div>

                        {/* PREVIEW */}
                        {
                            previewLogo && (
                                <div className="mt-6">

                                    <img
                                        src={previewLogo}
                                        alt="Logo"
                                        className="w-40 h-40 object-cover rounded-xl border"
                                    />

                                </div>
                            )
                        }

                        {/* BUTTON */}
                        <button
                            type="submit"
                            disabled={updateLoading}
                            className="bg-black hover:bg-gray-800 text-white px-8 py-3 rounded-lg mt-8"
                        >

                            {
                                updateLoading
                                    ? "Updating..."
                                    : "Update Settings"
                            }

                        </button>

                    </form>
                )
            }

        </AdminLayout>
    );
}

export default SettingsManagement;
