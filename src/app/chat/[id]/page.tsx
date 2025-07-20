"use client";

import React, { useEffect } from "react";
import ChatSection from "@/components/workspace/ChatSection";
import CodeEditor from "@/components/workspace/CodeEditor";
import { useParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { setMessages } from "@/store/chatSlice";
import { getWorkspaceMessages } from "@/server/actions/user.action";


const Page = () => {
  const params = useParams();
  const workspaceId = params?.id as string;
  const dispatch = useDispatch();

  useEffect(() => {
    if (!workspaceId) return;

    const fetchMessages = async () => {
      try {
        const messages = await getWorkspaceMessages(workspaceId);
        dispatch(setMessages(messages));
      } catch (error) {
        console.error("Failed to fetch messages:", error);
      }
    };

    fetchMessages();
  }, [workspaceId, dispatch]);

  return (
    <div className="bg-zinc-950 flex gap-1 h-full w-full relative overflow-hidden">
      <ChatSection />
      <CodeEditor />
    </div>
  );
};

export default Page;
