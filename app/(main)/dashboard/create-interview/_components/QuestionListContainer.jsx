import React from "react";

function QuestionListContainer({ questionsList }) {
  return (
    <div>
      <h2 className="font-bold text-lg mb-5">Generated Interview Questions</h2>
      <div className="p-5 border border-gray-400 rounded-xl bg-white">
        {questionsList.map((item, index) => (
          <div
            key={index}
            className="p-3 bg-white rounded-2xl border border-gray-200 gap-3 mb-5"
          >
            <h2 className="font-medium">{item.question}</h2>
            <h2 className="text-sm text-primary">Type: {item?.type}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default QuestionListContainer;
