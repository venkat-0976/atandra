
// import React from 'react';

// interface VoiceVisualizerProps {
//   isSpeaking: boolean;
//   isListening: boolean;
// }

// const VoiceVisualizer: React.FC<VoiceVisualizerProps> = ({ isSpeaking, isListening }) => {
//   const bars = Array.from({ length: 32 }, (_, i) => i);

//   return (
//     <div className="flex items-center justify-center h-32 bg-black/20 rounded-xl backdrop-blur-sm border border-white/10">
//       <div className="flex items-end justify-center gap-1 h-20">
//         {bars.map((bar) => (
//           <div
//             key={bar}
//             className={`w-1 bg-gradient-to-t transition-all duration-150 rounded-full ${isSpeaking
//                 ? 'from-pink-500 to-purple-500 animate-pulse'
//                 : isListening
//                   ? 'from-blue-500 to-cyan-500'
//                   : 'from-gray-500 to-gray-400'
//               }`}
//             style={{
//               height: isSpeaking
//                 ? `${Math.random() * 60 + 20}px`
//                 : isListening
//                   ? `${Math.sin(Date.now() / 200 + bar * 0.5) * 15 + 25}px`
//                   : '8px',
//               animationDelay: isSpeaking ? `${bar * 50}ms` : '0ms',
//               animationDuration: isSpeaking ? '200ms' : isListening ? '1000ms' : '0ms',
//             }}
//           />
//         ))}
//       </div>

//       {/* Center pulse effect */}
//       <div className="absolute">
//         <div className={`w-16 h-16 rounded-full border-2 transition-all duration-300 ${isSpeaking
//             ? 'border-pink-500 animate-ping'
//             : isListening
//               ? 'border-blue-500 animate-pulse'
//               : 'border-gray-500/50'
//           }`} />
//       </div>
//     </div>
//   );
// };

// export default VoiceVisualizer;
