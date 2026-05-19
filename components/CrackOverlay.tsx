"use client";

export default function CrackOverlay() {
  return (
    <div
      aria-hidden="true"
      className="crack-overlay"
      style={{
        position:      "fixed",
        inset:         0,
        zIndex:        50,
        pointerEvents: "none",
        overflow:      "hidden",
        willChange:    "transform",
        transform:     "translateZ(0)",
      }}
    >
      <svg
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: "100%", height: "100%" }}
      >
        <defs>
          <filter id="scratchy" x="-5%" y="-5%" width="110%" height="110%">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" seed="2" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.8" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>

        <g filter="url(#scratchy)" className="scratch-group scratch-0">
          <line x1="20"  y1="80"  x2="180" y2="55"  stroke="white" strokeWidth="0.9" strokeLinecap="round" />
          <line x1="35"  y1="95"  x2="120" y2="85"  stroke="white" strokeWidth="0.5" strokeLinecap="round" />
          <line x1="60"  y1="140" x2="210" y2="110" stroke="white" strokeWidth="0.7" strokeLinecap="round" />
        </g>
        <g filter="url(#scratchy)" className="scratch-group scratch-1">
          <line x1="90"  y1="200" x2="280" y2="170" stroke="white" strokeWidth="1.1" strokeLinecap="round" />
          <line x1="110" y1="220" x2="195" y2="210" stroke="white" strokeWidth="0.4" strokeLinecap="round" />
        </g>
        <g filter="url(#scratchy)" className="scratch-group scratch-2">
          <line x1="0"   y1="380" x2="160" y2="350" stroke="white" strokeWidth="1.3" strokeLinecap="round" />
          <line x1="20"  y1="400" x2="90"  y2="390" stroke="white" strokeWidth="0.5" strokeLinecap="round" />
          <line x1="5"   y1="420" x2="200" y2="400" stroke="white" strokeWidth="0.6" strokeLinecap="round" />
        </g>
        <g filter="url(#scratchy)" className="scratch-group scratch-3">
          <line x1="30"  y1="500" x2="220" y2="470" stroke="white" strokeWidth="0.8" strokeLinecap="round" />
          <line x1="15"  y1="520" x2="130" y2="508" stroke="white" strokeWidth="0.4" strokeLinecap="round" />
        </g>
        <g filter="url(#scratchy)" className="scratch-group scratch-4">
          <line x1="40"  y1="680" x2="260" y2="650" stroke="white" strokeWidth="1.0" strokeLinecap="round" />
          <line x1="60"  y1="700" x2="180" y2="690" stroke="white" strokeWidth="0.5" strokeLinecap="round" />
          <line x1="20"  y1="730" x2="300" y2="710" stroke="white" strokeWidth="0.7" strokeLinecap="round" />
        </g>
        <g filter="url(#scratchy)" className="scratch-group scratch-5">
          <line x1="500" y1="30"  x2="700" y2="15"  stroke="white" strokeWidth="0.9" strokeLinecap="round" />
          <line x1="520" y1="50"  x2="640" y2="40"  stroke="white" strokeWidth="0.5" strokeLinecap="round" />
        </g>
        <g filter="url(#scratchy)" className="scratch-group scratch-6">
          <line x1="600" y1="120" x2="840" y2="95"  stroke="white" strokeWidth="1.2" strokeLinecap="round" />
          <line x1="620" y1="140" x2="740" y2="130" stroke="white" strokeWidth="0.4" strokeLinecap="round" />
          <line x1="580" y1="160" x2="800" y2="148" stroke="white" strokeWidth="0.6" strokeLinecap="round" />
        </g>
        <g filter="url(#scratchy)" className="scratch-group scratch-7">
          <line x1="380" y1="320" x2="560" y2="300" stroke="white" strokeWidth="0.7" strokeLinecap="round" />
          <line x1="400" y1="340" x2="500" y2="332" stroke="white" strokeWidth="0.4" strokeLinecap="round" />
        </g>
        <g filter="url(#scratchy)" className="scratch-group scratch-8">
          <line x1="650" y1="440" x2="860" y2="415" stroke="white" strokeWidth="1.0" strokeLinecap="round" />
          <line x1="670" y1="460" x2="780" y2="450" stroke="white" strokeWidth="0.5" strokeLinecap="round" />
          <line x1="640" y1="480" x2="870" y2="465" stroke="white" strokeWidth="0.6" strokeLinecap="round" />
        </g>
        <g filter="url(#scratchy)" className="scratch-group scratch-9">
          <line x1="420" y1="580" x2="620" y2="555" stroke="white" strokeWidth="0.8" strokeLinecap="round" />
          <line x1="440" y1="600" x2="540" y2="590" stroke="white" strokeWidth="0.4" strokeLinecap="round" />
        </g>
        <g filter="url(#scratchy)" className="scratch-group scratch-10">
          <line x1="1100" y1="60"  x2="1380" y2="35"  stroke="white" strokeWidth="1.1" strokeLinecap="round" />
          <line x1="1120" y1="80"  x2="1280" y2="68"  stroke="white" strokeWidth="0.5" strokeLinecap="round" />
          <line x1="1090" y1="105" x2="1350" y2="88"  stroke="white" strokeWidth="0.7" strokeLinecap="round" />
        </g>
        <g filter="url(#scratchy)" className="scratch-group scratch-11">
          <line x1="1200" y1="190" x2="1430" y2="165" stroke="white" strokeWidth="0.9" strokeLinecap="round" />
          <line x1="1220" y1="210" x2="1340" y2="200" stroke="white" strokeWidth="0.4" strokeLinecap="round" />
        </g>
        <g filter="url(#scratchy)" className="scratch-group scratch-12">
          <line x1="1050" y1="350" x2="1300" y2="325" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
          <line x1="1080" y1="375" x2="1200" y2="362" stroke="white" strokeWidth="0.5" strokeLinecap="round" />
          <line x1="1040" y1="395" x2="1320" y2="378" stroke="white" strokeWidth="0.6" strokeLinecap="round" />
        </g>
        <g filter="url(#scratchy)" className="scratch-group scratch-13">
          <line x1="1150" y1="490" x2="1420" y2="468" stroke="white" strokeWidth="0.8" strokeLinecap="round" />
          <line x1="1170" y1="510" x2="1310" y2="498" stroke="white" strokeWidth="0.4" strokeLinecap="round" />
        </g>
        <g filter="url(#scratchy)" className="scratch-group scratch-14">
          <line x1="1000" y1="640" x2="1250" y2="615" stroke="white" strokeWidth="1.0" strokeLinecap="round" />
          <line x1="1020" y1="660" x2="1160" y2="648" stroke="white" strokeWidth="0.5" strokeLinecap="round" />
          <line x1="990"  y1="680" x2="1270" y2="664" stroke="white" strokeWidth="0.7" strokeLinecap="round" />
        </g>
        <g filter="url(#scratchy)" className="scratch-group scratch-15">
          <line x1="280"  y1="250" x2="600"  y2="220" stroke="white" strokeWidth="0.6" strokeLinecap="round" />
          <line x1="300"  y1="270" x2="480"  y2="258" stroke="white" strokeWidth="0.3" strokeLinecap="round" />
        </g>
        <g filter="url(#scratchy)" className="scratch-group scratch-16">
          <line x1="800"  y1="720" x2="1100" y2="695" stroke="white" strokeWidth="0.9" strokeLinecap="round" />
          <line x1="820"  y1="740" x2="1000" y2="728" stroke="white" strokeWidth="0.4" strokeLinecap="round" />
          <line x1="790"  y1="758" x2="1080" y2="742" stroke="white" strokeWidth="0.6" strokeLinecap="round" />
        </g>
        <g filter="url(#scratchy)" className="scratch-group scratch-17">
          <line x1="160"  y1="800" x2="440"  y2="775" stroke="white" strokeWidth="1.0" strokeLinecap="round" />
          <line x1="180"  y1="820" x2="320"  y2="810" stroke="white" strokeWidth="0.4" strokeLinecap="round" />
        </g>
      </svg>
    </div>
  );
}