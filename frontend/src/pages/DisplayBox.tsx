import { displayBoxData } from "../data/data";
import MeasureItem from "../components/MeasureItem";

interface DisplayBoxProps {
  score: number;
  setScore: (score: number) => void;
}

const DisplayBox: React.FC<DisplayBoxProps> = ( { score, setScore}) => {
  return (
    <>
      <div className="displayBoxContainer">
        {displayBoxData.map((measure, index) => (
          <MeasureItem 
            key={index} 
            measure={measure} 
            id={index} 
            score={score} 
            setScore={setScore}
          />
        ))}
      </div>
    </>
  )
}

export default DisplayBox;