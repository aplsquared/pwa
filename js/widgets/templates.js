import {TemplateItem} from './templateItem';
import {Frame} from '../frame'

class Templates {
  constructor(prop) {
    this.templateFeed = {};
    this.prop = prop;

    this.htmStr = '<div id="' + this.prop.type + '-' + this.prop.id + '" class="template" style="width:' + this.prop.w + 'px;height:' + this.prop.h + 'px;"></div>';
    setTimeout(()=>{this.init(this.prop)}, 200);
    return this.htmStr;
  }

  init(prop){
    var feedURL = "";
    if(eip != ""){
      feedURL = apiPath +"/template/"+ this.prop.id.split("-")[2] +"/"+ eip +"?format=json&"+ new Date().getTime();
    } else{
      feedURL = apiPath +"/template/"+ this.prop.id.split("-")[2] +"/"+ mac +"?format=json&"+ new Date().getTime();
    }
    $.get(feedURL, function(data){
      this.templateFeed = data;
      $.each(this.templateFeed.frames, function(index, item){
        if(item.type == "content" || item.type == "dContent"){
          var frame = new Frame({id:item.id + "-" + index, a:item.align, w:item.w, h:item.h, x:item.x, y:item.y, z:item.z, bg:item.bg, bga:item.bga, transition:feed.device[0].transition, tz:feed.device[0].timeZone, items:item.item});
          fTimerArr.push({id:item.id + "-" + index, timers:[]});
          $("#" + prop.type + "-" + prop.id).append(frame.htmStr);//frameStr += frame.htmStr;
        }
        else{
          var templateItem = new TemplateItem({id:item.id, a:item.align, type:item.type, w:item.w, h:item.h, x:item.x, y:item.y, z:item.z, bg:item.bg, bga:item.bga, items:item.item});
          $("#" + prop.type + "-" + prop.id).append(templateItem.htmStr);
        }
        // if(item.active){
        // }
      });
    })
    .fail(function(){
      // API not accessible.
    });
  }

  hexToRgbA(hex, alpha){
    var c;
    if(hex == ""){
      return "";
    } else{
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
export{Templates};