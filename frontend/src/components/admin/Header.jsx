import { Link } from "react-router-dom";

function Header() {

    return (

        <div className="bg-white shadow-md p-5 flex items-center justify-between">

            <h1 className="text-2xl font-bold">

                Admin Dashboard

            </h1>


            <div className="flex items-center gap-3">

                <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center">

                    A

                </div>

                <div>

                    <p className="font-semibold">

                        <Link to='/admin/details'>Admin</Link>

                    </p>

                </div>

            </div>

        </div>
    );
}

export default Header;