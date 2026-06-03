import { useEffect, useState } from "react";

import {
    useNavigate,
    useParams,
} from "react-router-dom";
import API from "../../services/api";
import AdminLayout from "../../components/admin/AdminLayout";


function EditStudent() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [image, setImage] =
        useState(null);

    const [student, setStudent] =
        useState(null);

    useEffect(() => {
        const fetchStudent = async () => {
            try {
                const { data } = await API.get(
                    `/students/${id}`
                );
                setStudent(data.student);
            } catch (error) {
                console.log(error);
            }
        };
        fetchStudent();
    }, [id]);

    const changeHandler = (e) => {
        setStudent({
            ...student,
            [e.target.name]: e.target.value,
        });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();

            Object.keys(student).forEach(
                (key) => {
                    formData.append(
                        key,
                        student[key]
                    );
                }
            );


            if (image) {
                formData.append(
                    "image",
                    image
                );
            }

            await API.put(
                `/students/${id}`,
                formData,
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


    if (!student) {
        return <p>Loading...</p>;
    }

    return (

        <AdminLayout>
            <div className="p-6 max-w-6xl mx-auto">
                <div className="bg-white shadow-2xl rounded-3xl p-10">
                    <h1 className="text-4xl font-bold mb-10">
                        Edit Student
                    </h1>

                    <form
                        onSubmit={submitHandler}
                        className="grid grid-cols-1 md:grid-cols-2 gap-6"
                    >

                        <input type="text" name="fullName" value={student.fullName} onChange={changeHandler} className="border p-4 rounded-xl" />

                        <input type="text" name="admissionNumber" value={student.admissionNumber} onChange={changeHandler} className="border p-4 rounded-xl" />

                        <input type="text" name="rollNumber" value={student.rollNumber} onChange={changeHandler} className="border p-4 rounded-xl" />

                        <input type="email" name="email" value={student.email} onChange={changeHandler} className="border p-4 rounded-xl" />

                        <input type="text" name="phone" value={student.phone} onChange={changeHandler} className="border p-4 rounded-xl" />

                        <select name="gender" value={student.gender} onChange={changeHandler} className="border p-4 rounded-xl">
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>

                        <input type="date" name="dateOfBirth" value={student.dateOfBirth} onChange={changeHandler} className="border p-4 rounded-xl" />

                        <input type="text" name="className" value={student.className} onChange={changeHandler} className="border p-4 rounded-xl" />

                        <input type="text" name="section" value={student.section} onChange={changeHandler} className="border p-4 rounded-xl" />

                        <input type="text" name="guardianName" value={student.guardianName} onChange={changeHandler} className="border p-4 rounded-xl" />

                        <input type="text" name="guardianPhone" value={student.guardianPhone} onChange={changeHandler} className="border p-4 rounded-xl" />

                        <textarea name="address" value={student.address} onChange={changeHandler} className="border p-4 rounded-xl md:col-span-2 h-32" />

                        <select name="status" value={student.status} onChange={changeHandler} className="border p-4 rounded-xl md:col-span-2">
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </select>

                        <input type="file" onChange={(e) => setImage(e.target.files[0])} className="border p-4 rounded-xl md:col-span-2" />


                        <button className="bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-semibold md:col-span-2">
                            Update Student
                        </button>

                    </form>

                </div>

            </div>

        </AdminLayout>
    );
}

export default EditStudent;
