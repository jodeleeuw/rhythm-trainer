import Score from "./Score";

class Measure {
  private timeSignature: number[];
  private points: number;
  private category: string;
  private score: Score;
  private bpm: number;

  constructor(timeSignature: number[], points: number, category: string, score: Score, bpm: number) {
    this.timeSignature = timeSignature;
    this.points = points;
    this.category = category;
    this.score = score;
    this.bpm = bpm;
  }

  getPoints (): number {
    return this.points;
  }

  getScore () {
    return this.score.getScore();
  }

  getRhythm () {
    return this.score.getRhythm();
  }

  getBpm(): number { 
    return this.bpm;
  }

  getTimeSignatureString(): string{
    return this.timeSignature[0] + "/" + this.timeSignature[1];
  }

  getTimeSignature(): number[] {
    return this.timeSignature;
  }

  getCategory(): string {
    return this.category;
  }

}

export default Measure;