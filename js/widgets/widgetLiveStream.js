class WidgetLiveStream{
  constructor(prop){
    this.vid = document.createElement('video');
    this.listSrc = "";
    this.htmStr = "";
    this.vidSrc = "";
    this.prop = prop;
    this.scaledW = 0;
    this.scaledH = 0;
    this.scaleX = 1;
    this.scaleY = 1;

    this.lsUrl = this.prop.src.toLowerCase();

    if(this.lsUrl.indexOf("youtube") >= 0){
      if(this.lsUrl.indexOf("&list=") >= 0){
        this.listSrc = this.prop.src.split("&list=")[1].split("&")[0];
      }
      if(this.lsUrl.indexOf("?v=") >= 0){
        this.vidSrc = this.prop.src.split("?v=")[1].split("&")[0];
      }
      this.htmStr = '<iframe id="ytplayer-'+ this.prop.id +'" src="https://www.youtube.com/embed/'+ this.vidSrc +'?autoplay=1&loop=1&controls=0&enablejsapi=1&playlist='+ this.listSrc +'" frameborder="0" nodeintegration style="width:'+ this.prop.w +'px;height:'+ this.prop.h +'px;background:'+ this.bg +'"></iframe>';
    }
    else if(this.lsUrl.indexOf("rtsp://") >= 0){
      console.log("RTSP");
      //this.htmStr = '<embed type="application/x-vlc-plugin" name="player" autoplay="no" loop="no" target="udp:@239.255.12.42" />';
      this.htmStr = '<div id="lsplayer-'+ this.prop.type +'-'+ this.prop.id +'" style="height:'+ this.prop.h +'px;"><div id="lsplayer-'+ this.prop.type +'-'+ this.prop.id +'-vid" style="height:'+ this.prop.h +'px;"></div></div>';
      setTimeout(()=>{this.init()}, 200);
    }
    return this.htmStr;
  }

  init(){};

  fitImgToFrame(){
    this.scaleX = this.prop.w / $(this.vid).width();
    this.scaleY = this.prop.h / $(this.vid).height();

    if(this.scaleX < this.scaleY){
      $(this.vid).css({"transform-origin": "0 0", "transform":"scale(" + this.scaleX + "," + this.scaleX + ")"});
    } else{
      $(this.vid).css({"transform-origin": "0 0", "transform":"scale(" + this.scaleY + "," + this.scaleY + ")"});
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
export{WidgetLiveStream};