import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { X } from "lucide-react";

function AdmissionPopup() {
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        const today = new Date().toDateString();
        const lastShown = localStorage.getItem("popupDate");
        if (lastShown !== today) {
            setTimeout(() => {
                setShowPopup(true);
                localStorage.setItem("popupDate", today);
            }, 1000);
        }
    }, []);

    if (!showPopup) return null;
    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-9999 flex items-center justify-center p-4">
            <div className="relative bg-white rounded-4xl overflow-hidden shadow-2xl max-w-lg w-full animate-[bounceIn_.5s_ease]">

                {/* Close Button */}
                <button
                    onClick={() => setShowPopup(false)}
                    className="absolute top-4 right-4 z-20 bg-white rounded-full p-2 shadow-lg hover:scale-110 transition"
                >
                    <X size={20} />
                </button>

                {/* Banner */}
                <div className="bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600 text-white p-10 text-center">

                    <span className="inline-block px-4 py-2 bg-white/20 rounded-full text-sm font-semibold mb-4">
                        🎓 Admissions Open
                    </span>

                    <h2 className="text-4xl font-black">
                        Admission 2026
                    </h2>

                    <p className="mt-3 text-white/90">
                        Applications are now open for new students.
                    </p>

                </div>

                {/* Content */}
                <div className="p-8 text-center">

                    <h3 className="text-2xl font-bold text-gray-900">
                        Join Our School Family
                    </h3>

                    <p className="text-gray-600 mt-4 leading-7">
                        Experience quality education, expert teachers,
                        modern facilities, and a bright future.
                    </p>

                    <div className="flex justify-center gap-4 mt-8">

                        <Link
                            to="/admission"
                            className="px-8 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition"
                        >
                            Apply Now
                        </Link>

                        <button
                            onClick={() => setShowPopup(false)}
                            className="px-8 py-3 border rounded-xl font-semibold hover:bg-gray-100 transition"
                        >
                            Later
                        </button>

                    </div>

                </div>

            </div>
        </div>
    );
}

export default AdmissionPopup;