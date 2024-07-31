class Score {
  private notes: string[];

  constructor (notes: string[]){
    this.notes = notes;
  } 

  getScore(){
    // converts to a string for the method to call
    var res = "";
    for (var i = 0; i < this.notes.length; i++) {
      const note = this.notes[i]; 
      
      if (i > 0) res += ", " + note;
      else res = note;
    }

    return res;
  }

  getRhythm(){
    return this.notes.map(note => {
          // Split the note string by '/' to separate the note from its duration
          const parts = note.split('/');
          // Default duration is a whole note (1)
          let duration = 1;
  
          // If there's a duration part, convert it to a number
          if (parts.length > 1) {
              switch (parts[1]) {
                  case 'h': duration = 0.5; break;
                  case 'q': duration = 0.25; break;
                  case '8': duration = 0.125; break;
                  case '16': duration = 0.0625; break;
                  case '32': duration = 0.03125; break;
                  // Add more cases as needed
                  default: throw new Error(`Unknown note duration: ${parts[1]}`);
              }
          }
  
          return duration;
      });
    // returns list of what time should show up based on rhythmns
  }


}

export default Score;