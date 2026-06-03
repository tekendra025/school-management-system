import {
    useEffect,
    useState,
} from "react";

import API from "../../services/api";
import AdminLayout from "../../components/admin/AdminLayout";

function CreateResult() {
    const [students, setStudents] =
        useState([]);

    const [student, setStudent] =
        useState("");

    const [examType, setExamType] =
        useState("");

    const [subjects, setSubjects] =
        useState([
            {
                subjectName: "",
                marks: "",
            },
        ]);

    // FETCH STUDENTS
    useEffect(() => {

        const fetchStudents =
            async () => {
                try {
                    const { data } =
                        await API.get(
                            "/students"
                        );

                    setStudents(
                        data.students
                    );

                } catch (error) {
                    console.log(error);
                }
            };

        fetchStudents();

    }, []);

    // ADD SUBJECT
    const addSubject = () => {

        setSubjects([
            ...subjects,
            {
                subjectName: "",
                marks: "",
            },
        ]);
    };

    // CHANGE SUBJECT
    const changeSubject = (
        index,
        field,
        value
    ) => {

        const updatedSubjects =
            [...subjects];

        updatedSubjects[index][field] =
            value;

        setSubjects(
            updatedSubjects
        );
    };

    // SUBMIT
    const submitHandler =
        async (e) => {
            e.preventDefault();
            try {

                await API.post(
                    "/results",
                    {
                        student,
                        examType,
                        subjects:
                            JSON.stringify(
                                subjects
                            ),
                    },
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
                    "Result Added Successfully"
                );

            } catch (error) {
                console.log(error);
            }
        };

    return (

        <AdminLayout>

            <div className="p-6 max-w-6xl mx-auto">
                <div className="bg-white shadow-2xl rounded-3xl p-10">
                    <h1 className="text-4xl font-bold mb-10">
                        Add Result
                    </h1>

                    <form
                        onSubmit={
                            submitHandler
                        }
                        className="space-y-8"
                    >

                        <select
                            value={student}
                            onChange={(e) =>
                                setStudent(
                                    e.target.value
                                )
                            }
                            className="w-full border p-4 rounded-xl"
                        >
                            <option value="">
                                Select Student
                            </option>

                            {students.map(
                                (student) => (

                                    <option
                                        key={
                                            student._id
                                        }
                                        value={
                                            student._id
                                        }
                                    >
                                        {
                                            student.fullName
                                        }
                                    </option>
                                )
                            )}
                        </select>

                        <input
                            type="text"
                            placeholder="Exam Type"
                            value={examType}
                            onChange={(e) =>
                                setExamType(
                                    e.target.value
                                )
                            }
                            className="w-full border p-4 rounded-xl"
                        />

                        {/* SUBJECTS */}
                        <div className="space-y-4">
                            {subjects.map(
                                (
                                    subject,
                                    index
                                ) => (

                                    <div
                                        key={index}
                                        className="grid grid-cols-2 gap-4"
                                    >

                                        <input
                                            type="text"
                                            placeholder="Subject Name"
                                            value={
                                                subject.subjectName
                                            }
                                            onChange={(e) =>
                                                changeSubject(
                                                    index,
                                                    "subjectName",
                                                    e.target.value
                                                )
                                            }
                                            className="border p-4 rounded-xl"
                                        />

                                        <input
                                            type="number"
                                            placeholder="Marks"
                                            value={
                                                subject.marks
                                            }
                                            onChange={(e) =>
                                                changeSubject(
                                                    index,
                                                    "marks",
                                                    e.target.value
                                                )
                                            }
                                            className="border p-4 rounded-xl"
                                        />

                                    </div>
                                )
                            )}

                        </div>

                        <button
                            type="button"
                            onClick={
                                addSubject
                            }
                            className="bg-gray-200 px-6 py-3 rounded-xl"
                        >
                            Add Subject
                        </button>

                        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-semibold">
                            Add Result
                        </button>

                    </form>

                </div>

            </div>

        </AdminLayout>
    );
}

export default CreateResult;