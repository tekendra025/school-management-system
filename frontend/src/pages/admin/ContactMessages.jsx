import { useEffect, useState } from "react";

import {
    FaTrash,
    FaEnvelope,
    FaPhone,
} from "react-icons/fa";

import AdminLayout from "../../components/admin/AdminLayout";
import API from "../../services/api";



function ContactMessages() {

    // STATES
    const [messages, setMessages] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    // FETCH MESSAGES
    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const { data } = await API.get(
                    "/contact"
                );
                // console.log(data);

                // IMPORTANT
                setMessages(data.messages);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        fetchMessages();
    }, []);

    // DELETE MESSAGE
    const deleteMessage = async (id) => {
        const confirmDelete = window.confirm(
            "Delete this message?"
        );

        if (!confirmDelete) return;
        try {
            await API.delete(
                `/contact/${id}`
            );

            // REMOVE FROM UI
            setMessages(
                messages.filter(
                    (message) =>
                        message._id !== id
                )
            );
            alert("Message Deleted");
        } catch (error) {
            console.log(error);
            alert("Delete Failed");
        }
    };

    return (

        <AdminLayout>
            {/* HEADER */}
            <div className="flex items-center justify-between mb-8">

                <div>
                    <h1 className="text-3xl font-bold">
                        Contact Messages
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Total Messages:
                        {" "}
                        {messages?.length}
                    </p>
                </div>

            </div>

            {/* LOADING */}
            {
                loading ? (
                    <h1 className="text-xl">
                        Loading Messages...
                    </h1>

                ) : (
                    <>
                        {
                            messages?.length > 0 ? (
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    {
                                        messages.map(
                                            (message) => (
                                                <div
                                                    key={message._id}
                                                    className="bg-white rounded-2xl shadow-md p-6"
                                                >

                                                    {/* TOP */}
                                                    <div className="flex items-start justify-between">
                                                        <div>
                                                            <h2 className="text-2xl font-bold">
                                                                {
                                                                    message.name
                                                                }
                                                            </h2>

                                                            <p className="text-gray-500 mt-1">
                                                                {
                                                                    new Date(
                                                                        message.createdAt
                                                                    ).toLocaleDateString()
                                                                }
                                                            </p>
                                                        </div>

                                                        <button
                                                            onClick={() =>
                                                                deleteMessage(
                                                                    message._id
                                                                )
                                                            }
                                                            className="bg-red-500 hover:bg-red-600 text-white p-3 rounded-lg"
                                                        >
                                                            <FaTrash />
                                                        </button>

                                                    </div>

                                                    {/* EMAIL */}
                                                    <div className="flex items-center gap-3 mt-6">
                                                        <FaEnvelope className="text-gray-500" />
                                                        <a
                                                            href={`mailto:${message.email}`}
                                                            className="text-blue-600 hover:underline"
                                                        >
                                                            {
                                                                message.email
                                                            }
                                                        </a>

                                                    </div>

                                                    {/* PHONE */}
                                                    <div className="flex items-center gap-3 mt-4">
                                                        <FaPhone className="text-gray-500" />
                                                        <a
                                                            href={`tel:${message.phone}`}
                                                            className="hover:underline"
                                                        >
                                                            {
                                                                message.phone
                                                            }
                                                        </a>
                                                    </div>

                                                    {/* SUBJECT */}
                                                    <div className="mt-6">
                                                        <h3 className="font-bold text-lg">
                                                            Subject
                                                        </h3>

                                                        <p className="text-gray-700 mt-2">
                                                            {
                                                                message.subject
                                                            }

                                                        </p>

                                                    </div>

                                                    {/* MESSAGE */}
                                                    <div className="mt-6">
                                                        <h3 className="font-bold text-lg">
                                                            Message
                                                        </h3>

                                                        <p className="text-gray-700 mt-2 leading-7">
                                                            {
                                                                message.message
                                                            }
                                                        </p>

                                                    </div>

                                                    {/* ACTION BUTTONS */}
                                                    <div className="flex gap-4 mt-8">
                                                        {/* REPLY EMAIL */}
                                                        <a
                                                            href={`mailto:${message.email}`}
                                                            className="bg-black hover:bg-gray-800 text-white px-5 py-3 rounded-lg flex items-center gap-2"
                                                        >
                                                            <FaEnvelope />
                                                            Reply Email
                                                        </a>

                                                        {/* CALL */}
                                                        <a
                                                            href={`tel:${message.phone}`}
                                                            className="bg-green-500 hover:bg-green-600 text-white px-5 py-3 rounded-lg flex items-center gap-2"
                                                        >
                                                            <FaPhone />
                                                            Call
                                                        </a>

                                                    </div>

                                                </div>
                                            )
                                        )
                                    }

                                </div>

                            ) : (

                                <div className="bg-white p-10 rounded-2xl shadow-md text-center">

                                    <h1 className="text-2xl font-bold">
                                        No Messages Found
                                    </h1>

                                </div>
                            )
                        }

                    </>
                )
            }

        </AdminLayout>
    );
}

export default ContactMessages;