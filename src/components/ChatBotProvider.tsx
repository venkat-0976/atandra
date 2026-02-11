import React from "react";
import ChatBot from "./Chatbot";

interface ChatBotProviderProps {
  children: React.ReactNode;
}

const ChatBotProvider: React.FC<ChatBotProviderProps> = ({ children }) => {
  return (
    <>
      {children}
      <ChatBot />
    </>
  );
};

export default ChatBotProvider;