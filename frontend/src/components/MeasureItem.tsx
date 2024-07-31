import Measure from "../lib/Measure";
import ScoreComponent from "./ScoreComponent";

interface MeasureItemProps {
  measure: Measure;
  id: number; // Add key as a prop
}


const MeasureItem: React.FC<MeasureItemProps> = ({ measure, id }) => {
  const playBeat = (bpm: number, beats: number) => {
    const audioCtx = new AudioContext();
    const gainNode = audioCtx.createGain();
    gainNode.connect(audioCtx.destination);
  
    const beatDuration = 60 / bpm;
    const startTime = audioCtx.currentTime;
  
    for (let i = 0; i < beats; i++) {
      const osc = audioCtx.createOscillator();
      osc.type = 'sine'; // You can change the waveform type here
      osc.frequency.setValueAtTime(440, startTime + i * beatDuration); // A4 tone for the beat
      osc.connect(gainNode);
  
      osc.start(startTime + i * beatDuration);
      osc.stop(startTime + i * beatDuration + 0.1); // Each beat lasts 0.1 seconds
    }
  };
  
  const handleStart = () => {
    const bpm = measure.getBpm();
    const beats = measure.getTimeSignatureBeats(); // can implement a screen changing thing here
    playBeat(bpm, beats);  
       
    // then record 

    // then call the test method to see whether it matches

    // how does this interface with other screens?
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
        <button onClick={handleStart}>Start</button>
      </div>
    </>
  )
}

export default MeasureItem;