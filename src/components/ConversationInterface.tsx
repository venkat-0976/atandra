
import React, { useState, useEffect } from 'react';
import { useConversation } from '@elevenlabs/react';
import { Mic, MicOff, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import VoiceVisualizer from './VoiceVisualizer';
import AgentAvatar from './AgentAvatar';
import { useToast } from '@/hooks/use-toast';

const ConversationInterface = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [volume, setVolume] = useState([0.8]);
  const [hasPermission, setHasPermission] = useState(false);
  const { toast } = useToast();

  // Get Agent ID from environment
  const agentId = import.meta.env.VITE_ELEVENLABS_AGENT_ID;

  const conversation = useConversation({
    onConnect: () => {
      console.log('Connected to conversation');
      setIsConnected(true);
      toast({
        title: "Connected",
        description: "Voice conversation started successfully!",
      });
    },
    onDisconnect: () => {
      console.log('Disconnected from conversation');
      setIsConnected(false);
      toast({
        title: "Disconnected",
        description: "Voice conversation ended.",
      });
    },
    onMessage: (message) => {
      console.log('Message received:', message);
    },
    onError: (error) => {
      console.error('Conversation error:', error);
      toast({
        title: "Error",
        description: "Something went wrong with the conversation.",
        variant: "destructive",
      });
    },
  });

  const { status, isSpeaking } = conversation;
  
  // Reset speaking state when disconnected
  const effectiveIsSpeaking = isConnected && isSpeaking;

  useEffect(() => {
    checkMicrophonePermission();
  }, []);

  const checkMicrophonePermission = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      setHasPermission(true);
    } catch (error) {
      console.error('Microphone permission denied:', error);
      setHasPermission(false);
    }
  };

  const requestMicrophonePermission = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      setHasPermission(true);
      toast({
        title: "Permission Granted",
        description: "Microphone access enabled successfully!",
      });
    } catch (error) {
      toast({
        title: "Permission Denied",
        description: "Microphone access is required for voice conversation.",
        variant: "destructive",
      });
    }
  };

  const startConversation = async () => {
    if (!hasPermission) {
      await requestMicrophonePermission();
      return;
    }

    if (!agentId?.trim()) {
      toast({
        title: "Agent ID Missing",
        description: "Please set VITE_ELEVENLABS_AGENT_ID in your .env file.",
        variant: "destructive",
      });
      return;
    }

    try {
      await conversation.startSession({ agentId: agentId.trim() });
    } catch (error) {
      console.error('Failed to start conversation:', error);
      toast({
        title: "Connection Failed",
        description: "Failed to start conversation. Check your Agent ID.",
        variant: "destructive",
      });
    }
  };

  const endConversation = async () => {
    try {
      await conversation.endSession();
    } catch (error) {
      console.error('Failed to end conversation:', error);
    }
  };

  const handleVolumeChange = async (newVolume: number[]) => {
    setVolume(newVolume);
    if (isConnected) {
      await conversation.setVolume({ volume: newVolume[0] });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl mx-auto">
        {/* Main Card */}
        <Card className="bg-white/10 backdrop-blur-lg border-white/20 p-8 shadow-2xl">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              AI Voice Assistant
            </h1>
            <p className="text-white/70 text-lg">
              Experience natural conversations with advanced AI
            </p>
          </div>

          {/* Agent Avatar */}
          <div className="flex justify-center mb-8">
            <AgentAvatar isSpeaking={effectiveIsSpeaking} isConnected={isConnected} />
          </div>

          {/* Voice Visualizer */}
          <div className="mb-8">
            <VoiceVisualizer isSpeaking={effectiveIsSpeaking} isListening={isConnected && !effectiveIsSpeaking} />
          </div>

          {/* Status Indicator */}
          <div className="text-center mb-6">
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${
              status === 'connected' 
                ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                : 'bg-gray-500/20 text-gray-400 border border-gray-500/30'
            }`}>
              <div className={`w-2 h-2 rounded-full ${
                status === 'connected' ? 'bg-green-400 animate-pulse' : 'bg-gray-400'
              }`} />
              {effectiveIsSpeaking ? 'Speaking...' : status === 'connected' ? 'Listening' : 'Disconnected'}
            </div>
          </div>

          {/* Controls */}
          <div className="flex flex-col items-center gap-6">
            {/* Main Action Button */}
            <Button
              onClick={isConnected ? endConversation : startConversation}
              disabled={!hasPermission && isConnected}
              className={`w-20 h-20 rounded-full text-white border-2 transition-all duration-300 ${
                isConnected
                  ? 'bg-red-500/20 border-red-500 hover:bg-red-500/30 hover:scale-105'
                  : 'bg-blue-500/20 border-blue-500 hover:bg-blue-500/30 hover:scale-105'
              }`}
            >
              {isConnected ? (
                <MicOff className="w-8 h-8" />
              ) : (
                <Mic className="w-8 h-8" />
              )}
            </Button>

            {!hasPermission && !isConnected && (
              <p className="text-white/70 text-sm text-center max-w-sm">
                Microphone access is required for voice conversation. Click the button above to grant permission.
              </p>
            )}

            {/* Volume Control */}
            <div className="flex items-center gap-4 w-full max-w-sm">
              <VolumeX className="w-5 h-5 text-white/60" />
              <Slider
                value={volume}
                onValueChange={handleVolumeChange}
                max={1}
                step={0.1}
                className="flex-1"
              />
              <Volume2 className="w-5 h-5 text-white/60" />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ConversationInterface;
