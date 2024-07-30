import Score from "../lib/Score";
import Measure from "../lib/Measure";
import ScoreComponent from "./ScoreComponent";

const notes = ['C#4/h', 'E#5/q', 'E#5/q'];
const testScore = new Score(notes);
const measure = new Measure([4,4], 100, "testing", testScore, 150);

interface MeasureItemProps {
  measure: Measure;
}

const MeasureItem: React.FC<MeasureItemProps> = () => {

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
        <ScoreComponent notes={measure.getScore()} timeSignature={measure.getTimeSignatureString()}/>
        <button onClick={handleStart}>Start</button>
      </div>
    </>
  )
}

export default MeasureItem;