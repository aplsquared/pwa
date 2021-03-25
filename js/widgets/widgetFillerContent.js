class WidgetFillerContent{
  constructor(prop){
    // console.warn("WidgetFillerContent ", prop);
    this.maxHeight = prop.h;
    this.prop = prop;
    this.content = this.prop.content;
    this.rotateTimer;
    this.contentStr = "";
    this.tempRow = "";
    this.count = 0;
    setTimeout(()=>{this.init()}, 200);
  }

  init(){
    if(this.content.length > 0){
      this.contentStr = '<div style="width:'+ this.prop.w +'px;height:'+ this.prop.h +'px;background-color:#fff;">'+
        '<div style="overflow:hidden;height:'+ this.prop.h +'px">' ;
      this.contentStr += '<div id="sText"></div>';
      this.contentStr += '</div></div>';
      $("#"+ this.prop.fid).html(this.contentStr);
      this.loadContent(this.count, this.content[this.count].duration * 1000);
    }
  }

  loadContent(count, time){
    if(count == this.content.length){
      count = 0;
    }
    time = this.content[count].duration * 1000;

    // console.warn(time);
    // console.warn("sdsadsa", this.content);
    // console.warn("cshsjdue", this.content[count]);

    if(this.content[count].fileType == 'image'){
      this.tempRow = '<div><img src="'+ tim + bucket + this.content[count].src +'&h='+ this.prop.h +'&w='+ this.prop.w +'&zc=3" style="vertical-align:middle;height:'+ this.prop.h +'px;width:'+ this.prop.w +'px;object-fit:contain;"></div>';
    } else if(this.content[count].fileType == 'video'){
      if(this.content[count].mute == 0){
        this.tempRow = '<div><video width="'+ this.prop.w +'" height="'+ this.prop.h +'" autoplay loop><source src="'+ mBucket + this.content[count].src +'" type="video/mp4"></video></div>';
      } else{
        this.tempRow = '<div><video width="'+ this.prop.w +'" height="'+ this.prop.h +'" autoplay loop muted><source src="'+ mBucket + this.content[count].src +'" type="video/mp4"></video></div>';
      }
    }
    $("#"+ this.prop.fid +" #sText").html(this.tempRow);
    count++;
    setTimeout(()=>{
      this.loadContent(count, time);
    }, time);
    window.addTimer(this.rotateTimer, "i", this.prop.fid);
  }
}
export{WidgetFillerContent};