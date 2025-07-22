"use client";

import React, { useEffect } from "react";
import ChatSection from "@/components/workspace/ChatSection";
import CodeEditor from "@/components/workspace/CodeEditor";
import { useParams, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setMessages } from "@/store/chatSlice";
import { getWorkspaceMessages } from "@/server/actions/user.action";
import { useSession } from "next-auth/react";

const Page = () => {
  const params = useParams();
  const workspaceId = params?.id as string;

  const dispatch = useDispatch();
  const router = useRouter();
  const { data: session, status } = useSession();


  useEffect(() => {
    if (!session && status !== "loading") {
      router.push("/");
    }
  }, [session, status, router]);

  useEffect(() => {
    if (!workspaceId || !session) return;

    const fetchMessages = async () => {
      try {
        const messages = await getWorkspaceMessages(workspaceId);
        dispatch(setMessages(messages));
      } catch (error) {
        console.error("❌ Failed to fetch messages:", error);
      }
    };

    fetchMessages();
  }, [workspaceId, session, dispatch]);

  return (
    <div className="bg-zinc-950 flex gap-1 h-full w-full relative overflow-hidden">
      <ChatSection />
      <CodeEditor />
    </div>
  );
};

export default Page;
