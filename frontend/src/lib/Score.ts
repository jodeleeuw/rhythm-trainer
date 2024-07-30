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

  getTimeIntervals(){
    // returns list of what time should show up based on rhythmns
  }


}

export default Score;