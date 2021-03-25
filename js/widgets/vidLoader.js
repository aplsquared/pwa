class VidLoader{
  constructor(prop){
    this.vid = document.createElement('video');
    this.prop = prop;
    this.scaledW = 0;
    this.scaledH = 0;
    this.scaleX = 1;
    this.scaleY = 1;

    $(this.vid).on('loadeddata',()=>{
      this.fitImgToFrame();
    });
    
    // this.vid.src = bucket + this.prop.src;
    this.vid.src = mBucket + this.prop.src;

    this.vid.autoplay = true;
    this.vid.loop = true;
    if(this.prop.sound != "yes"){
      this.vid.muted = true;
    }
    return this.vid;
  }

  fitImgToFrame(){
    this.scaleY = this.prop.h / $(this.vid).height();
    this.scaleX = this.prop.w / $(this.vid).width();

    if(this.prop.scale == "fit"){
      if(this.scaleX < this.scaleY){
        $(this.vid).css({"transform-origin":"0 0", "transform":"scale("+ this.scaleX +","+ this.scaleX +")"});
      } else{
        $(this.vid).css({"transform-origin":"0 0", "transform":"scale("+ this.scaleY +","+ this.scaleY +")"});
      }
    } else if(this.prop.scale == "crop"){
      if(this.scaleX > this.scaleY){
        $(this.vid).css({"transform-origin":"0 0", "transform":"scale("+ this.scaleX +","+ this.scaleX +")"});
      } else{
        $(this.vid).css({"transform-origin":"0 0", "transform":"scale("+ this.scaleY +","+ this.scaleY +")"});
      }
    } else{
      $(this.vid).css({"width":this.prop.w +"px", "height":this.prop.h +"px", "object-fit":"fill"});
    }

    this.scaledH = $(this.vid)[0].getBoundingClientRect().height;
    this.scaledW = $(this.vid)[0].getBoundingClientRect().width;
    this.xAlign = this.prop.a.split("-")[1];
    this.yAlign = this.prop.a.split("-")[0];

    if(this.xAlign == "l"){
      $(this.vid).css("margin-left", "0px");
    } else if(this.xAlign == "c"){
      $(this.vid).css("margin-left", Math.floor((this.prop.w - this.scaledW) / 2));
    } else if(this.xAlign == "r"){
      $(this.vid).css("margin-left", Math.floor(this.prop.w - this.scaledW));
    }

    if(this.yAlign == "t"){
      $(this.vid).css("margin-top", "0px");
    } else if(this.yAlign == "m"){
      $(this.vid).css("margin-top", Math.floor((this.prop.h - this.scaledH) / 2));
    } else if(this.yAlign == "b"){
      $(this.vid).css("margin-top", Math.floor(this.prop.h - this.scaledH));
    }
  }
}
export{VidLoader};
