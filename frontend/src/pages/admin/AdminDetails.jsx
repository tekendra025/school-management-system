import {
    useState,
} from "react";

import AdminLayout from "../../components/admin/AdminLayout";
import API from "../../services/api";

function AdminDetails() {
    // ADMIN DATA
    const admin =
        JSON.parse(
            localStorage.getItem(
                "admin"
            )
        );

    // PASSWORD STATE
    const [passwordData,
        setPasswordData] =
        useState({
            oldPassword: "",
            newPassword: "",
            confirmPassword: "",
        });

    // EMAIL STATE
    const [emailData,
        setEmailData] =
        useState({
            newEmail: "",
            password: "",
        });

    // CHANGE PASSWORD
    const changePasswordHandler =
        async (e) => {
            e.preventDefault();
            try {
                const { data } =
                    await API.put(
                        "/admin/change-password",
                        passwordData,
                        {
                            headers: {
                                Authorization:
                                    localStorage.getItem(
                                        "token"
                                    ),
                            },
                        }
                    );

                alert(
                    data.message
                );

                setPasswordData({
                    oldPassword: "",
                    newPassword: "",
                    confirmPassword: "",
                });

            } catch (error) {
                alert(
                    error.response.data.message
                );
            }
        };

    // CHANGE EMAIL
    const changeEmailHandler =
        async (e) => {
            e.preventDefault();
            try {
                const { data } =
                    await API.put(
                        "/admin/change-email",
                        emailData,
                        {
                            headers: {
                                Authorization:
                                    localStorage.getItem(
                                        "token"
                                    ),
                            },
                        }
                    );

                alert(
                    data.message
                );

            } catch (error) {
                alert(
                    error.response.data.message
                );
            }
        };

    return (

        <AdminLayout>
            <div className="p-6 max-w-7xl mx-auto">
                {/* PAGE TITLE */}
                <div className="mb-10">
                    <h1 className="text-4xl font-bold text-gray-800">
                        Admin Settings
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Manage admin account details
                    </p>

                </div>

                {/* GRID */}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* PROFILE CARD */}
                    <div className="bg-white shadow-2xl rounded-3xl p-8">
                        <div className="flex flex-col items-center">
                            <div className="w-28 h-28 rounded-full bg-blue-600 flex items-center justify-center text-white text-4xl font-bold mb-6">
                                {admin?.email?.charAt(
                                    0
                                ).toUpperCase()}

                            </div>

                            <h2 className="text-2xl font-bold text-gray-800">
                                Administrator
                            </h2>

                            <p className="text-gray-500 mt-2">
                                {admin?.email}
                            </p>
                        </div>

                        <div className="mt-10 space-y-5">
                            <div className="border rounded-2xl p-4">
                                <p className="text-sm text-gray-500">
                                    Admin ID
                                </p>

                                <h3 className="font-semibold mt-1 break-all">
                                    {admin?.id}
                                </h3>

                            </div>

                            <div className="border rounded-2xl p-4">
                                <p className="text-sm text-gray-500">
                                    Account Type
                                </p>

                                <h3 className="font-semibold mt-1">
                                    Super Admin
                                </h3>

                            </div>

                            <div className="border rounded-2xl p-4">
                                <p className="text-sm text-gray-500">
                                    Status
                                </p>

                                <h3 className="font-semibold text-green-600 mt-1">
                                    Active
                                </h3>

                            </div>

                        </div>

                    </div>

                    {/* RIGHT SIDE */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* CHANGE EMAIL */}
                        <div className="bg-white shadow-2xl rounded-3xl p-8">
                            <h2 className="text-2xl font-bold mb-6">
                                Change Email
                            </h2>

                            <form
                                onSubmit={
                                    changeEmailHandler
                                }
                                className="space-y-5"
                            >

                                <input
                                    type="email"
                                    placeholder="New Email"
                                    value={
                                        emailData.newEmail
                                    }
                                    onChange={(e) =>
                                        setEmailData({

                                            ...emailData,

                                            newEmail:
                                                e.target.value,
                                        })
                                    }
                                    className="w-full border p-4 rounded-2xl"
                                />

                                <input
                                    type="password"
                                    placeholder="Current Password"
                                    value={
                                        emailData.password
                                    }
                                    onChange={(e) =>
                                        setEmailData({

                                            ...emailData,

                                            password:
                                                e.target.value,
                                        })
                                    }
                                    className="w-full border p-4 rounded-2xl"
                                />

                                <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-semibold">
                                    Update Email
                                </button>

                            </form>
                        </div>

                        {/* CHANGE PASSWORD */}
                        <div className="bg-white shadow-2xl rounded-3xl p-8">
                            <h2 className="text-2xl font-bold mb-6">
                                Change Password
                            </h2>

                            <form
                                onSubmit={
                                    changePasswordHandler
                                }
                                className="space-y-5"
                            >

                                <input
                                    type="password"
                                    placeholder="Old Password"
                                    value={
                                        passwordData.oldPassword
                                    }
                                    onChange={(e) =>
                                        setPasswordData({

                                            ...passwordData,

                                            oldPassword:
                                                e.target.value,
                                        })
                                    }
                                    className="w-full border p-4 rounded-2xl"
                                />

                                <input
                                    type="password"
                                    placeholder="New Password"
                                    value={
                                        passwordData.newPassword
                                    }
                                    onChange={(e) =>
                                        setPasswordData({
                                            ...passwordData,
                                            newPassword:
                                                e.target.value,
                                        })
                                    }
                                    className="w-full border p-4 rounded-2xl"
                                />

                                <input
                                    type="password"
                                    placeholder="Confirm Password"
                                    value={
                                        passwordData.confirmPassword
                                    }
                                    onChange={(e) =>
                                        setPasswordData({
                                            ...passwordData,
                                            confirmPassword:
                                                e.target.value,
                                        })
                                    }
                                    className="w-full border p-4 rounded-2xl"
                                />

                                <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-semibold">
                                    Update Password
                                </button>

                            </form>

                        </div>

                    </div>

                </div>

            </div>

        </AdminLayout>
    );
}

export default AdminDetails;