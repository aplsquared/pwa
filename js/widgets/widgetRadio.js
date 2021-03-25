class WidgetRadio{
  constructor(prop){
    this.prop = prop;
    // this.htmStr = '<audio id="'+ this.prop.type +'-'+ this.prop.id +'" controls="" preload autoplay class="vHide"><source src="'+ this.prop.src +'" type="audio/mpeg"></audio>';
    // setTimeout(()=>{
    //   this.radioObj = document.getElementById(this.prop.type +'-'+ this.prop.id);
    //   if(this.prop.mute || !convertBoolean(this.prop.sound)){
    //     this.radioObj.muted = true;
    //   } else{
    //     this.radioObj.volume = this.prop.volume*.1;
    //   }
    // }, 50);
    this.radio = document.createElement('audio');
    this.radio.src = this.prop.src;
    this.radio.controls = false;
    this.radio.autoplay = true;
    this.radio.loop = true;
    if(!convertBoolean(this.prop.sound)){
      this.radio.muted = true;
    }
    else{
      this.radio.volume = this.prop.volume*.1;
    }
    return this.radio;
  }
}
export{WidgetRadio};