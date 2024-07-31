import Measure from "./Measure";

export class AccuracyCalculator{
    private scoreTimestamps: Array<number>;
    private clapTimestamps: Array<number>;

    constructor(){ 
        this.scoreTimestamps = [];
        this.clapTimestamps = [];

    }

    private scoreToTimestamps(measure: Measure): void {

        const bpm = measure.getBpm();

        const rhythm = measure.getRhythm();

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
        console.log(normalizedRhythm);

        //ms per beat
        const mspb = (60 / bpm) * 1000;

        // Initialize cumulative duration
        let cumulativeDuration = 1 * mspb;

        //Timestamp for each note
        const noteTimestamps = normalizedRhythm.map(duration => {
            const timestamp = cumulativeDuration; // Convert cumulative duration to timestamp
            cumulativeDuration += duration * mspb ; // Update cumulative duration
            return timestamp;
        });

        console.log(noteTimestamps);
        this.scoreTimestamps = noteTimestamps;
    }
       
    calculateScore(measure: Measure, clapTimestamps: Array<number>, strictness: number = 500): number {

        this.scoreToTimestamps(measure);

        let numberCorrect = 0;
        let accuracy: number;

        for (let i = 0; i < this.scoreTimestamps.length; i++) {
            const scoreTimestamp = this.scoreTimestamps[i];
            const clapTimestamp = clapTimestamps[i];

            console.log(`scoreTimestamp: ${scoreTimestamp}, clapTimestamp: ${clapTimestamp}`);


            const difference = Math.abs(scoreTimestamp - clapTimestamp);

            console.log(difference);
            if (difference < strictness) {
                numberCorrect++
        }
        }

        accuracy = numberCorrect / this.scoreTimestamps.length;

        return accuracy;


    }

    




}