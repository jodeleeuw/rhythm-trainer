import { useState, useEffect, useRef } from 'react';
import {  Factory } from 'vexflow'; // Vex, Flow, Stave, EasyScore


const Score = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [blank, setBlank] = useState(true);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      // Ensure the container has an id
      const vf = new Factory({
        renderer: { elementId: container.id, width: 500, height: 200 },
      });

      const score = vf.EasyScore();
      const system = vf.System();

      system
        .addStave({
          voices: [
            score.voice(score.notes('C#5/q, B4, A4, G#4', { stem: 'down' })),
            score.voice(score.notes('C#4/h, E#5/q, E#5/q', { stem: 'down' })),
          ],
        })
        .addClef('treble')
        .addTimeSignature('4/4');
      
      if (blank) {
        vf.draw();
        setBlank(false);
      }
    }
  }, []);

  return (
    <>
      <div id="output" ref={containerRef}></div>
    </>
  );
};

export default Score;