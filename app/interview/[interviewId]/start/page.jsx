'use client';

import React, { useContext } from 'react';
import { InterviewDataContext } from '@/context/InterviewDataContext';
import { TimerIcon, BotIcon, UserIcon, MicIcon, PhoneIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

function getInitials(name = '') {
    return name
        .split(' ')
        .map((n) => n[0]?.toUpperCase())
        .join('')
        .slice(0, 2);
}

function StartInterview() {
    const { interviewInfo } = useContext(InterviewDataContext);
    const userName = interviewInfo?.name || 'User';

    return (
        <div className="w-full max-w-5xl mx-auto mt-6 rounded-xl overflow-hidden">
            <div className="bg-white flex items-center justify-between mb-6">
                <h2 className="text-center text-2xl font-bold">AI Interview</h2>
                <div className="bg-white shadow p-3 flex items-center justify-center border-b border-gray-200 rounded-xl">
                    <TimerIcon className="mr-2 text-blue-600 w-5 h-5" />
                    <span className="text-sm font-medium text-gray-800">00:99:00</span>
                </div>
            </div>

            <div className="grid grid-cols-2 bg-white gap-6">
                <div className="bg-gray-100 flex flex-col items-center justify-center py-20 border border-gray-200 rounded-xl">
                    <BotIcon className="text-blue-500 w-6 h-6 mb-3" />
                    <img
                        src="/ai-avatar.png"
                        alt="AI Interviewer"
                        className="w-28 h-28 object-cover rounded-full shadow"
                    />
                    <p className="mt-3 text-sm font-semibold text-gray-700">AI Interviewer</p>
                </div>

                <div className="bg-gray-100 flex flex-col items-center justify-center py-20 border border-gray-200 rounded-xl">
                    <UserIcon className="text-green-500 w-6 h-6 mb-3" />
                    <div className="w-28 h-28 bg-blue-600 text-white rounded-full flex items-center justify-center text-3xl font-bold shadow">
                        {getInitials(userName)}
                    </div>
                    <p className="mt-3 text-sm font-semibold text-gray-700">{userName}</p>
                </div>
            </div>
            <div className="flex justify-center items-center gap-6 mt-6">
                <Button className="bg-white border border-gray-300 rounded-full p-4 shadow hover:shadow-md transition">
                    <MicIcon className="text-gray-700 w-6 h-6" />
                </Button>
                <Button className="bg-red-600 rounded-full p-4 shadow hover:bg-red-700 transition">
                    <PhoneIcon className="text-white w-6 h-6" />
                </Button>
            </div>
        </div>
    );
}

export default StartInterview;
