import { Message } from "@/types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";



type ChatState = {
  prompt: string;
  messages: Message[];
  files: object;
};

const initialState: ChatState = {
  prompt: "",
  messages: [],
  files: {},
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setMessages: (state, action: PayloadAction<Message[]>) => {
      state.messages = action.payload;
    },
    addMessage: (state, action: PayloadAction<Message>) => {
      state.messages.push(action.payload);
    },
    clearMessages: (state) => {
      state.messages = [];
    },
    setPrompt: (state, action: PayloadAction<string>) => {
      state.prompt = action.payload;
    },
  },
});

export const { addMessage, clearMessages, setPrompt , setMessages} = chatSlice.actions;
export default chatSlice.reducer;
