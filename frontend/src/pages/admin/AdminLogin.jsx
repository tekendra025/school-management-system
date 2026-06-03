import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";

import {
    loginStart,
    loginSuccess,
    loginFail,
} from "../../redux/features/authSlice";


function AdminLogin() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // FORM STATE
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    // LOADING
    const [loading, setLoading] = useState(false);

    // HANDLE INPUT CHANGE
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };


    // HANDLE LOGIN
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            dispatch(loginStart());

            const { data } = await API.post(
                "/admin/login",
                formData
            );


            // SAVE TOKEN
            localStorage.setItem(
                "token",
                data.token
            );


            // SAVE REDUX
            dispatch(
                loginSuccess({
                    token: data.token,
                    admin: data.admin,
                })
            );
            alert("Login Successful");
            navigate("/admin/dashboard");

        } catch (error) {
            console.log(error);
            dispatch(loginFail());
            alert(
                error.response?.data?.message ||
                "Login Failed"
            );
        } finally {
            setLoading(false);
        }
    };

    return (

        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="bg-white p-8 rounded-2xl shadow-xl w-100">
                <h1 className="text-3xl font-bold text-center mb-6">
                    Admin Login
                </h1>

                <form
                    onSubmit={handleLogin}
                    className="space-y-4"
                >

                    {/* EMAIL */}
                    <div>
                        <label className="block mb-1 font-medium">
                            Email
                        </label>

                        <input
                            type="email"
                            name="email"
                            placeholder="Enter Email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 p-3 rounded-lg outline-none focus:border-black"
                        />
                    </div>

                    {/* PASSWORD */}
                    <div>
                        <label className="block mb-1 font-medium">
                            Password
                        </label>

                        <input
                            type="password"
                            name="password"
                            placeholder="Enter Password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 p-3 rounded-lg outline-none focus:border-black"
                        />

                    </div>
                    {/* BUTTON */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition duration-300"
                    >
                        {
                            loading
                                ? "Logging..."
                                : "Login"
                        }

                    </button>

                </form>

            </div>

        </div>
    );
}

export default AdminLogin;