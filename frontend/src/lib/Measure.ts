import Score from "./Score";

class Measure {
  private timeSignature: number[];
  private points: number;
  private category: string;
  private score: Score;

  constructor(timeSignature: number[], points: number, category: string, score: Score) {
    this.timeSignature = timeSignature;
    this.points = points;
    this.category = category;
    this.score = score;
  }

}

export default Measure;