
import React from 'react';

interface ScoreGaugeProps {
  score: number;
}

const ScoreGauge: React.FC<ScoreGaugeProps> = ({ score }) => {
  const normalizedScore = Math.max(0, Math.min(100, score));
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (normalizedScore / 100) * circumference;

  const getColor = (s: number) => {
    if (s >= 80) return 'stroke-green-400';
    if (s >= 60) return 'stroke-yellow-400';
    return 'stroke-red-400';
  };

  const colorClass = getColor(normalizedScore);

  return (
    <div className="relative flex items-center justify-center w-36 h-36">
      <svg className="w-full h-full" viewBox="0 0 120 120">
        <circle
          className="text-gray-700"
          strokeWidth="10"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx="60"
          cy="60"
        />
        <circle
          className={`${colorClass} transition-all duration-1000 ease-out`}
          strokeWidth="10"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx="60"
          cy="60"
          transform="rotate(-90 60 60)"
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center">
        <span className={`text-4xl font-bold ${colorClass.replace('stroke-', 'text-')}`}>{normalizedScore}</span>
        <span className="text-xs text-gray-400">Trust Score</span>
      </div>
    </div>
  );
};

export default ScoreGauge;
