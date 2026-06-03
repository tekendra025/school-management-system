function DashboardCard({

    title,

    value,

    icon,

}) {

    return (

        <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition duration-300">

            <div className="flex items-center justify-between">

                <div>

                    <h3 className="text-gray-500 text-lg">

                        {title}

                    </h3>

                    <h1 className="text-4xl font-bold mt-3">

                        {value}

                    </h1>

                </div>


                <div className="text-5xl text-black">

                    {icon}

                </div>

            </div>

        </div>
    );
}

export default DashboardCard;