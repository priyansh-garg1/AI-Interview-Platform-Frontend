'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Calendar, Clock, CopyIcon, List, Mail, MessageCircle, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

function InterviewLink({ interviewId, formData = { duration: "30 minutes" } }) {
  const [interviewUrl, setInterviewUrl] = useState("");

  const GetInterviewUrl = async () => {
    const url = process.env.NEXT_PUBLIC_HOST_URL + "/" + interviewId;
    setInterviewUrl(url);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(interviewUrl);
      toast("Link copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  useEffect(() => {
    GetInterviewUrl();
  }, [interviewId]);

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="flex flex-col items-center bg-white rounded-2xl shadow-lg p-8">
        <Image src="/check.png" alt="check" width={60} height={60} />
        <h2 className="text-2xl font-bold mt-4 text-center">Your AI Interview is Ready!</h2>
        <p className="text-sm text-gray-500 mt-2 text-center">
          Share this link with your candidates to start the interview process.
        </p>

        <div className="w-full mt-6">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-md font-semibold text-gray-800">Interview Link</h3>
            <span className="text-sm text-blue-600 bg-blue-100 px-3 py-1 rounded-full">Valid for 30 Days</span>
          </div>
          <div className="flex items-center">
            <Input value={interviewUrl || ""} disabled className="flex-1" />
            <Button onClick={handleCopy} className="ml-2 px-3">
              <CopyIcon className="mr-1 h-4 w-4" />
              Copy
            </Button>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mt-6">
          <span className="text-xs font-medium text-gray-700 bg-gray-100 px-3 py-1.5 rounded-full flex items-center gap-1">
            <Clock className="w-4 h-4" /> {formData?.duration}
          </span>
          <span className="text-xs font-medium text-gray-700 bg-gray-100 px-3 py-1.5 rounded-full flex items-center gap-1">
            <List className="w-4 h-4" /> 10 Questions
          </span>
          <span className="text-xs font-medium text-gray-700 bg-gray-100 px-3 py-1.5 rounded-full flex items-center gap-1">
            <Calendar className="w-4 h-4" /> {formData?.duration}
          </span>
        </div>

        <div className="w-full mt-8">
          <h3 className="text-md font-semibold mb-3">Share via</h3>
          <div className="flex gap-4">
            <Button variant="outline" className="flex-1 py-2 hover:bg-gray-100">
              <Mail className="mr-2 h-4 w-4" /> Email
            </Button>
            <Button variant="outline" className="flex-1 py-2 hover:bg-gray-100">
              <MessageCircle className="mr-2 h-4 w-4" /> WhatsApp
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-between items-center">
        <Link href="/dashboard">
          <Button variant="outline" className="hover:bg-gray-100">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go Back to Dashboard
          </Button>
        </Link>
        <Link href="/dashboard/create-interview">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create New Interview
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default InterviewLink;
