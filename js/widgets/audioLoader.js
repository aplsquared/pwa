class AudioLoader{
  constructor(prop){
    this.prop = prop;
    this.audio = document.createElement('audio');
    this.audio.src = mBucket + this.prop.src;
    this.audio.controls = false;
    this.audio.autoplay = true;
    this.audio.loop = true;
    if(!convertBoolean(this.prop.sound)){
      this.audio.muted = true;
    }
    return this.audio;
  }
}
export{AudioLoader};