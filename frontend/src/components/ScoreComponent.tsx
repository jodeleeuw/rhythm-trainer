import { useState, useEffect, useRef } from 'react';
import { Factory } from 'vexflow'; // Vex, Flow, Stave, EasyScore'

interface ScoreComponentProps {
  notes: string;
  timeSignature: string;
  id: number; // Add key as a prop
}

const ScoreComponent: React.FC<ScoreComponentProps> = ({ notes, timeSignature, id }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [blank, setBlank] = useState(true);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      if (!container.id) {
        container.id = 'output' + id;
      }

      if (blank){
        const vf = new Factory({
          renderer: { elementId: container.id, width: 200, height: 120 },
        });
    
        const score = vf.EasyScore();
        const system = vf.System();

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
        <div className="scoreMeasure" id={"output" + id} ref={containerRef}></div>
      </div>
    </>
  );
};

export default ScoreComponent;