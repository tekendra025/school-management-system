import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { BASE_URL } from '../../services/api';

const Hero = () => {
    const settingsReducer = useSelector((state) => state.settings.settings);
    const aboutReducer = useSelector((state) => state.about.about);
    return (
        <div>
            {/* HERO */}
            <section className="relative h-[90vh] overflow-hidden">

                <img
                    src={aboutReducer?.image
                        ? `${BASE_URL}/${aboutReducer.image}`
                        : "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1600&auto=format&fit=crop"}
                    alt="School"
                    className="absolute inset-0 w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-black/60" />

                <div className="relative z-10 max-w-7xl mx-auto h-full flex flex-col justify-center px-6 lg:px-12 text-white">


                    <h1 className="text-5xl md:text-7xl font-extrabold leading-tight max-w-4xl">
                        {settingsReducer?.schoolName}
                    </h1>

                    <div className="flex gap-5 mt-10 flex-wrap">

                        <Link
                            to="/admission"
                            className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-2xl font-semibold"
                        >
                            Apply For Admission
                        </Link>

                        <Link
                            to="/about"
                            className="bg-white text-black hover:bg-gray-200 px-8 py-4 rounded-2xl font-semibold"
                        >
                            Explore School
                        </Link>

                    </div>

                </div>

            </section>

        </div>
    )
}

export default Hero
