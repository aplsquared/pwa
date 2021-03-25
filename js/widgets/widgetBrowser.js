class WidgetBrowser{
  constructor(prop){
    this.reDuration = 900000;
    this.prop = prop;

    if(this.prop.settings){
      this.settings = testJSON(this.prop.settings);
    }
    if(this.prop.settings && this.settings.reloadOpt && this.settings.reloadOpt == "c"){
      this.reDuration = this.settings.reload * 1000;
    }
    this.bg = "";
    if(this.prop.bg == ""){
      this.bg = "#000";
    }
    if(this.prop.type == "livestream"){
      // $("#" + vm.lsObj.item.fId + " #" + vm.lsObj.cid).html('<iframe src="' + apiPath + 'feed/livestream/' + id.split("-")[2] + '/' + vm.lsObj.item.w + '/' + vm.lsObj.item.h + '" frameborder="0" width="' + vm.lsObj.item.w + '" height="' + vm.lsObj.item.h + '" style="border:none;border:none;overflow:hidden;"></iframe>');
      this.htmStr = '<iframe src="'+ apiPath +'feed/livestream/'+ this.prop.id.split("-")[2] +'/'+ this.prop.w +'/'+ this.prop.h +'" frameborder="0" width="'+ this.prop.w +'" height="'+ this.prop.h +'" style="border:none;border:none;overflow:hidden;border:0;background:'+ this.bg +'"></iframe>';
      // this.htmStr = '<webview src="'+ this.prop.src +'" nodeintegration style="border:none;width:'+ this.prop.w +'px;height:'+ this.prop.h +'px"></webview>';
    } else if(this.prop.type == "traffic"){
      this.htmStr = '<iframe name="google-disable-x-frame-options" scrolling="no" src="'+ apiPath +"/traffic/"+ this.prop.id.split("-")[2] +'?h='+ this.prop.h +'&w='+ this.prop.w +'" nodeintegration style="border:none;width:'+ this.prop.w +'px;height:'+ this.prop.h +'px;border:0;background:'+ this.bg +'"></iframe>';
    } else if(this.prop.type == "vimeo"){
      this.htmStr = '<iframe src="https://player.vimeo.com/video/'+ this.prop.src +'?autoplay=1&loop=1&muted=0&texttrack=en&controls=0" allow="autoplay" nodeintegration style="border:none;width:'+ this.prop.w +'px;height:'+ this.prop.h +'px;background:'+ this.bg +'"></iframe>';
    } else if(this.prop.type == "webpage"){
      this.scrollX = this.settings.x;
      this.scrollY = this.settings.y;
      this.w = parseInt(this.prop.w);
      this.h = parseInt(this.prop.h);

      if(this.settings.x > 0){
        this.scrollX = -this.settings.x;
        this.w = parseInt(this.prop.w) + this.settings.x;
      }
      if(this.settings.y > 0){
        this.scrollY = -this.settings.y;
        this.h = parseInt(this.prop.h) + this.settings.y;
      }
      if(!this.settings.scroll){
        this.w = this.w + 18;
      }
      // this.htmStr = '<iframe id="'+ this.prop.type +'-'+ this.prop.id +'" src="'+ this.prop.src +'" scrolling="'+ (this.settings.scroll?'yes':'no') +'" style="border:none;position:relative;background:'+ this.bg +';width:'+ this.w +'px;height:'+ this.h +'px;left:'+ this.scrollX +'px;top:'+ this.scrollY +'px" nodeintegration disable-x-frame-options></iframe>';
      this.htmStr = '<iframe id="'+ this.prop.type +'-'+ this.prop.id +'" src="'+ this.prop.src +'" style="border:none;position:relative;background:'+ this.bg +';width:'+ this.w +'px;height:'+ this.h +'px;left:'+ this.scrollX +'px;top:'+ this.scrollY +'px" nodeintegration></iframe>';
      this.refreshTimer = setInterval(()=>{
        document.getElementById(this.prop.type +'-'+ this.prop.id).src += '';
      }, this.reDuration);
      addTimer(this.refreshTimer, "i", this.prop.fid);
    } else if(this.prop.type == "webwidget"){
      this.htmStr = '<iframe src="'+ apiPath +"/webwidget/"+ this.prop.id.split("-")[2] +'" style="border:none;background:'+ this.bg +'width:'+ this.prop.w +'px;height:'+ this.prop.h +'px;" nodeintegration></iframe>';
    } else if(this.prop.type == "googleslide"){
      var gsUrl = this.prop.src;
      if(gsUrl.indexOf('rm=minimal') == -1){
        gsUrl += "&rm=minimal";
      }
      if(gsUrl.split("pub").length > 1){
        this.htmStr = '<iframe src="'+ gsUrl.split("pub")[0] +'embed'+ gsUrl.split("pub")[1] +'" nodeintegration style="border:none;width:'+ this.prop.w +'px;height:'+ this.prop.h +'px;background:'+ this.bg +'"></iframe>';
      } else{
        this.htmStr = '<iframe src="'+ gsUrl +'" nodeintegration style="border:none;width:'+ this.prop.w +'px;height:'+ this.prop.h +'px;background:'+ this.bg +'"></iframe>';
      }
    } else if(this.prop.type == "youtube"){
      this.mute = 0;
      this.cc = 0;
      if(this.settings && this.settings.cc){
        this.cc = 1;
      }
      if(this.prop.sound == "no"){
        this.mute = 1;
      }
      // this.htmStr = '<iframe width="560" height="315" src="https://www.youtube.com/embed/3zVG0D-gsG4" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
      this.htmStr = '<iframe id="ytplayer-'+ this.prop.id +'" src="https://www.youtube.com/embed/'+ this.prop.src +'?autoplay=1&loop=1&cc_load_policy='+ this.cc +'&mute='+ this.mute +'&controls=0&enablejsapi=1&playlist='+ this.prop.src +'" allow="autoplay" frameborder="0" nodeintegration style="border:none;width:'+ this.prop.w +'px;height:'+ this.prop.h +'px;background:'+ this.bg +'"></iframe>';
    } else if(this.prop.type == "slack"){
      this.htmStr = '<iframe src="'+ apiPath +"/slackHtml/"+ this.prop.id.split("-")[2] +'" nodeintegration style="border:none;width:'+ this.prop.w +'px;height:'+ this.prop.h +'px;border:0;;background:'+ this.bg +'"></iframe>';
    } else if(this.prop.type == "nextvehicle"){
      this.htmStr = '<iframe src="'+ apiPath +"/nextVehicle/"+ this.prop.id.split("-")[2] +'?did='+ did +'" nodeintegration style="border:none;width:'+ this.prop.w +'px;height:'+ this.prop.h +'px;background:'+ this.bg +'"></iframe>';
    } else if(this.prop.type == "powerbi"){
      this.htmStr = '<iframe src="'+ apiPath +"/powerbiHtml/"+ this.prop.id.split("-")[2] +'?did='+ did +'" nodeintegration style="border:none;width:'+ this.prop.w +'px;height:'+ this.prop.h +'px;background:'+ this.bg +'"></iframe>';
    } else if(this.prop.type == "facebook"){
      if(this.settings.mute){
        this.htmStr = '<iframe src="'+ apiPath +"/facebookVideoMute?href=" + this.prop.src + '&width=100%&mute=' + this.settings.mute + '&' + new Date().getTime() + '" allow="autoplay" nodeintegration style="border:none;width:'+ this.prop.w +'px;height:'+ this.prop.h +'px;background:'+ this.bg +'"></iframe>';
			} else{
        this.htmStr = '<iframe src="'+ apiPath +"/facebookVideo?href=" + this.prop.src + '&width=100%&mute=' + this.settings.mute + '&' + new Date().getTime() + '" allow="autoplay" nodeintegration style="border:none;width:'+ this.prop.w +'px;height:'+ this.prop.h +'px;background:'+ this.bg +'"></iframe>';
			}
    } else if(this.prop.type == "schedulecalendar"){
      this.htmStr = '<iframe src="'+ apiPath +"/scheduleCalendarHtml/"+ this.prop.id.split("-")[2] +'?did='+ did +'" nodeintegration style="border:none;width:'+ this.prop.w +'px;height:'+ this.prop.h +'px;background:'+ this.settings.bg +'"></iframe>';
    } else if(this.prop.type == "calendarofeventsview"){
      this.htmStr = '<iframe src="'+ apiPath +"/calendarOfEventsViewHtml/"+ this.prop.id.split("-")[2] +'?did='+ did +'" nodeintegration style="border:none;width:'+ this.prop.w +'px;height:'+ this.prop.h +'px;background:'+ this.settings.bg +'"></iframe>';
    }
    return this.htmStr;
  }
}
export{WidgetBrowser};