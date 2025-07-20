"use client";

import { useRef, useEffect, useState } from "react";
import { Bot, User } from "lucide-react";
import ChatInput from "./chat/ChatInput";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store"; // make sure this is correctly set up in your store.ts
import { useParams } from "next/navigation";

export default function ChatSection() {
    const params = useParams();
const workspaceId = params?.id as string;
  const messageEndRef = useRef<HTMLDivElement>(null);
  const messages = useSelector((state: RootState) => state.chat.messages);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="h-[93vh] min-w-[500px] max-w-[500px] flex flex-col">
      <div className="flex-1 overflow-y-auto p-3 space-y-4 hide-scrollbar">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start space-x-3 ${
              msg.role === "user"
                ? "flex-row-reverse space-x-reverse"
                : "max-w-90"
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                msg.role === "user" ? "bg-blue-600" : "bg-gray-600"
              }`}
            >
              {msg.role === "user" ? (
                <User className="w-4 h-4 text-white" />
              ) : (
                <Bot className="w-4 h-4 text-white" />
              )}
            </div>
            <div
              className={`px-4 py-2 rounded-2xl w-fit max-w-[95%] break-words ${
                msg.role === "user"
                  ? "bg-blue-600 text-white"
                  : "bg-zinc-900 text-white"
              }`}
            >
              <div className="text-sm leading-relaxed whitespace-pre-wrap">
                {msg.content}
              </div>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <div className="bg-gray-100 rounded-2xl px-4 py-2">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.1s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
              </div>
            </div>
          </div>
        )}

        <div ref={messageEndRef} />
      </div>

      <ChatInput loading={loading} setLoading={setLoading} workspaceId={workspaceId} />
    </div>
  );
}
