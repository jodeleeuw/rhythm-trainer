import Score from "../lib/Score";
import Measure from "../lib/Measure";

const displayBoxData = [
  new Measure([4,4], 100, "Beginner", new Score(['C4/h', 'E5/q', 'E5/q']), 60),
  new Measure([4,4], 200, "Beginner", new Score(['C4/q', 'C4/q', 'E5/q', 'E#5/q']), 90),
  new Measure([4,4], 300, "Beginner", new Score(['C5/q', 'B4', 'A4', 'G#4']), 120),
  new Measure([4,4], 400, "Beginner", new Score(['E5/8', 'E5/8', 'C4/h', 'E5/q']), 150),
  new Measure([4,4], 500, "Beginner", new Score(['C4/h', 'E5/q', 'E5/q']), 180),
]

export { displayBoxData };