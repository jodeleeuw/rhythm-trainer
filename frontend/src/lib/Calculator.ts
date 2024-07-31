import Score from "./Score";
import Measure from "./Measure";

export class AccuracyCalculator{
    private measure!: Measure;
    private score!: Score;
    private scoreTimestamps!: Array<number>;
    private clapTimestamps!: Array<number>;
    private durationInSeconds: number
    private scoreDictionary!: Map<string, number>;

    constructor(durationInSeconds: number){ 
        this.durationInSeconds = durationInSeconds;

    }

    scoreToTimestamps(measure: Measure): void {
        const score = measure.getScore();
        const bpm = measure.getBpm();

        const rhythm = this.measure.getRhythm();

        const beatsPerMeasure = measure.getTimeSignature()[0];
        const beatType: number = 1 / measure.getTimeSignature()[1];

        const totalDuration = rhythm.reduce((acc, duration) => acc + duration, 0);

        const expectedDuration = beatsPerMeasure * beatType;

        // checksum for measure duration
        if (expectedDuration !== totalDuration) {
            throw new Error('Incorrect meausure duration');
        }

        //Normalizing rhythm with respect to beatType
        const normalizedRhythm = rhythm.map(duration => duration / beatType);

        //Seconds per beat
        const spb = 60 / bpm;

        //Timestamp for each note
        const noteTimestamps = normalizedRhythm.map(duration => duration * spb);

        this.scoreTimestamps = noteTimestamps;
    }
       
    calculateScore(strictness: number = 500, measure: Measure): string {

        this.scoreToTimestamps(measure);

        if (this.clapTimestamps.length === 0) return 'No claps!';

        for (const note in this.scoreTimestamps) {
            
        }


    }

    




}