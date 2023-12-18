import React from "react";

export default function Message({ text, isSender, time }) {
  const bubbleClass = isSender ? "bg-blue-500 " : "bg-gray-600";

  return (
    <div
      className={`mb-2 py-2 px-6 rounded w-fit text-white ${
        isSender ? "ml-auto" : "mr-auto"
      } ${bubbleClass}`}
    >
      {text}
      <p className="text-xs text-right text-white">{time}</p>
    </div>
  );
}
