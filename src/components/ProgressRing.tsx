import React, { useEffect, useState } from "react";

interface ProgressRingProps {
  score: number;
  size?: number;
  strokeWidth?: number;
  labelSize?: "sm" | "md" | "lg";
  subLabel?: string;
  showPercentSign?: boolean;
}

export const ProgressRing: React.FC<ProgressRingProps> = ({
  score,
  size = 64,
  strokeWidth = 6,
  labelSize = "md",
  subLabel,
  showPercentSign = true,
}) => {
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      setAnimatedScore(score);
      return;
    }

    const duration = 750; // 600-800ms ease-out
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic: 1 - Math.pow(1 - progress, 3)
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setAnimatedScore(Math.round(score * easeOut));

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setAnimatedScore(score);
      }
    };

    const animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, [score]);

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (animatedScore / 100) * circumference;

  const fontClasses = {
    sm: "text-xs font-bold",
    md: "text-sm font-bold",
    lg: "text-2xl font-extrabold",
  }[labelSize];

  return (
    <div
      className="relative flex items-center justify-center inline-flex select-none"
      style={{ width: size, height: size }}
      role="progressbar"
      aria-valuenow={score}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={`Match score: ${score}%`}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="transform -rotate-90"
      >
        {/* Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#E5E7EB"
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        {/* Animated Progress */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#38B879"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          fill="transparent"
          style={{
            transition: "stroke-dashoffset 80ms linear",
          }}
        />
      </svg>
      {/* Center Label */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className={`${fontClasses} text-[#142B4A] leading-none`}>
          {animatedScore}
          {showPercentSign && <span className="text-[0.7em] font-semibold">%</span>}
        </span>
        {subLabel && (
          <span className="text-[10px] text-[#142B4A]/70 font-medium tracking-tight mt-0.5">
            {subLabel}
          </span>
        )}
      </div>
    </div>
  );
};
