"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setPrompt, addMessage } from "@/store/chatSlice";
import { saveMessage } from "@/server/actions/user.action";

type Props = {
  loading: boolean;
  setLoading: (value: boolean) => void;
  workspaceId: string;
};

export default function ChatInput({ loading, setLoading, workspaceId }: Props) {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();

  const handleSendMessage = async () => {
    if (!input.trim() || loading) return;

    const message = await saveMessage({
      role: "user",
      content: input,
      workspaceId,
    });

    dispatch(addMessage(message));
    dispatch(setPrompt(input));
    setInput("");
    setLoading(true);

    try {
      const res = await axios.post("/api/chat", { prompt: input });

      const message = await saveMessage({
        role: "assistant",
        content: res.data.output,
        workspaceId,
      });

      dispatch(addMessage(message));
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="border-t p-3">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
        className="flex items-center space-x-3"
      >
        <div className="flex-1 relative w-full">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="w-full h-35 px-4 py-3 pr-14 border border-gray-300 bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm min-h-[48px] max-h-32"
            rows={1}
          />
          <Button
            type="submit"
            disabled={!input.trim() || loading}
            className={`absolute right-2 top-1/2 transform -translate-y-1/2 p-2 rounded-full transition-all duration-200 ${
              input.trim() && !loading
                ? "bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </form>
      <div className="flex items-center justify-center mt-2">
        {/* <p className="text-xs text-gray-500">
          Press Enter to send • Shift + Enter for new line
        </p> */}
      </div>
    </div>
  );
}
