import './App.css';
import { useState } from 'react';
import DisplayBox from './pages/DisplayBox';


function App() {
  const [ points, setPoints ] = useState<number>(0);

  return (
    <>
      <h1>{points}</h1>
      {/* <Score /> */}
      <DisplayBox points={points} setPoints={setPoints} />
    </>  
  )
}

export default App
