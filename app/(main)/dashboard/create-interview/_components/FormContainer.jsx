"use client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { InterviewType } from "@/services/Constants";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

function FormContainer({ onHandleInputChage, GoToNext }) {
  const [interviewType, setInterviewType] = useState([]);
  useEffect(() => {
    if (interviewType) {
      onHandleInputChage("type", interviewType);
    }
  }, [interviewType]);

  const addInterviewType = (type) => {
    if (interviewType.includes(type)) {
      setInterviewType(interviewType.filter((item) => item !== type));
    } else {
      setInterviewType([...interviewType, type]);
    }
  };
  return (
    <div className="p-5 bg-white rounded-2xl">
      <div className="">
        <h2 className="text-sm font-semibold">Job Position</h2>
        <Input
          onChange={(e) => onHandleInputChage("jobPosition", e.target.value)}
          className="mt-2"
          placeholder="eg. Software Engineer"
        />
      </div>
      <div className="mt-5">
        <h2 className="text-sm font-semibold">Job Description</h2>
        <Textarea
          onChange={(e) => onHandleInputChage("jobDescription", e.target.value)}
          placeholder="Enter job description"
          className="h-[200px] mt-2"
        />
      </div>
      <div className="mt-5">
        <h2 className="text-sm font-semibold">Interview Duration</h2>
        <Select
          onValueChange={(value) => onHandleInputChage("duration", value)}
        >
          <SelectTrigger className="w-full mt-2">
            <SelectValue placeholder="Select Duration" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="5 Min">5 Min</SelectItem>
            <SelectItem value="15 Min">15 Min</SelectItem>
            <SelectItem value="30 Min">30 Min</SelectItem>
            <SelectItem value="45 Min">45 Min</SelectItem>
            <SelectItem value="60 Min">60 Min</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="mt-5">
        <h2 className="text-sm font-semibold">Interview Type</h2>
        <div className="flex gap-3 flex-wrap mt-2">
          {InterviewType.map((type, index) => (
            <div
              key={index}
              className={`cursor-pointer flex items-center gap-2 px-2 p-1 bg-white border border-gray-300  rounded-xl hover:bg-secondary ${
                interviewType.includes(type.title) &&
                "bg-purple-200 text-primary"
              }`}
              onClick={() => addInterviewType(type.title)}
            >
              <type.icon className="h-4 w-4" />
              <span>{type.title}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-5 flex justify-end">
        <Button onClick={() => GoToNext()}>
          Generate Question <ArrowRight className="ml-2" />
        </Button>
      </div>
    </div>
  );
}

export default FormContainer;
