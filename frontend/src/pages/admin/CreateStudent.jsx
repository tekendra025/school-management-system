import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";
import AdminLayout from "../../components/admin/AdminLayout";


function CreateStudent() {

    const navigate = useNavigate();
    const [image, setImage] =
        useState(null);

    const [formData, setFormData] =
        useState({

            fullName: "",
            admissionNumber: "",
            rollNumber: "",
            email: "",
            phone: "",
            gender: "",
            dateOfBirth: "",
            className: "",
            section: "",
            address: "",
            guardianName: "",
            guardianPhone: "",
        });


    const changeHandler = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };


    const submitHandler = async (e) => {
        e.preventDefault();

        try {

            const studentData =
                new FormData();

            Object.keys(formData).forEach(
                (key) => {
                    studentData.append(
                        key,
                        formData[key]
                    );
                }
            );


            if (image) {
                studentData.append(
                    "image",
                    image
                );
            }


            await API.post(
                "/students",
                studentData,
                {
                    headers: {
                        Authorization:
                            localStorage.getItem(
                                "token"
                            ),
                    },
                }
            );


            navigate(
                "/admin/students"
            );

        } catch (error) {

            console.log(error);
        }
    };


    return (

        <AdminLayout >
            <div className="p-6 max-w-6xl mx-auto">
                <div className="bg-white shadow-2xl rounded-3xl p-10">
                    <h1 className="text-4xl font-bold mb-10">
                        Add Student
                    </h1>

                    <form
                        onSubmit={submitHandler}
                        className="grid grid-cols-1 md:grid-cols-2 gap-6"
                    >

                        <input type="text" name="fullName" placeholder="Full Name" onChange={changeHandler} className="border p-4 rounded-xl" />

                        <input type="text" name="admissionNumber" placeholder="Admission Number" onChange={changeHandler} className="border p-4 rounded-xl" />

                        <input type="text" name="rollNumber" placeholder="Roll Number" onChange={changeHandler} className="border p-4 rounded-xl" />

                        <input type="email" name="email" placeholder="Email" onChange={changeHandler} className="border p-4 rounded-xl" />

                        <input type="text" name="phone" placeholder="Phone" onChange={changeHandler} className="border p-4 rounded-xl" />

                        <select name="gender" onChange={changeHandler} className="border p-4 rounded-xl">
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>

                        <input type="date" name="dateOfBirth" onChange={changeHandler} className="border p-4 rounded-xl" />

                        <input type="text" name="className" placeholder="Class" onChange={changeHandler} className="border p-4 rounded-xl" />

                        <input type="text" name="section" placeholder="Section" onChange={changeHandler} className="border p-4 rounded-xl" />

                        <input type="text" name="guardianName" placeholder="Guardian Name" onChange={changeHandler} className="border p-4 rounded-xl" />

                        <input type="text" name="guardianPhone" placeholder="Guardian Phone" onChange={changeHandler} className="border p-4 rounded-xl" />

                        <textarea name="address" placeholder="Address" onChange={changeHandler} className="border p-4 rounded-xl md:col-span-2 h-32" />

                        <input type="file" onChange={(e) => setImage(e.target.files[0])} className="border p-4 rounded-xl md:col-span-2" />


                        <button className="bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-semibold md:col-span-2">
                            Add Student
                        </button>

                    </form>

                </div>

            </div>

        </AdminLayout>
    );
}

export default CreateStudent;
