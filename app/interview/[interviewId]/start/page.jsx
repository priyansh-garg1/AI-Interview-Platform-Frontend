'use client';
import Vapi from '@vapi-ai/web';
import React, { useContext, useEffect, useState } from 'react';
import { InterviewDataContext } from '@/context/InterviewDataContext';
import { TimerIcon, BotIcon, UserIcon, MicIcon, PhoneIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AlertConfirmation from './_components/AlertConfirmation';
import { toast } from 'sonner';
import Image from 'next/image';

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
    const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_API_KEY);
    const [activeUser, setActiveUser] = useState(false);

    const startCall = async () => {
        let questionsList = "";
        interviewInfo?.questionList?.forEach((item) => {
            questionsList = item.question + ", " + questionsList;
        });


        const assistantOptions = {
            name: "AI Recruiter",
            firstMessage: "Hi " + userName + ", how are you? Ready for your interview on " + interviewInfo?.jobPosition + "?",
            transcriber: {
                provider: "deepgram",
                model: "nova-2",
                language: "en-US",
            },

            voice: {
                provider: "playht",
                voiceId: "jennifer",
            },

            model: {
                provider: "openai", model: "gpt-4", messages: [{
                    role: "system", content: `
You are an AI voice assistant conducting interviews.
Your job is to ask candidates provided interview questions, assess their responses.
Begin the conversation with a friendly introduction, setting a relaxed yet professional tone. Example:
"Hey there! Welcome to your `+ interviewInfo?.jobPosition + ` interview. Let's get started with a few questions!"
Ask one question at a time and wait for the candidate's response before proceeding. Keep the questions clear and concise. Below Are the questions ask one by one:
Questions: `+ questionsList + `
If the candidate struggles, offer hints or rephrase the question without giving away the answer. Example:
"Need a hint? Think about how React tracks component updates!"
Provide brief, encouraging feedback after each answer. Example:
"Nice! That's a solid answer."
"Hmm, not quite! Want to try again?"
Keep the conversation natural and engaging-use casual phrases like "Alright, next up...' or "Let's tackle a tricky one!" After 5-7 questions, wrap up the interview smoothly by summarizing their performance. Example:
"That was great! You handled some tough questions well. Keep sharpening your skills!"
End on a positive note:
"Thanks for chatting! Hope to see you crushing projects soon!"
Key Guidelines:
✓ Be friendly, engaging, and witty
✓ Keep responses short and natural, like a real conversation
✓ Adapt based on the candidate's confidence level
✓ Ensure the interview remains focused on React
`.trim(),
                },
                ],
            },
        };

        vapi.start(assistantOptions)

    };

    const stopInterview = async () => {
        await vapi.stop();
    }

    vapi.on('call-start', () => {
        toast.success('Call Connected...');
    })

    vapi.on('speech-start', () => {
        setActiveUser(true);
    })

    vapi.on('speech-end', () => {
        setActiveUser(false);
    })

    vapi.on('call-end', () => {
        toast.success('Interview Ended...');
    })

    useEffect(() => {
        interviewInfo && startCall()
    }, [interviewInfo])

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
                    <div className="relative">
                        {activeUser && <span className="absolute inset-0 rounded-full bg-blue-400 opacity-75 animate-ping z-0" />}
                        <Image
                            src="/ai-avatar.png"
                            alt="AI Interviewer"
                            className="w-20 h-20 object-cover rounded-full shadow relative z-10"
                            height={112}
                            width={112}
                        />
                    </div>

                    <p className="mt-3 text-sm font-semibold text-gray-700">AI Interviewer</p>
                </div>

                <div className="bg-gray-100 flex flex-col items-center justify-center py-20 border border-gray-200 rounded-xl">
                    <div className="relative">
                        {!activeUser && <span className="absolute inset-0 rounded-full bg-blue-400 opacity-75 animate-ping z-0" />}
                        <div className="w-20 h-20 bg-blue-600 text-white rounded-full flex items-center justify-center text-3xl font-bold shadow">
                            {getInitials(userName)}
                        </div>
                    </div>
                    <p className="mt-3 text-sm font-semibold text-gray-700">{userName}</p>
                </div>
            </div>
            <div className="flex justify-center items-center gap-6 mt-6">
                <MicIcon className="bg-gray-500 rounded-full p-2 shadow hover:bg-gray-700 transition text-white w-10 h-10" />
                <AlertConfirmation stopInterview={stopInterview}>
                    <PhoneIcon className="bg-red-500 rounded-full p-2 shadow hover:bg-red-700 transition text-white w-10 h-10" />
                </AlertConfirmation>

            </div>
        </div>
    );
}

export default StartInterview;
