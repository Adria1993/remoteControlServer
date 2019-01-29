const win = require('win-audio');
class SoundController {
    
    constructor() {
        this.speaker = win.speaker;
    }

    getVolume(){
        return this.speaker.get();
    }
    setVolume(value){
        this.speaker.set(value);
    }
}

module.exports = SoundController;