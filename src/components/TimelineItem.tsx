import React from "react";

const TimelineItem: React.FC<{ year: number }> = ({ year }) => (
  <div style={{ display: "flex", alignItems: "center" }}>
    <div style={{ position: "relative", marginRight: 24 }}>
      {/* Blue vertical line */}
      <div
        style={{
          width: 4,
          height: 120, // Adjust height as needed
          background: "#2196f3",
          borderRadius: 2,
          position: "relative",
        }}
      />
      {/* Dot */}
      <div
        style={{
          width: 24,
          height: 24,
          background: "#fff",
          border: "2px solid #ccc",
          borderRadius: "50%",
          position: "absolute",
          left: "50%",
          top: 48, // Adjust to center the dot on the line
          transform: "translate(-50%, -50%)",
          zIndex: 1,
        }}
      />
    </div>
    {/* Year */}
    <span
      style={{
        color: "#000",
        fontWeight: "bold",
        fontSize: 48,
        fontFamily: "inherit",
      }}
    >
      {year}
    </span>
  </div>
);

export default TimelineItem; 