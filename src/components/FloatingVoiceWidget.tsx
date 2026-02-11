// import React, { useState, useEffect } from 'react';
// import { useConversation } from '@elevenlabs/react';
// import { Mic, MicOff, X, Minimize2, Globe, MessageCircle } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { Card } from '@/components/ui/card';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import { useToast } from '@/hooks/use-toast';

// // Props interface for FloatingVoiceWidget component
// interface FloatingVoiceWidgetProps {
//   onVoiceStateChange?: (isOpen: boolean) => void;
// }

// const FloatingVoiceWidget = ({ onVoiceStateChange }: FloatingVoiceWidgetProps = {}) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [isMinimized, setIsMinimized] = useState(false);
//   const [isConnected, setIsConnected] = useState(false);
//   const [hasPermission, setHasPermission] = useState(false);
//   const [selectedLanguage, setSelectedLanguage] = useState('en');
//   const { toast } = useToast();

//   // Get Agent ID from environment
//   const agentId = import.meta.env.VITE_ELEVENLABS_AGENT_ID;

//   const languages = [
//     { code: 'en', name: 'English' },
//     { code: 'ta', name: 'Tamil' },
//     { code: 'hi', name: 'Hindi' }
//   ];

//   const conversation = useConversation({
//     onConnect: () => {
//       console.log('Connected to conversation');
//       setIsConnected(true);
//       toast({
//         title: "Connected",
//         description: "Voice assistant is ready!",
//       });
//     },
//     onDisconnect: () => {
//       console.log('Disconnected from conversation');
//       setIsConnected(false);
//       toast({
//         title: "Disconnected",
//         description: "Voice conversation ended.",
//       });
//     },
//     onMessage: (message) => {
//       console.log('Message received:', message);
//     },
//     onError: (error) => {
//       console.error('Conversation error:', error);
//       toast({
//         title: "Error",
//         description: "Something went wrong with the conversation.",
//         variant: "destructive",
//       });
//     },
//     overrides: {
//       agent: {
//         language: selectedLanguage as any,
//       },
//     },
//   });

//   const { status, isSpeaking } = conversation;

//   // Reset speaking state when disconnected
//   const effectiveIsSpeaking = isConnected && isSpeaking;

//   useEffect(() => {
//     checkMicrophonePermission();
//   }, []);

//   // Notify parent component when voice widget state changes
//   useEffect(() => {
//     onVoiceStateChange?.(isOpen);
//   }, [isOpen, onVoiceStateChange]);

//   const checkMicrophonePermission = async () => {
//     try {
//       await navigator.mediaDevices.getUserMedia({ audio: true });
//       setHasPermission(true);
//     } catch (error) {
//       console.error('Microphone permission denied:', error);
//       setHasPermission(false);
//     }
//   };

//   const startConversation = async () => {
//     if (!hasPermission) {
//       await requestMicrophonePermission();
//       return;
//     }

//     if (!agentId?.trim()) {
//       toast({
//         title: "Agent ID Missing",
//         description: "Please set VITE_ELEVENLABS_AGENT_ID in your .env file.",
//         variant: "destructive",
//       });
//       return;
//     }

//     try {
//       await conversation.startSession({
//         agentId: agentId.trim(),
//       });
//     } catch (error) {
//       console.error('Failed to start conversation:', error);
//       toast({
//         title: "Connection Failed",
//         description: "Failed to start conversation. Check your Agent ID in .env file.",
//         variant: "destructive",
//       });
//     }
//   };

//   const endConversation = async () => {
//     try {
//       console.log('Attempting to end conversation...');
//       await conversation.endSession();
//       setIsConnected(false);
//       console.log('Conversation ended successfully');
//     } catch (error) {
//       console.error('Failed to end conversation:', error);
//       // Force disconnect if there's an error
//       setIsConnected(false);
//     }
//   };

//   const requestMicrophonePermission = async () => {
//     try {
//       await navigator.mediaDevices.getUserMedia({ audio: true });
//       setHasPermission(true);
//       toast({
//         title: "Permission Granted",
//         description: "Microphone access enabled!",
//       });
//     } catch (error) {
//       toast({
//         title: "Permission Required",
//         description: "Microphone access is needed for voice chat.",
//         variant: "destructive",
//       });
//     }
//   };

//   const SiriOrb = ({ size = 'large', isSpeaking, isConnected }) => {
//     const isLarge = size === 'large';
//     // Match chatbot button sizes exactly: w-14 h-14 sm:w-16 sm:h-16
//     const orbSize = isLarge ? 'w-24 h-24' : 'w-14 h-14 sm:w-16 sm:h-16';
//     // Match chatbot icon sizes exactly: h-6 w-6 sm:h-7 sm:w-7
//     const iconSize = isLarge ? 'w-10 h-10' : 'w-6 h-6 sm:w-7 sm:h-7';

//     return (
//       <div className="relative flex items-center justify-center">
//         {isSpeaking && (
//           <>
//             <div className="absolute inset-0 rounded-full border-4 border-white animate-ping opacity-75"
//               style={{
//                 animationDuration: '1s',
//                 transform: 'scale(1.8)'
//               }} />
//             <div className="absolute inset-0 rounded-full border-3 border-white animate-pulse opacity-60"
//               style={{
//                 animationDuration: '1.5s',
//                 transform: 'scale(1.5)'
//               }} />
//             <div className="absolute inset-0 rounded-full border-2 border-white animate-ping opacity-50"
//               style={{
//                 animationDuration: '2s',
//                 transform: 'scale(2.2)'
//               }} />
//           </>
//         )}

//         <div className={`absolute inset-0 rounded-full transition-all duration-500 ${isSpeaking
//           ? 'bg-white/30 animate-pulse scale-125'
//           : isConnected
//             ? 'bg-white/20 scale-110'
//             : 'bg-white/10 scale-100'
//           }`} />

//         <div className={`relative ${orbSize} rounded-full flex items-center justify-center transition-all duration-500 ${isSpeaking
//           ? 'bg-gray-600 scale-110 shadow-2xl shadow-gray-500/50'
//           : isConnected
//             ? 'bg-gray-600 scale-105 shadow-xl shadow-gray-500/30'
//             : 'bg-gray-600 shadow-lg'
//           }`}>
//           <div className="absolute inset-0 flex items-center justify-center">
//             <Mic className={`${iconSize} text-white transition-all duration-300 ${isSpeaking ? 'animate-bounce' : ''
//               }`} />
//           </div>
//         </div>

//         {isSpeaking && (
//           <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full mt-4">
//             <div className="flex items-end justify-center gap-1">
//               {[...Array(7)].map((_, i) => (
//                 <div
//                   key={i}
//                   className="bg-gradient-to-t from-pink-400 to-purple-400 rounded-full"
//                   style={{
//                     width: '3px',
//                     height: `${Math.sin(Date.now() / 200 + i * 0.8) * 15 + 20}px`,
//                     animation: `siriWave 0.8s ease-in-out infinite`,
//                     animationDelay: `${i * 0.1}s`
//                   }}
//                 />
//               ))}
//             </div>
//           </div>
//         )}

//         {isConnected && !isSpeaking && (
//           <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 flex gap-1">
//             {[0, 1, 2].map((i) => (
//               <div
//                 key={i}
//                 className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"
//                 style={{ animationDelay: `${i * 200}ms` }}
//               />
//             ))}
//           </div>
//         )}
//       </div>
//     );
//   };

//   if (!isOpen) {
//     return (
//       <div className="voice-widget-button fixed bottom-20 right-6 sm:bottom-28 sm:right-6 z-[150]">
//         <button
//           onClick={() => setIsOpen(true)}
//           className="w-14 h-14 sm:w-16 sm:h-16 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center group touch-manipulation cursor-pointer relative bg-gray-600 hover:bg-gray-700"
//           style={{
//             pointerEvents: 'auto',
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//             padding: '0'
//           }}
//         >
//           <Mic
//             className="h-6 w-6 sm:h-7 sm:w-7 text-white group-hover:scale-105 transition-transform duration-200"
//             style={{
//               display: 'block',
//               margin: '0 auto',
//               position: 'relative',
//               top: '0',
//               left: '0',
//               transform: 'translate(0, 0)'
//             }}
//           />
//         </button>
//       </div>
//     );
//   }

//   if (isMinimized) {
//     return (
//       <div className="voice-widget-minimized fixed bottom-20 right-6 sm:bottom-28 sm:right-6 z-[150]">
//         <Card className="bg-black/80 backdrop-blur-xl border-white/20 p-4 shadow-2xl">
//           <div className="flex items-center gap-3">
//             <SiriOrb size="small" isSpeaking={effectiveIsSpeaking} isConnected={isConnected} />

//             <div className="flex gap-2">
//               <Button
//                 size="sm"
//                 variant="ghost"
//                 onClick={() => setIsMinimized(false)}
//                 className="text-white/70 hover:text-white hover:bg-white/10"
//               >
//                 <Minimize2 className="w-4 h-4" />
//               </Button>
//               <Button
//                 size="sm"
//                 variant="ghost"
//                 onClick={() => setIsOpen(false)}
//                 className="text-white/70 hover:text-white hover:bg-white/10"
//               >
//                 <X className="w-4 h-4" />
//               </Button>
//             </div>
//           </div>
//         </Card>
//       </div>
//     );
//   }

//   return (
//     <div className="fixed inset-2 sm:inset-auto sm:bottom-24 sm:right-6 sm:top-auto z-[160] sm:w-96 sm:h-[500px] md:w-[400px] md:h-[550px]">
//       <div className="relative w-full h-full bg-gray-900 rounded-lg sm:rounded-xl overflow-hidden shadow-2xl border border-blue-500/30 backdrop-blur-sm">
//         {/* Voice Chat Header - matching chatbot style */}
//         <div className="p-4 sm:p-4 bg-blue-900 border-b border-blue-500/30 flex justify-between items-center">
//           <div className="flex items-center">
//             <div className="w-8 h-8 sm:w-8 sm:h-8 rounded-full bg-blue-500 flex items-center justify-center mr-3 sm:mr-3">
//               <Mic className="h-4 w-4 sm:h-4 sm:w-4 text-white" />
//             </div>
//             <div>
//               <h3 className="text-white font-medium text-base sm:text-lg">Voice Assistant</h3>
//               <p className="text-blue-200 text-xs sm:text-sm">AI-powered voice chat</p>
//             </div>
//           </div>
//           <button
//             onClick={() => setIsOpen(false)}
//             className="text-white/70 hover:text-white hover:bg-white/10 p-2 rounded-full transition-colors"
//             aria-label="Close voice assistant"
//           >
//             <X className="h-5 w-5 sm:h-5 sm:w-5" />
//           </button>
//         </div>

//         {/* Voice Chat Content - matching chatbot layout */}
//         <div className="flex flex-col h-[calc(100%-80px)] sm:h-[calc(100%-72px)]">
//           <div className="flex-1 p-4 sm:p-6 flex flex-col items-center justify-center space-y-6">
//             {/* Voice Orb */}
//             <div className="flex justify-center">
//               <SiriOrb size="large" isSpeaking={effectiveIsSpeaking} isConnected={isConnected} />
//             </div>

//             {/* Status Indicator */}
//             <div className="text-center">
//               <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${status === 'connected'
//                 ? 'bg-green-500/20 text-green-400 border border-green-500/30'
//                 : 'bg-gray-500/20 text-gray-400 border border-gray-500/30'
//                 }`}>
//                 <div className={`w-2 h-2 rounded-full ${status === 'connected' ? 'bg-green-400 animate-pulse' : 'bg-gray-400'
//                   }`} />
//                 {effectiveIsSpeaking ? 'Speaking...' : status === 'connected' ? 'Listening' : 'Disconnected'}
//               </div>
//             </div>

//           </div>

//           {/* Bottom Controls Area - matching chatbot style */}
//           <div className="border-t border-blue-500/30 bg-gray-900 p-4 sm:p-6">
//             <div className="space-y-4">
//               {/* Language Selection */}
//               <div className="space-y-2">
//                 <label className="text-white/70 text-sm flex items-center gap-2">
//                   <Globe className="w-4 h-4" />
//                   Language
//                 </label>
//                 <select
//                   value={selectedLanguage}
//                   onChange={(e) => setSelectedLanguage(e.target.value)}
//                   disabled={isConnected}
//                   className="w-full bg-black/60 border border-blue-500/40 text-white text-base focus:outline-none focus:border-blue-400 transition-colors rounded-md"
//                   style={{
//                     height: '56px',
//                     fontSize: '16px',
//                     padding: '0 16px',
//                     touchAction: 'manipulation',
//                     appearance: 'none',
//                     backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
//                     backgroundPosition: 'right 12px center',
//                     backgroundRepeat: 'no-repeat',
//                     backgroundSize: '16px',
//                     paddingRight: '40px'
//                   }}
//                 >
//                   {languages.map((lang) => (
//                     <option
//                       key={lang.code}
//                       value={lang.code}
//                       className="bg-gray-900 text-white"
//                       style={{
//                         fontSize: '16px',
//                         padding: '12px'
//                       }}
//                     >
//                       {lang.name}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <Button
//                 onClick={isConnected ? endConversation : startConversation}
//                 disabled={!hasPermission && !isConnected}
//                 className={`w-full h-14 sm:h-10 text-lg sm:text-base font-medium touch-manipulation rounded-lg transition-all duration-300 ${isConnected
//                   ? 'bg-red-600 hover:bg-red-700'
//                   : 'bg-blue-600 hover:bg-blue-700'
//                   }`}
//               >
//                 {isConnected ? (
//                   <>
//                     <MicOff className="w-4 h-4 mr-2" />
//                     End Conversation
//                   </>
//                 ) : (
//                   <>
//                     <Mic className="w-4 h-4 mr-2" />
//                     Start Conversation
//                   </>
//                 )}
//               </Button>
//             </div>
//           </div>
//         </div>
//       </div>

//       <style>{`
//         @keyframes siriWave {
//           0%, 100% { transform: scaleY(1); }
//           50% { transform: scaleY(2); }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default FloatingVoiceWidget;