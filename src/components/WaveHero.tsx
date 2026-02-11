const WaveHero = () => {
  return (
    <div className="absolute bottom-0 left-0 w-full h-40 z-10" style={{ pointerEvents: 'none', overflow: 'hidden' }}>
      {/* Wave 1 - Darkest */}
      <div className="absolute bottom-0 left-0 w-full">
        <svg
          className="relative block w-[300%] h-40 animate-wave"
          viewBox="0 0 1800 140"
          preserveAspectRatio="none"
        >
          <path
            d="M0,40 C120,100 280,0 420,50 C560,110 720,10 860,60 C1000,120 1160,5 1300,45 C1440,95 1600,15 1740,55 C1880,105 2040,0 2180,50 C2320,100 2480,10 2620,60 C2760,120 2920,5 3060,45 L3060,140 L0,140 Z"
            fill="hsl(var(--wave-primary))"
          />
        </svg>
      </div>

      {/* Wave 2 - Medium */}
      <div className="absolute bottom-0 left-0 w-full">
        <svg
          className="relative block w-[300%] h-36 animate-wave-slow"
          viewBox="0 0 1800 130"
          preserveAspectRatio="none"
        >
          <path
            d="M0,70 C160,130 320,20 480,75 C640,135 800,25 960,80 C1120,140 1280,30 1440,85 C1600,145 1760,35 1920,90 C2080,150 2240,40 2400,95 C2560,155 2720,45 2880,100 L2880,130 L0,130 Z"
            fill="hsl(var(--wave-secondary))"
          />
        </svg>
      </div>

      {/* Wave 3 - Light */}
      <div className="absolute bottom-0 left-0 w-full">
        <svg
          className="relative block w-[300%] h-32 animate-wave-fast"
          viewBox="0 0 1800 125"
          preserveAspectRatio="none"
        >
          <path
            d="M0,85 C140,145 300,35 460,90 C620,150 780,40 940,95 C1100,155 1260,45 1420,100 C1580,160 1740,50 1900,105 C2060,165 2220,55 2380,110 C2540,170 2700,60 2860,115 L2860,125 L0,125 Z"
            fill="hsl(var(--wave-light))"
          />
        </svg>
      </div>

      {/* Wave 4 - Lightest */}
      <div className="absolute bottom-0 left-0 w-full">
        <svg
          className="relative block w-[300%] h-28 animate-wave"
          viewBox="0 0 1800 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,95 C180,155 360,45 540,100 C720,160 900,50 1080,105 C1260,165 1440,55 1620,110 C1800,170 1980,60 2160,115 C2340,175 2520,65 2700,120 L2700,120 L0,120 Z"
            fill="hsl(var(--wave-lightest))"
          />
        </svg>
      </div>
    </div>
  );
};

export default WaveHero;