import Sidebar from "./Sidebar";

import Header from "./Header";



function AdminLayout({ children }) {

    return (

        <div className="flex bg-gray-100 min-h-screen">

            {/* SIDEBAR */}

            <Sidebar />


            {/* MAIN */}

            <div className="flex-1">

                <Header />


                <div className="p-6">

                    {children}

                </div>

            </div>

        </div>
    );
}

export default AdminLayout;