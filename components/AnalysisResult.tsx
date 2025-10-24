
import React from 'react';
import { AnalysisResult } from '../types';
import ScoreGauge from './ScoreGauge';

interface AnalysisDisplayProps {
  result: AnalysisResult;
}

const AnalysisDisplay: React.FC<AnalysisDisplayProps> = ({ result }) => {
  return (
    <div className="w-full flex flex-col md:flex-row items-center gap-6 p-4">
        <div className="flex-shrink-0">
            <ScoreGauge score={result.score} />
        </div>
        <div className="flex-grow text-center md:text-left">
            <h4 className="text-lg font-bold text-white mb-2">Analysis Summary</h4>
            <p className="text-gray-300 text-sm whitespace-pre-wrap">{result.reasoning}</p>
        </div>
    </div>
  );
};

export default AnalysisDisplay;
