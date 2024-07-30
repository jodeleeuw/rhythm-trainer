import Score from "./Score";
import Measure from "./Measure";

export class AccuracyCalculator{
    private measure!: Measure;
    private score!: Score;
    private scoreTimestamps!: Array<number>;
    private clapTimestamps!: Array<number>;
    private scoreDictionary!: Map<string, number>;

    constructor() {
        this.score;
        this.clapTimestamps
    }

    private scoreToTimestamps(measure): void{
        this.measure = measure
        const score = measure.score;
        const timeSignature = measure.timeSignature;
        const bpm = measure.bpm;




        this.scoreTimestamps;
    }
       
    calculateScore(strictness: number = 500) {

        if (this.clapTimestamps.length === 0) return 'No claps!';

        for (const note in this.scoreTimestamps) {
            
        }


    }




}