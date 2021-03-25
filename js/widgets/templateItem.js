class TemplateItem{
  constructor(prop){
    this.txtProp = {b:"normal",i:"normal",u:"none"}
    this.prop = prop;
    this.htmStr = "";

    if(this.prop.type == "text" || this.prop.type == "dText"){
      if(this.prop.items[0].txtBold == "true"){
        this.txtProp.b = "bold";
      }
      if(this.prop.items[0].txtItalic == "true"){
        this.txtProp.i = "italic";
      }
      if(this.prop.items[0].txtUnderline == "true"){
        this.txtProp.u = "underline";
      }
      this.htmStr = '<div class="frame" id="'+ this.prop.type +'-'+ this.prop.id +'" style="font-weight:' + this.txtProp.b + ';text-decoration:' + this.txtProp.u + ';text-align:' + this.prop.items[0].txtAlign + ';font-style:' + this.txtProp.i + ';width:'+ this.prop.w +'px;height:'+ this.prop.h +'px;left:' + this.prop.x + 'px;top:' + this.prop.y + 'px;background:'+ this.hexToRgbA(this.prop.bg, this.prop.bga) +';font-family:' + this.prop.items[0].txtFont +';font-size:' + this.prop.items[0].txtSize + 'px;color:' + this.prop.items[0].txtColor +';z-index:' + this.prop.z + '">' + this.prop.items[0].text + '</div>';
    }
    else if(this.prop.type == "rectangle"){
      this.htmStr = '<div class="frame" id="'+ this.prop.type +'-'+ this.prop.id +'" style="width:'+ this.prop.w +'px;height:'+ this.prop.h +'px;left:' + this.prop.x + 'px;top:' + this.prop.y + 'px;background:'+ this.hexToRgbA(this.prop.bg, this.prop.bga) +';z-index:' + this.prop.z + '"></div>';
    }
    else if(this.prop.type == "circle"){
      this.htmStr = '<div class="frame" id="'+ this.prop.type +'-'+ this.prop.id +'" style="width:'+ this.prop.w +'px;height:'+ this.prop.h +'px;border-radius:' + parseInt(this.prop.w)/2 + 'px;left:' + this.prop.x + 'px;top:' + this.prop.y + 'px;background:'+ this.hexToRgbA(this.prop.bg, this.prop.bga) +';z-index:' + this.prop.z + '"></div>';
    }
    return this.htmStr;
  }

  hexToRgbA(hex, alpha){
    var c;
    if(hex == ""){
      return "";
    }
    else{
      if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
        c = hex.substring(1).split('');
        if(c.length == 3){
          c = [c[0], c[0], c[1], c[1], c[2], c[2]];
        }
        c = '0x' + c.join('');
        return 'rgba(' + [(c >> 16) & 255,(c >> 8) & 255, c & 255].join(',') + ', ' + alpha + ')';
      } else{
        return "rgba('255, 255, 255', " + alpha + ")";
      }
    }
  }
}
export{TemplateItem};