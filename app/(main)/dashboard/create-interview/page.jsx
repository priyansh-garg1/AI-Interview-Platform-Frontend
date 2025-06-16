"use client";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import FormContainer from "./_components/FormContainer";
import QuestionsList from "./_components/QuestionsList";
import { toast } from "sonner";
import InterviewLink from "./_components/InterviewLink";

function CreateInterview() {
  const router = useRouter();
  const [step, setStep] = useState(3);
  const [formData, setFormData] = useState();
  const [interviewId, setInterviewId] = useState("");

  const onHandleInputChage = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const onGoToNext = () => {
    if (
      !formData?.jobPosition ||
      !formData?.jobDescription ||
      !formData?.type ||
      !formData?.duration
    ) {
      toast("Please enter all details.");
      return;
    }
    setStep(step + 1);
  };

  const onCreateLink = (interviewId) => {
    setInterviewId(interviewId);
    setStep(step + 1);
  };

  return (
    <div className="mt-5 px-10 md:px-24 lg:px-44 xl:px-5">
      <div className="flex gap-5 items-center">
        <ArrowLeft onClick={() => router.back()} className="cursor-pointer" />
        <h2 className="text-2xl font-bold">Create New Interview</h2>
      </div>
      <Progress value={step * 33.33} className={"my-5"} />
      {step == 1 && (
        <FormContainer
          onHandleInputChage={onHandleInputChage}
          GoToNext={() => onGoToNext()}
        />
      )}
      {step == 2 && (
        <QuestionsList formData={formData} onCreateLink={onCreateLink} />
      )}
      {step == 3 && (
        <InterviewLink interviewId={interviewId} formData={formData} />
      )}
    </div>
  );
}

export default CreateInterview;
