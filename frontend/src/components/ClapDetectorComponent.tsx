import React, { useState } from 'react';
import ClapDetector from '../lib/ClapDetector';

const ClapDetectorComponent = () => {
  const [clapTimestamps, setClapTimestamps] = useState<number[]>([]);
  const [isRecording, setIsRecording] = useState(false);

  const handleStartRecording = async () => {
    const clapDetector = new ClapDetector();
    setIsRecording(true);
    const timestamps = await clapDetector.startRecording(5);
    setClapTimestamps(timestamps as number[]);
    setIsRecording(false);
  };

  return (
    <div>
      <button onClick={handleStartRecording} disabled={isRecording}>
        {isRecording ? 'Recording...' : 'Start Recording'}
      </button>
      {clapTimestamps.length > 0 && (
        <div>
          <p>Timestamps: {clapTimestamps.join(', ')}</p>
        </div>
      )}
    </div>
  );
};

export default ClapDetectorComponent;