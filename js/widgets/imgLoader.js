// import { err } from "../libraries/svg-inject.min";

class ImgLoader{
  constructor(prop, isFs=false){
    this.outputHeight = prop.h;
    this.outputWidth = prop.w;
    this.img = new Image();
    this.prop = prop;
    this.scaledW = 0;
    this.scaledH = 0;
    this.scaleX = 1;
    this.scaleY = 1;
    this.fs = isFs;

    if(this.fs){
      this.prop.scale = "fs";
      this.prop.h = screenH;
      this.prop.w = screenW;
    }

    $(this.img).on('load', ()=>{
      this.fitImgToFrame();
    });

    if(this.prop.scale == "fit" || this.prop.scale == "fs"){
      this.img.src = tim + bucket + this.prop.src +"&w="+ this.prop.w +"&h="+ this.prop.h +"&zc=3";
    }
    if(this.prop.scale == "crop"){
      this.img.src = tim + bucket + this.prop.src +"&w="+ this.prop.w +"&h="+ this.prop.h +"&zc=1";
    }
    if(this.prop.scale == "skew"){
      this.img.src = tim + bucket + this.prop.src +"&w="+ this.prop.w +"&h="+ this.prop.h +"&zc=0";
    }

    // jimp.read(bucket + this.prop.src).then(imgObj => {
    //   this.scaleY = this.prop.h / imgObj.bitmap.height;
    //   this.scaleX = this.prop.w / imgObj.bitmap.width;
    //   if(this.prop.scale == "fit" || this.prop.scale == "fs"){
    //     if(this.scaleX < this.scaleY){
    //       this.outputHeight = parseInt(imgObj.bitmap.height * this.scaleX);
    //       this.outputWidth = parseInt(imgObj.bitmap.width * this.scaleX);
    //     } else{
    //       this.outputHeight = parseInt(imgObj.bitmap.height * this.scaleY);
    //       this.outputWidth = parseInt(imgObj.bitmap.width * this.scaleY);
    //     }
    //   } else if(this.prop.scale == "crop"){
    //     if(this.scaleX > this.scaleY){
    //       this.outputHeight = parseInt(imgObj.bitmap.height * this.scaleX);
    //       this.outputWidth = parseInt(imgObj.bitmap.width * this.scaleX);
    //     } else{
    //       this.outputHeight = parseInt(imgObj.bitmap.height * this.scaleY);
    //       this.outputWidth = parseInt(imgObj.bitmap.width * this.scaleY);
    //     }
    //   } else{
    //     this.outputHeight = this.prop.h;
    //     this.outputWidth = this.prop.w;
    //   }
    //   console.log("outputHeight: " + this.outputHeight);
    //   console.log("outputWidth: " + this.outputWidth);
    //   return imgObj
    //     .resize(this.outputWidth, this.outputHeight) // Jimp.AUTO
    //     .quality(100)
    //     // .write(resourcePath + '/resized/' + this.prop.scale + "-" + this.prop.src, ()=>{
    //     //   console.log("file written");
    //     //   this.img.src = resourcePath + '/resized/' + this.prop.scale + "-" + this.prop.src;
    //     // }); // save
    // }).catch(err => {
    //   console.error(err);
    //   this.img.src = resourcePath + '/media/' + this.prop.src;
    // });
    return this.img;
  }

  fitImgToFrame(){
    this.scaledH = $(this.img)[0].getBoundingClientRect().height;
    this.scaledW = $(this.img)[0].getBoundingClientRect().width;
    this.xAlign = this.prop.a.split("-")[1];
    this.yAlign = this.prop.a.split("-")[0];

    if(this.xAlign == "l"){
      $(this.img).css("margin-left", "0px");
    } else if(this.xAlign == "c"){
      $(this.img).css("margin-left", Math.floor((this.prop.w - this.scaledW) / 2));
    } else if(this.xAlign == "r"){
      $(this.img).css("margin-left", Math.floor(this.prop.w - this.scaledW));
    }

    if(this.yAlign == "t"){
      $(this.img).css("margin-top", "0px");
    } else if(this.yAlign == "m"){
      $(this.img).css("margin-top", Math.floor((this.prop.h - this.scaledH) / 2));
    } else if(this.yAlign == "b"){
      $(this.img).css("margin-top", Math.floor(this.prop.h - this.scaledH));
    }
  }
}
export{ImgLoader};