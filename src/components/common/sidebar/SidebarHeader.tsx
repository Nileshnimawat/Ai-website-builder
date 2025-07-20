import React from "react";
import {
  SidebarMenu,
  SidebarMenuItem,
  // SidebarTrigger,
} from "@/components/ui/sidebar";
import { PenLine } from "lucide-react";
import { RocketIcon } from "lucide-react";
import { useTransition } from "react";
import { createWorkspace } from "@/server/actions/user.action";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";


const SidebarHeader = () => {
  const prompt = useSelector((state:RootState)=>state.chat.prompt);
    const [isPending, startTransition] = useTransition();
    const router = useRouter();
  const handleNewChat = () => {
    startTransition(async () => {
      const id = await createWorkspace(prompt);
      router.push(`/chat/${id}`);
    });
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem className="flex flex-col gap-6  rounded-md ">
        {/* Left: Logo + New Chat */}
        <div className="flex justify-between gap-2 items-center px-2">
          {/* Replace with actual logo if needed */}
          <RocketIcon className="w-6 h-6  "/>
         {/* <SidebarTrigger className="text-white hover:text-gray-300 transition-colors" /> */}
        </div>


            <button
            onClick={handleNewChat}
            className="flex items-center gap-4 p-2 rounded-lg text-white hover:text-gray-300  hover:bg-zinc-800 transition-colors text-base font-medium"
          >
            <PenLine className="h-5 w-5" />
           {isPending ? "Creating..." : "New Chat"}
          </button>
       
        
      </SidebarMenuItem>
    </SidebarMenu>
  );
};

export default SidebarHeader;
