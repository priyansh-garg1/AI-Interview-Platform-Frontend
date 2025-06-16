import { Button } from "@/components/ui/button";
import axios from "axios";
import { Loader2Icon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import QuestionListContainer from "./QuestionListContainer";
import { supabase } from "@/services/supabaseClient";
import { useUser } from "@/app/provider";
import { v4 as uuidv4 } from "uuid";

function QuestionsList({ formData, onCreateLink }) {
  const [loading, setLoading] = useState(true);
  const [questionsList, setQuestionsList] = useState([]);
  const [saveLoading, setSaveLoading] = useState(false);

  const { user } = useUser();

  useEffect(() => {
    if (formData) {
      GenerateQuestionList();
    }
  }, [formData]);

  const GenerateQuestionList = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/ai/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate AI response');
      }
  
      const data = await response.json();
      const Content = data.content;
      const FinalContent = Content.replace("```json", "").replace("```", "");
      setQuestionsList(JSON.parse(FinalContent)?.interviewQuestions);

      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast("Something went wrong.");
    }
  };

  const onFinish = async () => {
    setSaveLoading(true);
    const interviewId = uuidv4();
    const { data, error } = await supabase
      .from("interviews")
      .insert([
        {
          ...formData,
          questionList: questionsList,
          userEmail: user?.app_metadata?.email,
          interview_id: interviewId,
        },
      ])
      .select();
    setSaveLoading(false);
    onCreateLink(interviewId);
  };

  return (
    <div>
      {loading && (
        <div className="p-5 bg-blue-100 rounded-2xl border border-primary flex items-center gap-5">
          <Loader2Icon className="animate-spin" />
          <div className="">
            <h2 className="font-medium">Generating Interview Questions</h2>
            <p className="text-primary">
              AI is crafting persenalized questions. According to your job
              description
            </p>
          </div>
        </div>
      )}
      {questionsList.length > 0 && (
        <div className="">
          <QuestionListContainer questionsList={questionsList} />
        </div>
      )}
      {!loading && (
        <div className="flex justify-end mt-10">
          <Button disabled={saveLoading} onClick={onFinish}>
            {saveLoading ? (
              <Loader2Icon className="animate-spin" />
            ) : (
              "Create Interview and Get Link"
            )}
          </Button>
        </div>
      )}
    </div>
  );
}

export default QuestionsList;
