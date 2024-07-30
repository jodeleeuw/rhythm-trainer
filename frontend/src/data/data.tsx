import Score from "../lib/Score";
import Measure from "../lib/Measure";

const displayBoxData = [
  new Measure([4,4], 100, "testing", new Score(['C#4/h', 'E#5/q', 'E#5/q']), 150),
  new Measure([4,4], 200, "testing", new Score(['C#4/q', 'C#4/q', 'E#5/q', 'E#5/q']), 150),
  new Measure([4,4], 300, "testing", new Score(['C#5/q', 'B4', 'A4', 'G#4']), 150),
  new Measure([4,4], 400, "testing", new Score(['C#4/h', 'E#5/q', 'E#5/q']), 150),
  new Measure([4,4], 500, "testing", new Score(['C#4/h', 'E#5/q', 'E#5/q']), 150),
]

export { displayBoxData };