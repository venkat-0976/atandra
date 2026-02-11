
import React from 'react';
import { Bot } from 'lucide-react';

interface AgentAvatarProps {
  isSpeaking: boolean;
  isConnected: boolean;
}

const AgentAvatar: React.FC<AgentAvatarProps> = ({ isSpeaking, isConnected }) => {
  return (
    <div className="relative">
      {/* Outer glow ring */}
      <div className={`absolute inset-0 rounded-full transition-all duration-500 ${
        isSpeaking
          ? 'bg-gradient-to-r from-pink-500/20 to-purple-500/20 animate-pulse scale-150'
          : isConnected
          ? 'bg-gradient-to-r from-blue-500/20 to-cyan-500/20 animate-pulse scale-125'
          : 'bg-gray-500/10 scale-100'
      }`} />
      
      {/* Middle ring */}
      <div className={`absolute inset-2 rounded-full transition-all duration-300 ${
        isSpeaking
          ? 'bg-gradient-to-r from-pink-500/30 to-purple-500/30 animate-pulse'
          : isConnected
          ? 'bg-gradient-to-r from-blue-500/30 to-cyan-500/30'
          : 'bg-gray-500/20'
      }`} />
      
      {/* Avatar container */}
      <div className={`relative w-32 h-32 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
        isSpeaking
          ? 'bg-gradient-to-br from-pink-600 to-purple-600 border-pink-400 scale-110'
          : isConnected
          ? 'bg-gradient-to-br from-blue-600 to-cyan-600 border-blue-400 scale-105'
          : 'bg-gradient-to-br from-gray-600 to-gray-700 border-gray-500'
      }`}>
        <Bot className={`w-12 h-12 text-white transition-all duration-300 ${
          isSpeaking ? 'animate-bounce' : ''
        }`} />
      </div>
      
      {/* Speaking indicator dots */}
      {isSpeaking && (
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 bg-pink-400 rounded-full animate-bounce"
              style={{ animationDelay: `${i * 200}ms` }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AgentAvatar;
