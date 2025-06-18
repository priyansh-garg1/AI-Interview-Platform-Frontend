'use client';
import { InterviewDataContext } from "@/context/InterviewDataContext";
import {  Video } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "sonner";

function Interview() {
    const { interviewId } = useParams();
    const [name, setName] = useState("");
    const [interviewData, setInterviewData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { interviewInfo, setInterviewInfo } = useContext(InterviewDataContext);

    const router = useRouter();

    const fetchInterviewDetails = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/interview/get/${interviewId}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setInterviewData(data);
        } catch (err) {
            setError(err);
            console.error("Error fetching interview details:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (interviewId) {
            fetchInterviewDetails();
        }
    }, [interviewId]);

    const handleBeginInterview = () => {
        if (!name.trim()) {
            toast.error("Please enter your name to begin the interview.");
            return;
        }
        setInterviewInfo({
            ...interviewData,
            name,
        });
        router.push(`/interview/${interviewId}/start`);
    };

    if (loading) {
        return <div className="text-center mt-10">Loading interview details...</div>;
    }

    if (error) {
        return (
            <div className="text-center mt-10 text-red-600">
                Error loading interview details: {error.message}
            </div>
        );
    }

    if (!interviewData) {
        return <div className="text-center mt-10">Interview details not found.</div>;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 p-8 flex flex-col items-center">
            <h1 className="text-4xl font-bold text-center text-blue-600 mb-2">
                AI-Powered Interview Platform
            </h1>
            <p className="text-gray-600 text-center max-w-xl mb-6">
                Please review the interview details below before starting.
            </p>

            <div className="mb-8">
                <Image
                    src="/platform-image.png"
                    alt="Interview Illustration"
                    width={240}
                    height={240}
                    className="rounded-full shadow-md"
                />
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-2xl">
                <div className="space-y-6">
                    <div>
                        <h2 className="text-sm font-semibold text-gray-500 uppercase mb-1">
                            Job Position
                        </h2>
                        <p className="text-lg text-gray-800 font-medium">
                            {interviewData.jobPosition}
                        </p>
                    </div>

                    <div>
                        <h2 className="text-sm font-semibold text-gray-500 uppercase mb-1">
                            Job Description
                        </h2>
                        <p className="text-gray-800">{interviewData.jobDescription}</p>
                    </div>

                    <div>
                        <h2 className="text-sm font-semibold text-gray-500 uppercase mb-1">
                            Interview Type
                        </h2>
                        <p className="text-gray-800">
                            {Array.isArray(interviewData.type)
                                ? interviewData.type.join(", ")
                                : interviewData.type}
                        </p>
                    </div>

                    <div>
                        <h2 className="text-sm font-semibold text-gray-500 uppercase mb-1">
                            Duration
                        </h2>
                        <p className="text-gray-800">{interviewData.duration}</p>
                    </div>

                    <div>
                        <label className="text-sm font-medium text-gray-700 mb-1 block">
                            Your Name
                        </label>
                        <input
                            type="text"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your full name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-md">
                        <h3 className="font-semibold text-blue-700 mb-1">
                            Before You Begin:
                        </h3>
                        <ul className="list-disc list-inside text-sm text-blue-800 space-y-1">
                            <li>Ensure your camera is working.</li>
                            <li>Make sure your microphone is connected and accessible.</li>
                            <li>Sit in a quiet, well-lit space.</li>
                            <li>Check your internet connection.</li>
                        </ul>
                    </div>

                    <div className="pt-4 flex justify-end">
                        <button
                            onClick={handleBeginInterview}
                            className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition duration-300 flex items-center gap-2"
                        >
                            <Video />
                            Join Interview
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Interview;
