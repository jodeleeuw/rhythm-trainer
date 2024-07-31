import { AccuracyCalculator } from "./Calculator"
import Measure from "./Measure";

export class ClapDetector {

    options = {
      // energy threshold for claps
      clapThreshold: 50,
      // typical freq range for claps
      highFrequencyRange: [1500, 2800],
      minClapInterval: 300
    }
  
    private lastClapTime: number = 0
    private bufferLength: number
    private calculator: AccuracyCalculator;
    analyserNode: AnalyserNode
    frequencyData: Uint8Array
    audioContext: AudioContext
    recordedChunks: Array<any>
    mediaRecorder!: MediaRecorder
    numberOfClaps!: number
    clapTimestamps!: Array<number>
    audioStartTime!: number
  
    constructor(options = {}) {
      this.options = Object.assign(this.options, options)
      this.lastClapTime = 0
      this.detectClap = this.detectClap.bind(this)
      this.audioContext = new AudioContext()
      this.analyserNode = this.audioContext.createAnalyser()
      // high frequency, short fft size
      this.recordedChunks= [];
      this.mediaRecorder;
      this.analyserNode.fftSize = 2048
      this.analyserNode.minDecibels = -90
      this.analyserNode.maxDecibels = -10
      this.analyserNode.smoothingTimeConstant = 0.85
  
      this.bufferLength = this.analyserNode.frequencyBinCount
      this.frequencyData = new Uint8Array(this.bufferLength)

      this.calculator = new AccuracyCalculator();
    }


    async startRecording(duration: number) {
        try {
            console.log("Requesting microphone access...");
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            this.mediaRecorder = new MediaRecorder(stream);
            this.recordedChunks = []; // Ensure recordedChunks is initialized here
            this.mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    this.recordedChunks.push(event.data);
                }
            };
            console.log("Starting recording...");
            this.mediaRecorder.start();
    
            // Use a promise to wait for the recording to stop
            return new Promise((resolve) => {
                setTimeout(async () => {
                    console.log("Stopping recording...");
                    await this.stopRecordingAndDetectClaps();
                    resolve(this.clapTimestamps);
                }, duration*1000);
            });
        } catch (error) {
            console.error("Error starting recording:", error);
            return Promise.reject(error);
        }
    }
    async stopRecordingAndDetectClaps() {
      return new Promise((resolve, reject) => {
        // Ensure mediaRecorder is not null
        if (!this.mediaRecorder) {
            reject('MediaRecorder is not initialized');
            return;
        }

        this.mediaRecorder.onstop = async () => {
            try {
                const recordedBlob = new Blob(this.recordedChunks, { type: 'audio/wav' });
                await this.processAudioBuffer(recordedBlob);
                console.log("Number of claps detected:", this.numberOfClaps);
                console.log(this.numberOfClaps, this.clapTimestamps);
                resolve(this.clapTimestamps); // Resolve the promise when done
            } catch (error) {
                reject(error); // Reject the promise on error
            }
        };

        // Stop the media recorder which triggers the onstop event
        this.mediaRecorder.stop();
    });
        
      }
    
    async processAudioBuffer(recordedBlob : Blob) {
        
        const arrayBuffer = await recordedBlob.arrayBuffer();
        // Use decodeAudioData with await for promise-based handling
        const audioBufferToProcess = await this.audioContext.decodeAudioData(arrayBuffer);
        // Assuming the audio is short enough to process in one go
        // For longer audio, you might need to process it in chunks
        const source = this.audioContext.createBufferSource();
        source.buffer = audioBufferToProcess;
        source.connect(this.analyserNode);
        source.start(0);
    
        // Since we cannot use requestAnimationFrame, we manually call detectClap in a loop
        // Adjust the loop to match the duration of your audio buffer
        const duration = audioBufferToProcess.duration;
        const intervalTime = 100; // Process every 100 ms  ***PROCESSING SIZE****
        let currentTime = 0;

        this.numberOfClaps = 0;
        this.clapTimestamps = [];
    
        // Calculate total iterations
    const totalIterations = Math.ceil(duration * 1000 / intervalTime);
    let iteration = 0;

    // Asynchronous loop using setTimeout inside a Promise
    this.audioStartTime = Date.now();
    while (iteration < totalIterations) {
        this.detectClap();
        currentTime += intervalTime;
        await new Promise(resolve => setTimeout(resolve, intervalTime));
        iteration++;
    }

        
      }
  
    detectClap() {
      this.analyserNode.getByteFrequencyData(this.frequencyData)
  
      const highFrequencyData = this.frequencyData.slice(
        Math.round(this.options.highFrequencyRange[0] / this.audioContext.sampleRate * this.bufferLength),
        Math.round(this.options.highFrequencyRange[1] / this.audioContext.sampleRate * this.bufferLength)
      )
      const highFrequencyEnergy = highFrequencyData.reduce((sum, value) => sum + value) / highFrequencyData.length
      //console.log(highFrequencyEnergy)
  
      const metClapThreshold = highFrequencyEnergy > this.options.clapThreshold
      const timeSinceLastClap = Date.now() - this.lastClapTime
      const metMinClapInterval = timeSinceLastClap > this.options.minClapInterval
      console.log(metClapThreshold, metMinClapInterval)
      if (metClapThreshold && metMinClapInterval) {
        console.log('Clap detected!')
        this.lastClapTime = Date.now();
        this.clapTimestamps.push(this.lastClapTime - this.audioStartTime); ;
        this.numberOfClaps++;
      }
      }

    getClapTimestamps() {
        return this.clapTimestamps;
    }

    getAccuracy(measure: Measure): number {
        return this.calculator.calculateScore(measure, this.clapTimestamps);
    }
  
  }