// components/LoveAnimation.tsx
"use client";
import { useEffect, useRef } from "react";

export default function LoveAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    container.innerHTML = "";
    const N = 100;
    for (let i = 1; i <= N; i++) {
      const love = document.createElement("div");
      love.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        margin: -225px 0 0 -225px;
      `;
      love.innerHTML = `
        <div style="animation: loveHorig 10000ms infinite alternate ease-in-out; animation-delay: ${i * -300}ms;">
          <div style="animation: loveVorig 20000ms infinite linear; animation-delay: ${i * -300}ms;">
            <div style="
              color: #ea80b0;
              font-size: 1.4rem;
              transform: translateY(-100%) rotateZ(-30deg);
              text-shadow: 0 0 10px #fff;
              letter-spacing: 2px;
              white-space: nowrap;
              font-family: monospace;
            ">i love nasgor</div>
          </div>
        </div>
      `;
      container.appendChild(love);
    }
  }, []);

  return (
    <>
      <style>{`
        @keyframes loveHorig {
          from { transform: translateX(0px); }
          to   { transform: translateX(450px); }
        }
        @keyframes loveVorig {
          0%    { transform: translateY(180px); }
          10%   { transform: translateY(45px); }
          15%   { transform: translateY(4.5px); }
          18%   { transform: translateY(0px); }
          20%   { transform: translateY(4.5px); }
          22%   { transform: translateY(34.61538px); }
          24%   { transform: translateY(64.28571px); }
          25%   { transform: translateY(112.5px); }
          26%   { transform: translateY(64.28571px); }
          28%   { transform: translateY(34.61538px); }
          30%   { transform: translateY(4.5px); }
          32%   { transform: translateY(0px); }
          35%   { transform: translateY(4.5px); }
          40%   { transform: translateY(45px); }
          50%   { transform: translateY(180px); }
          71%   { transform: translateY(428.57143px); }
          72.5% { transform: translateY(441.17647px); }
          75%   { transform: translateY(450px); }
          77.5% { transform: translateY(441.17647px); }
          79%   { transform: translateY(428.57143px); }
          100%  { transform: translateY(180px); }
        }
      `}</style>

      {/* outer: 450*0.35=157.5 wide + translateX*0.35=157.5 = ~315 total, height 450*0.35=157 */}
      <div style={{
        width: 320,
        height: 290,
        overflow: "hidden",
        position: "relative",
        margin: "0 auto",
      }}>
        <div
          ref={containerRef}
          style={{
            position: "absolute",
            top: "-60px",
            left: "-80px",
            width: 450,
            height: 450,
            transform: "scale(0.25)",
            transformOrigin: "center center",
          }}
        />
      </div>
    </>
  );
}