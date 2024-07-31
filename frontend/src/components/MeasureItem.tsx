import Measure from "../lib/Measure";
import ScoreComponent from "./ScoreComponent";
import { useState } from 'react';
import { ClapDetector } from "../lib/ClapDetector";

interface MeasureItemProps {
  measure: Measure;
  id: number; // Add key as a prop
  points: number;
  setPoints: (score: number) => void;
}


const MeasureItem: React.FC<MeasureItemProps> = ({ measure, id, points, setPoints}) => {
  const [isStarted, setIsStarted] = useState(false);

  const playBeat = (bpm: number, beats: number) => {
    return new Promise<void>((resolve) => {
      const audioCtx = new AudioContext();
      const gainNode = audioCtx.createGain();
      gainNode.connect(audioCtx.destination);
  
      const beatDuration = 60 / bpm;
      const startTime = audioCtx.currentTime;
  
      for (let i = 0; i < beats; i++) {
        const osc = audioCtx.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(440, startTime + i * beatDuration); // A4 tone for the beat
        osc.connect(gainNode);
  
        osc.start(startTime + i * beatDuration);
        osc.stop(startTime + i * beatDuration + 0.1); // Each beat lasts 0.1 seconds
      }
  
      setTimeout(() => {
        console.log('Beat done');
        resolve();
      }, beats * beatDuration * 1000);
    });
  };
  
  const handleStart = async () => {
    const bpm = measure.getBpm();
    const beats = measure.getTimeSignatureBeats(); // can implement a screen changing thing here
    await playBeat(bpm, beats);  
      
    // then record 
    const clapDetector = new ClapDetector();

    await clapDetector.startRecording(measure.getDuration());

    const accuracy = clapDetector.getAccuracy(measure);

    // then call the test method to see whether it matches

    // turn off the button here

    //setPoints(points + measure.getPoints()); // replace this with score calculated by the method
    setPoints(accuracy * 100); // replace this with score calculated by the method
    setIsStarted(true);
    console.log(isStarted)
  }

  return ( 
    <>
      <div className='measureItem'>
        <div className='measureInfo'>
          <p className='measureField'>{measure.getPoints()} points</p>
          <p className='measureField'>{measure.getCategory()}</p>
          <p className='measureField'>{measure.getBpm()} bpm</p>
        </div>
        <ScoreComponent notes={measure.getScore()} timeSignature={measure.getTimeSignatureString()} id={id}/>
        {isStarted ? (
          <p>Points awarded: {points}</p> // replace this with points calculated
        ) : (
          <button onClick={handleStart}>Start</button>
        )}
      </div>
    </>
  )
}

export default MeasureItem;