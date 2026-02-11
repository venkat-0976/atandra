"use client";

import React from "react";
import Image from "next/image";

interface MapProps {
  dots?: Array<{
    start: { lat: number; lng: number; label?: string };
    end: { lat: number; lng: number; label?: string };
  }>;
  lineColor?: string;
  mapImageUrl: string; // Firebase image URL
}

const WorldMap = ({ dots = [], lineColor = "#1e40af", mapImageUrl }) => {
  // Function to convert lat/lng to x/y coordinates
  const projectPoint = (lat, lng) => {
    const x = (lng + 180) * (1000 / 360);
    const y = (90 - lat) * (500 / 180);
    return { x, y };
  };

  return (
    <div className="relative w-full h-full overflow-hidden rounded-lg">
      {/* World map image from Firebase */}
      <div className="absolute inset-0 w-full h-full">
        <Image 
          src={"https://firebasestorage.googleapis.com/v0/b/atandra.firebasestorage.app/o/Atandraimages%2Fworld%20map%20krykard%20.jpg?alt=media&token=77cd239f-f2f8-4f70-8a2f-6006c2dc60f3?raw=true"} 
          alt="World Map" 
          fill 
          style={{ objectFit: 'cover' }}
          priority
        />
      </div>
      
      {/* SVG overlay for connection lines and dots */}
      <svg 
        width="100%" 
        height="100%" 
        viewBox="0 0 1000 500" 
        preserveAspectRatio="xMidYMid meet"
        className="absolute inset-0 z-10"
      >
        {/* Connection lines and dots */}
        {dots.map((connection, index) => {
          const startPoint = projectPoint(connection.start.lat, connection.start.lng);
          const endPoint = projectPoint(connection.end.lat, connection.end.lng);
          
          // Calculate control point for curved lines
          const dx = endPoint.x - startPoint.x;
          const dy = endPoint.y - startPoint.y;
          const controlX = startPoint.x + dx / 2;
          const controlY = startPoint.y + dy / 2 - 30; // Curve upward
          
          return (
            <g key={index}>
              {/* Curved connection line with dashed effect */}
              <path
                d={`M ${startPoint.x},${startPoint.y} Q ${controlX},${controlY} ${endPoint.x},${endPoint.y}`}
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeDasharray="5,5"
                opacity="0.7"
              />
              
              {/* End point marker (location pin) */}
              <g transform={`translate(${endPoint.x - 6}, ${endPoint.y - 12})`}>
                <path 
                  d="M6,0 C2.7,0 0,2.7 0,6 C0,10.5 6,18 6,18 C6,18 12,10.5 12,6 C12,2.7 9.3,0 6,0 Z M6,8.3 C4.7,8.3 3.7,7.3 3.7,6 C3.7,4.7 4.7,3.7 6,3.7 C7.3,3.7 8.3,4.7 8.3,6 C8.3,7.3 7.3,8.3 6,8.3 Z" 
                  fill="white"
                />
              </g>
              
              {/* Pulsing animation for end points */}
              <circle 
                cx={endPoint.x} 
                cy={endPoint.y} 
                r="2" 
                fill="white" 
                opacity="0.5"
              >
                <animate
                  attributeName="r"
                  from="2"
                  to="8"
                  dur="1.5s"
                  begin="0s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  from="0.5"
                  to="0"
                  dur="1.5s"
                  begin="0s"
                  repeatCount="indefinite"
                />
              </circle>
            </g>
          );
        })}
        
        {/* Center point marker (India) */}
        <g transform={`translate(${projectPoint(dots[0].start.lat, dots[0].start.lng).x - 6}, ${projectPoint(dots[0].start.lat, dots[0].start.lng).y - 12})`}>
          <path 
            d="M6,0 C2.7,0 0,2.7 0,6 C0,10.5 6,18 6,18 C6,18 12,10.5 12,6 C12,2.7 9.3,0 6,0 Z M6,8.3 C4.7,8.3 3.7,7.3 3.7,6 C3.7,4.7 4.7,3.7 6,3.7 C7.3,3.7 8.3,4.7 8.3,6 C8.3,7.3 7.3,8.3 6,8.3 Z" 
            fill="white" 
            stroke={lineColor}
            strokeWidth="1"
          />
        </g>
        
        {/* Pulsing animation for center point */}
        <circle 
          cx={projectPoint(dots[0].start.lat, dots[0].start.lng).x} 
          cy={projectPoint(dots[0].start.lat, dots[0].start.lng).y} 
          r="3" 
          fill="white" 
          opacity="0.5"
        >
          <animate
            attributeName="r"
            from="3"
            to="12"
            dur="1.5s"
            begin="0s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            from="0.5"
            to="0"
            dur="1.5s"
            begin="0s"
            repeatCount="indefinite"
          />
        </circle>
      </svg>
    </div>
  );
};

export default WorldMap;