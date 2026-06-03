import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

function AdmissionCTA() {
  return (
    <section className="relative overflow-hidden py-24 px-6">

      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700"></div>

      {/* Decorative Shapes */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>

      <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>

      {/* Content */}
      <div className="relative max-w-5xl mx-auto text-center text-white">

        <span className="inline-block px-5 py-2 bg-white/20 backdrop-blur-md rounded-full text-sm font-semibold mb-6">
          🎓 Admissions Open 2026
        </span>

        <h2 className="text-4xl md:text-6xl font-bold leading-tight">
          Shape Your Child's
          <span className="block text-yellow-300">
            Bright Future With Us
          </span>
        </h2>

        <p className="mt-6 text-lg md:text-xl text-white/90 max-w-2xl mx-auto leading-8">
          Join a learning environment that inspires excellence,
          creativity, leadership, and lifelong success.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-5">

          <Link
            to="/admission"
            className="
                            inline-flex
                            items-center
                            gap-3
                            px-8
                            py-4
                            bg-white
                            text-blue-700
                            rounded-full
                            font-bold
                            shadow-2xl
                            hover:scale-105
                            transition-all
                            duration-300
                        "
          >
            Apply Now
            <FaArrowRight />
          </Link>

          <Link
            to="/contact"
            className="
                            inline-flex
                            items-center
                            justify-center
                            px-8
                            py-4
                            border-2
                            border-white
                            rounded-full
                            font-semibold
                            hover:bg-white
                            hover:text-blue-700
                            transition-all
                            duration-300
                        "
          >
            Contact Us
          </Link>

        </div>

      </div>

    </section>
  );
}

export default AdmissionCTA;