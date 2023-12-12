import React from "react";

export default function Message({ text, isSender, time }) {
  const bubbleClass = isSender ? "bg-blue-500 text-white" : "bg-gray-300";

  return (
    <div
      className={`mb-2 py-2 px-6 rounded w-fit ${
        isSender ? "ml-auto" : "mr-auto"
      } ${bubbleClass}`}
    >
      {text}
      <p className="text-xs text-right text-gray-200">{time}</p>
    </div>
  );
}
