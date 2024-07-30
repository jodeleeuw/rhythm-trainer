import { useEffect, useRef } from 'react';
import {  Factory } from 'vexflow'; // Vex, Flow, Stave, EasyScore


const Score = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      // Ensure the container has an id
      if (!container.id) {
        container.id = 'output';
      }
      const vf = new Factory({
        renderer: { elementId: container.id, width: 500, height: 200 },
      });

      const score = vf.EasyScore();
      const system = vf.System();

      system
        .addStave({
          voices: [
            score.voice(score.notes('C#5/q, B4, A4, G#4', { stem: 'up' })),
            score.voice(score.notes('C#4/h, C#4', { stem: 'down' })),
          ],
        })
        .addClef('treble')
        .addTimeSignature('4/4');

      vf.draw();
    }
  }, []);

  return (
    <div>
      <div id="output" ref={containerRef}></div>
    </div>
  );
};

export default Score;