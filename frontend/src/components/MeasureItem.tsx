import Measure from "../lib/Measure";
import ScoreComponent from "./ScoreComponent";

interface MeasureItemProps {
  measure: Measure;
  id: number; // Add key as a prop
}

const MeasureItem: React.FC<MeasureItemProps> = ({ measure, id }) => {

  const handleStart = () => {
    console.log("Start has been clicked"); 
    // first play the metronome at the speed of the item testMeasure.getBpm();
      
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