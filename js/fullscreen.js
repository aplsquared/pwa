import {ImgLoader} from "../js/widgets/imgLoader";
import {VidLoader} from "../js/widgets/vidLoader";
class FullScreen{
  constructor(prop, count, frameId){
    this.prop = prop;
    this.prop.w = screenW;
    this.prop.h = screenH;
    this.prop.fid = "fs";
    this.prop.a = "m-c";
    this.htmStr = "";

    if(this.prop.type == "image" || this.prop.type == "vector" || this.prop.type == "powerpoint" || this.prop.type == "word"){
      var img = new ImgLoader(this.prop, true);
      this.htmStr = img;
    } else if(this.prop.type == "video"){
      var vid = new VidLoader(this.prop);
      this.htmStr = vid;
    }
    if(count > 1){
      this.fsTimer = setTimeout(()=>{
        window.clearTimer(this.prop.fid);
        $("#fs").empty();
        $("#fs").css("opacity", 0);
        window.fsPlay();
      }, this.prop.duration);
      window.addTimer(this.fsTimer, "t", this.prop.fid);
    }
    setTimeout(()=>{window.fsPause(frameId);}, 200);
    return this.htmStr;
  }
}
export{FullScreen};