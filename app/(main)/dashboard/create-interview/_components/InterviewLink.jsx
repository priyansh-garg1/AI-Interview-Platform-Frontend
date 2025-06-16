import { Input } from "@/components/ui/input";
import { CheckCircle } from "lucide-react";
import Image from "next/image";
import React from "react";

function InterviewLink({ interviewId, formData }) {
  const GetInterviewUrl = async () => {
    const url = process.env.NEXT_PUBLIC_HOST_URL + "/" + interviewId;
    return url;
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center mt-10">
        <Image src="/check.png" alt="check" width={50} height={50} />
        <h2 className="text-lg font-bold mt-4">Your AI Interview is Ready!</h2>
        <p className="text-sm text-gray-500 mt-2">
          Share this link with your candidates to start the interview process
        </p>

        <div className="w-full p-7 mt-6 rounded-xl bg-white">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Interview Link</h2>
            <h2 className="p-1 px-2 text-primary rounded-lg bg-purple-100">
              Valid for 30 Days
            </h2>
          </div>
          <div className="mt-2">
            <Input defaultValue={() => GetInterviewUrl()} disabled />
          </div>
        </div>
      </div>
    </div>
  );
}

export default InterviewLink;
