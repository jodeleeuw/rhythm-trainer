import { displayBoxData } from "../data/data";
import MeasureItem from "../components/MeasureItem";

interface DisplayBoxProps {
  points: number;
  setPoints: (points: number) => void;
}

const DisplayBox: React.FC<DisplayBoxProps> = ( {points, setPoints}) => {
  return (
    <>
      <div className="displayBoxContainer">
        {displayBoxData.map((measure, index) => (
          <MeasureItem 
            key={index} 
            measure={measure} 
            id={index} 
            points={points} 
            setPoints={setPoints}
          />
        ))}
      </div>
    </>
  )
}

export default DisplayBox;