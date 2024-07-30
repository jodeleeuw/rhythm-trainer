import { useState, useEffect, useRef } from 'react';
import { Factory } from 'vexflow'; // Vex, Flow, Stave, EasyScore'

interface ScoreComponentProps {
  notes: string;
  timeSignature: string;
}

const ScoreComponent: React.FC<ScoreComponentProps> = ({ notes, timeSignature }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [blank, setBlank] = useState(true);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      if (!container.id) {
        container.id = 'output';
      }

      if (blank){
        const vf = new Factory({
          renderer: { elementId: container.id, width: 200, height: 120 },
        });
    
        const score = vf.EasyScore();
        const system = vf.System();

        console.log("system.getStaves:", system.getStaves(), "length:", system.getStaves().length);
        console.log(score);
        console.log("voices,", system.getVoices());
        
        system
        .addStave({
          voices: [
            score.voice(score.notes(notes, { stem: 'down' })),
          ],
        })
        .addClef('treble')
        .addTimeSignature(timeSignature);

        vf.draw();
        setBlank(false);
      }
    }
  }, []); // This should only run once

  return (
    <>
      <div className="scoreHolder">
        <div id="output" ref={containerRef}></div>
      </div>
    </>
  );
};

export default ScoreComponent;