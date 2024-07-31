import './App.css';
import { useState } from 'react';
import DisplayBox from './pages/DisplayBox';
import ClapDetectorComponent from './components/ClapDetectorComponent';


function App() {
  const [ score, setScore ] = useState<number>(0);

  return (
    <>
      <h1>{score}</h1>
      {/* <Score /> */}
      <DisplayBox score={score} setScore={setScore} />
      <ClapDetectorComponent /> {/* Shoudl be deleted later */}
    </>  
  )
}

export default App
