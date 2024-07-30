import { displayBoxData } from "../data/data";
import MeasureItem from "../components/MeasureItem";

const DisplayBox = () => {
  return (
    <>
      <div className="displayBoxContainer">
        {displayBoxData.map((measure, index) => (
          <MeasureItem key={index} measure={measure} id={index}/>
        ))}
      </div>
    </>
  )
}

export default DisplayBox;