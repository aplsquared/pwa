import {FullScreen} from "./FullScreen";
import {AudioLoader} from "../js/widgets/audioLoader";
import {ImgLoader} from "../js/widgets/imgLoader";
import {Templates} from "../js/widgets/templates";
import {VidLoader} from "../js/widgets/vidLoader";
import {WidgetBrowser} from "../js/widgets/widgetBrowser";
// import {WidgetCalendarOfEvent} from "../js/widgets/widgetCalendarOfEvent";
import {WidgetCount} from "../js/widgets/widgetCount";
import {WidgetCrawling} from "../js/widgets/widgetCrawling";
import {WidgetDateTime} from "../js/widgets/widgetDateTime";
import {WidgetExcel} from "../js/widgets/widgetExcel";
import {WidgetFillerContent} from "../js/widgets/widgetFillerContent";
import {WidgetFlight} from "../js/widgets/widgetFlight";
import {WidgetListView} from "../js/widgets/widgetListView";
import {WidgetLiveStream} from "../js/widgets/widgetLiveStream";
import {WidgetMeetingRB} from "../js/widgets/widgetMeetingRB";
import {WidgetMeetingWB} from "../js/widgets/widgetMeetingWB";
import {WidgetOpenHour} from "../js/widgets/widgetOpenHour";
import {WidgetQueue} from "../js/widgets/widgetQueue";
import {WidgetQuote} from "../js/widgets/widgetQuote";
import {WidgetRadio} from "../js/widgets/widgetRadio";
import {WidgetStock} from "../js/widgets/widgetStock";
import {WidgetSurvey} from "../js/widgets/widgetSurvey";
import {WidgetText} from "../js/widgets/widgetText";
import {WidgetThumbView} from "../js/widgets/widgetThumbView";
import {WidgetWeather} from "../js/widgets/widgetWeather";
import {WidgetWebCam} from "../js/widgets/widgetWebCam";
// import {WidgetWebLogin} from "../js/widgets/WidgetWebLogin";

class Frame{
  constructor(prop){
    this.prop = prop;
    this.htmStr = '<div id="'+ this.prop.id +'" class="frame" style="width:'+ this.prop.w +'px;height:'+ this.prop.h +'px;left:'+ this.prop.x +'px;top:'+ this.prop.y +'px;z-index:'+ this.prop.z +';background:'+ this.hexToRgbA(this.prop.bg, this.prop.bga) +'"><div id="'+ this.prop.id +'-c1" class="container"></div><div id="'+ this.prop.id +'-c2" class="container"></div></div>';
    this.itemChangeTimer = null;
    this.freeMcId = "";
    this.curMcId = "";
    this.itemArr = [];
    this.isFs = false;
    this.num = 0;
    this.itemObj;
    this.freeMc;
    this.curMc;
    
    if(this.prop.items && this.prop.items.length > 0){
      this.generateItemArr(this.itemArr);
    }
    return this.htmStr;
  }

  generateItemArr(itemArr){
    $.each(this.prop.items, function(index, item){
      if(item.active){
        if(item.type.toLowerCase() == "image" || item.type.toLowerCase() == "vector" || item.type.toLowerCase() == "powerpoint" || item.type.toLowerCase() == "word"){
          itemArr.push({id:item.id, type:item.type.toLowerCase(), src:item.src, caption:item.captionName, duration:item.duration * 1000, fs:item.fs, scale:item.scale});
        }
        else if(item.type.toLowerCase() == "audio"){
          itemArr.push({id:item.id, type:item.type.toLowerCase(), src:item.src, sound:item.sound, duration:item.duration * 1000});
        }
        else if(item.type.toLowerCase() == "agc"){
          itemArr.push({id:item.id, type:item.type.toLowerCase(), src:item.src, wc:item.wc.toLowerCase(), settings:item.settings, duration:item.duration * 1000});
        }
        else if(item.type.toLowerCase() == "count" || item.type.toLowerCase() == "crawlingtext" || item.type.toLowerCase() == "schedulecalendar" || item.type.toLowerCase() == "calendarofeventsview"){
          itemArr.push({id:item.id, type:item.type.toLowerCase(), filename:item.type.toLowerCase(), dtype:item.dType, settings:item.settings, duration:item.duration * 1000});
        }
        else if(item.type.toLowerCase() == "csvchart" || item.type.toLowerCase() == "currency" || item.type.toLowerCase() == "fifa" || item.type.toLowerCase() == "fschrome" || item.type.toLowerCase() == "template"){
          itemArr.push({id:item.id, type:item.type.toLowerCase(), src:item.src, duration:item.duration * 1000});
        }
        else if(item.type.toLowerCase() == "date-time"){
          itemArr.push({id:item.id, type:item.type.toLowerCase(), src:item.src, settings:item.settings, duration:item.duration * 1000});
        }
        else if(item.type.toLowerCase() == "facebook" || item.type.toLowerCase() == "fbworkplace" || item.type.toLowerCase() == "linkedin"){
          itemArr.push({id:item.id, type:item.type.toLowerCase(), src:item.src, filename:urlToStr(item.src), dtype:item.dType, settings:item.settings, duration:item.duration * 1000});
        }
        else if(item.type.toLowerCase() == "fillercontent"){
          itemArr.push({id:item.id, type:item.type.toLowerCase(), content:item.content, src:item.content.active == "1", sound:item.sound, duration:item.duration * 1000});
        }
        else if(item.type.toLowerCase() == "flight"){
          itemArr.push({id:item.id, type:item.type.toLowerCase(), src:item.src, airportName:item.fileName, dType:item.dType, settings:item.settings, duration:item.duration * 1000});
        }
        else if(item.type.toLowerCase() == "googleslide"){
          itemArr.push({id:item.id, type:item.type.toLowerCase(), src:item.src, duration:item.duration * 1000});
        }
        else if(item.type.toLowerCase() == "instagram"){
          itemArr.push({id:item.id, type:item.type.toLowerCase(), filename:urlToStr(item.src), dtype:item.dType, settings:item.settings, sound:item.sound, duration:item.duration * 1000});
        }
        else if(item.type.toLowerCase() == "livestream"){
          itemArr.push({id:item.id, type:item.type.toLowerCase(), src:item.src, sound:item.sound, duration:item.duration * 1000});
        }
        else if(item.type.toLowerCase() == "imenu" || item.type.toLowerCase() == "quote" || item.type.toLowerCase() == "traffic"){
          itemArr.push({id:item.id, type:item.type.toLowerCase(), settings:item.settings, duration:item.duration * 1000});
        }
        else if(item.type.toLowerCase() == "meeting" || item.type.toLowerCase() == "calendarofevents"){
          itemArr.push({id:item.id, type:item.type.toLowerCase(), dtype:item.dType.toLowerCase(), src:item.src, settings:item.settings, duration:item.duration * 1000});
        }
        else if(item.type.toLowerCase() == "excelsheet"){
          itemArr.push({id:item.id, type:item.type.toLowerCase(), src:item.src, settings:item.settings, duration:item.duration * 1000});
        }
        else if(item.type.toLowerCase() == "news"){
          itemArr.push({id:item.id, type:item.type.toLowerCase(), dtype:item.dType.toLowerCase(), filename:urlToStr(item.fileName), provider:item.fileName, src:item.src, settings:item.settings, duration:item.duration * 1000});
        }
        else if(item.type.toLowerCase() == "nextvehicle"){
          itemArr.push({id:item.id, type:item.type.toLowerCase(), duration:item.duration * 1000});
        }
        else if(item.type.toLowerCase() == "openhour"){
          itemArr.push({id:item.id, type:item.type.toLowerCase(), lang:item.lang, img:item.fileName, settings:item.settings, duration:item.duration * 1000});
        }
        else if(item.type.toLowerCase() == "outlookcalendar" || item.type.toLowerCase() == "googlecalendar"){
          itemArr.push({id:item.id, type:item.type.toLowerCase(), dtype:item.dType.toLowerCase(), template:item.template, settings:item.settings, duration:item.duration * 1000});
        }
        else if(item.type.toLowerCase() == "patientwait"){
          itemArr.push({id:item.id, type:item.type.toLowerCase(), src:item.src, dType:item.dType, settings:item.settings, duration:item.duration * 1000});
        }
        else if(item.type.toLowerCase() == "powerbi"){
          itemArr.push({id:item.id, type:item.type.toLowerCase(), duration:item.duration * 1000});
        }
        else if(item.type.toLowerCase() == "queue"){
          itemArr.push({id:item.id, type:item.type.toLowerCase(), src:item.src, dType:item.dType.toLowerCase(), settings:item.settings, duration:item.duration * 1000});
        }
        else if(item.type.toLowerCase() == "radio"){
          itemArr.push({id:item.id, type:item.type.toLowerCase(), src:item.src, volume:item.volume, sound:item.sound, mute:item.mute, duration:item.duration * 1000});
        }
        else if(item.type.toLowerCase() == "rss"){
          itemArr.push({id:item.id, type:item.type.toLowerCase(), dtype:item.dType.toLowerCase(), filename:urlToStr(item.src), provider:item.fileName, src:item.src, settings:item.settings, duration:item.duration * 1000});
        }
        else if(item.type.toLowerCase() == "slack"){
          itemArr.push({id:item.id, type:item.type.toLowerCase(), duration:item.duration * 1000});
        }
        else if(item.type.toLowerCase() == "stock"){
          itemArr.push({id:item.id, type:item.type.toLowerCase(), dtype:item.dType.toLowerCase(), src:item.src, settings:item.settings, duration:item.duration * 1000});
        }
        else if(item.type.toLowerCase() == "survey"){
          itemArr.push({id:item.id, type:item.type.toLowerCase(), settings:item.settings, duration:item.duration * 1000});
        }
        else if(item.type.toLowerCase() == "telax"){
          itemArr.push({id:item.id, type:item.type.toLowerCase(), duration:item.duration * 1000, src:item.src, color:item.color, dType:item.dType});
        }
        else if(item.type.toLowerCase() == "twitter"){
          itemArr.push({id:item.id, type:item.type.toLowerCase(), filename:item.src, settings:item.settings, duration:item.duration * 1000});
        }
        else if(item.type.toLowerCase() == "ungerboeck" || item.type.toLowerCase() == "readerboard" || item.type.toLowerCase() == "touchlinkmeetings"){
          itemArr.push({id:item.id, type:item.type.toLowerCase(), dtype:item.dType, settings:item.settings, duration:item.duration * 1000});
        }
        else if(item.type.toLowerCase() == "video"){
          itemArr.push({id:item.id, type:item.type.toLowerCase(), src:item.src, caption:item.captionName, sound:item.sound, duration:item.duration * 1000, fs:item.fs, scale:item.scale});
          // isFileExists = ssCore.FileSys.fileExists({path: "startdir://resources//media//" + item.fileName});
          // if(isFileExists.result == "TRUE"){
          //
          // }
        }
        else if(item.type.toLowerCase() == "vimeo"){
          itemArr.push({id:item.id, type:item.type.toLowerCase(), src:item.src, duration:item.duration * 1000, fs:item.fs});
        }
        else if(item.type.toLowerCase() == "web" || item.type.toLowerCase() == "webpage"){
          itemArr.push({id:item.id, type:item.type.toLowerCase(), src:item.src, settings:item.settings, duration:item.duration * 1000});
        }
        else if(item.type.toLowerCase() == "webcam"){
          itemArr.push({id:item.id, type:item.type.toLowerCase(), settings:item.settings, duration:item.duration * 1000});
        }
        else if(item.type.toLowerCase() == "sunsmart" || item.type.toLowerCase() == "webwidget"){
          itemArr.push({id:item.id, type:item.type.toLowerCase(), src:item.src, duration:item.duration * 1000});
        }
        else if(item.type.toLowerCase() == "weblogin"){
          itemArr.push({id:item.id, type:item.type.toLowerCase(), src:item.src, settings:item.settings, duration:item.duration * 1000});
        }
        else if(item.type.toLowerCase() == "weather"){
          itemArr.push({id:item.id, type:item.type.toLowerCase(), woeid:item.src, forecast:item.forecast, settings:item.settings, duration:item.duration * 1000});
        }
        else if(item.type.toLowerCase() == "youtube"){
          itemArr.push({id:item.id, type:item.type.toLowerCase(), src:item.src, sound:item.sound, params:item.params, settings:item.settings, duration:item.duration * 1000});
        }
        else{
          itemArr.push({id:item.id, type:item.type.toLowerCase(), src:item.fileName, duration:item.duration * 1000, fileSize:0, fs:item.fs, scale:item.scale});
        }
      }
   });
    if(itemArr.length > 0){
      setTimeout(()=>{this.init()}, 200);
    }
  }

  init(){
    this.freeMcId = this.prop.id + "-c1";
    this.curMcId = this.prop.id + "-c2";
    this.freeMc = $("#" + this.freeMcId);
    this.curMc = $("#" + this.curMcId);

    if(this.prop.transition == "f"){
      this.freeMc.css("opacity", 0);
      this.curMc.css("opacity", 0);
    } else{
      this.freeMc.css("visibility", "hidden");
      this.curMc.css("visibility", "hidden");
    }
    this.startDisplay();

    if(this.itemArr.length > 1){
      //this.itemChangeTimer = setTimeout(()=>{this.loadNextItemFx()}, this.itemArr[this.num].duration);
      this.itemChangeTimer = new Timer(()=>{this.loadNextItemFx()}, this.itemArr[this.num].duration);
      window.addTimer(this.itemChangeTimer.timerId, "t", this.prop.id, "frame", this.itemChangeTimer);
    }
  }

  loadNextItemFx(){
    this.num += 1;
    if(this.num >= this.itemArr.length){
      this.num = 0;
    }
    window.clearTimer(this.prop.id);
    try{
      // window.webFrame.clearCache();
    }
    catch(e){}
    this.startDisplay();
    this.itemChangeTimer = new Timer(()=>{this.loadNextItemFx()}, this.itemArr[this.num].duration);
    window.addTimer(this.itemChangeTimer.timerId, "t", this.prop.id, "frame", this.itemChangeTimer);
  }

  startDisplay(){
    this.itemObj = this.itemArr[this.num];
    this.itemObj.transition = this.prop.transition;
    this.itemObj.fid = this.prop.id;
    this.itemObj.tz = this.prop.tz;
    this.itemObj.bg = this.prop.bg;
    this.itemObj.a = this.prop.a;
    this.itemObj.w = this.prop.w;
    this.itemObj.h = this.prop.h;
    
    if(this.itemArr[this.num].fs == "yes"){
      this.isFs = true;
      this.transition();
      var fs = new FullScreen(this.itemArr[this.num], this.prop.items.length, this.itemObj.fid);
      $("#fs").empty();
      $("#fs").append(fs);
      $("#fs").css("opacity", 1);
    } else{
      this.isFs = false;
      if(this.itemArr[this.num].type == "image" || this.itemArr[this.num].type == "vector" || this.itemArr[this.num].type == "powerpoint" || this.itemArr[this.num].type == "word"){
        var img = new ImgLoader(this.itemObj);
        this.freeMc.append(img);
      } else if(this.itemArr[this.num].type == "audio"){
        var audio = new AudioLoader(this.itemObj);
        this.freeMc.append(audio);
      } else if(this.itemArr[this.num].type == "video"){
        var vid = new VidLoader(this.itemObj);
        this.freeMc.append(vid);
      } else if(this.itemArr[this.num].type == "crawlingtext"){
        var text;
        if(this.itemArr[this.num].dtype == "c"){
          text = new WidgetCrawling(this.itemObj);
        } else{
          text = new WidgetText(this.itemObj);
        }
        this.freeMc.append(text.htmStr);
      } else if(this.itemArr[this.num].type == "count"){
        var count = new WidgetCount(this.itemObj);
        this.freeMc.append(count.htmStr);
      } else if(this.itemArr[this.num].type == "date-time"){
        var dateTime = new WidgetDateTime(this.itemObj);
        this.freeMc.append(dateTime.htmStr);
      } else if(this.itemArr[this.num].type == "excelsheet"){
        var excelSheet = new WidgetExcel(this.itemObj);
        this.freeMc.append(excelSheet.htmStr);
      } else if(this.itemArr[this.num].type == "googleslide"){
        var gSlide = new WidgetBrowser(this.itemObj);
        this.freeMc.append(gSlide.htmStr);
      } else if(this.itemArr[this.num].type == "meeting" || this.itemArr[this.num].type == "outlookcalendar" || this.itemArr[this.num].type == "googlecalendar" || this.itemArr[this.num].type == "calendarofevents" || this.itemArr[this.num].type == "touchlinkmeetings"){
        var meeting;
        if(this.itemArr[this.num].dtype == "wb" || this.itemArr[this.num].dtype == "wc" || this.itemArr[this.num].dtype == "ae"){
          meeting = new WidgetMeetingWB(this.itemObj);
        } else if(this.itemArr[this.num].dtype == "r" || this.itemArr[this.num].dtype == "rb"){
          meeting = new WidgetMeetingRB(this.itemObj);
        }
        this.freeMc.append(meeting.htmStr);
      } else if(this.itemArr[this.num].type == "flight"){
        var flight = new WidgetFlight(this.itemObj);
        this.freeMc.append(flight.htmStr);
      } else if(this.itemArr[this.num].type == "livestream"){
        var livestream = new WidgetLiveStream(this.itemObj);
        this.freeMc.append(livestream.htmStr);
      }
      // else if(vm.itemArr[num].type == "fsChrome"){
      //   vm.widgetStr = '<script type="text/javascript">var id="' + vm.itemArr[num].id + '";var cid="' + freeMcId + '";var fid="' + vm.itemArr[num].fId + '";</script><script type="text/javascript" src="./widgets/js/fsChrome.js"></script>';
      //   freeMc.html(vm.widgetStr);
      // }
      else if(this.itemArr[this.num].type == "news"){
        var news;
        if(this.itemArr[this.num].dtype == "crawl"){
          news = new WidgetCrawling(this.itemObj);
        } else{
          news = new WidgetListView(this.itemObj);
        }
        this.freeMc.append(news.htmStr);
      } else if(this.itemArr[this.num].type == "template"){
        var template = new Templates(this.itemObj);
        this.freeMc.append(template.htmStr);
      } else if(this.itemArr[this.num].type == "traffic"){
        var traffic = new WidgetBrowser(this.itemObj);
        this.freeMc.append(traffic.htmStr);
      } else if(this.itemArr[this.num].type == "weather"){
        var weather = new WidgetWeather(this.itemObj);
        this.freeMc.append(weather.htmStr);
      } else if(this.itemArr[this.num].type == "webpage"){
        var webpage = new WidgetBrowser(this.itemObj);
        this.freeMc.append(webpage.htmStr);
      } else if(this.itemArr[this.num].type == "webcam"){
        var webcam = new WidgetWebCam(this.itemObj);
        this.freeMc.append(webcam.htmStr);
      } else if(this.itemArr[this.num].type == "webwidget"){
        var iframe = new WidgetBrowser(this.itemObj);
        this.freeMc.append(iframe.htmStr);
      } else if(this.itemArr[this.num].type == "slack"){
        var slack = new WidgetBrowser(this.itemObj);
        this.freeMc.append(slack.htmStr);
      } else if(this.itemArr[this.num].type == "nextvehicle"){
        var powerbi = new WidgetBrowser(this.itemObj);
        this.freeMc.append(powerbi.htmStr);
      } else if(this.itemArr[this.num].type == "powerbi"){
        var powerbi = new WidgetBrowser(this.itemObj);
        this.freeMc.append(powerbi.htmStr);
      } else if(this.itemArr[this.num].type == "openhour"){
        var openHour = new WidgetOpenHour(this.itemObj);
        this.freeMc.append(openHour.htmStr);
      } else if(this.itemArr[this.num].type == "radio"){
        var radio = new WidgetRadio(this.itemObj);
        this.freeMc.append(radio);
      } else if(this.itemArr[this.num].type == "twitter"){
        var twitter = new WidgetListView(this.itemObj);
        this.freeMc.append(twitter.htmStr);
      } else if(this.itemArr[this.num].type == "queue"){
        var queue = new WidgetQueue(this.itemObj);
        this.freeMc.html(queue.htmStr);
      } else if(this.itemArr[this.num].type == "quote"){
        var quote = new WidgetQuote(this.itemObj);
        this.freeMc.html(quote.htmStr);
      } else if(this.itemArr[this.num].type == "vimeo"){
        var vimeo = new WidgetBrowser(this.itemObj);
        this.freeMc.append(vimeo.htmStr);
      } else if(this.itemArr[this.num].type == "youtube"){
        var youtube = new WidgetBrowser(this.itemObj);
        this.freeMc.append(youtube.htmStr);
      } else if(this.itemArr[this.num].type == "schedulecalendar" || this.itemArr[this.num].type == "calendarofeventsview"){
        var sCalendar = new WidgetBrowser(this.itemObj);
        this.freeMc.append(sCalendar.htmStr);
      } else if(this.itemArr[this.num].type == "rss"){
        var rss;
        if(this.itemArr[this.num].dtype == "crawl"){
          rss = new WidgetCrawling(this.itemObj);
        } else{
          rss = new WidgetListView(this.itemObj);
        }
        this.freeMc.append(rss.htmStr);
      } else if(this.itemArr[this.num].type == "stock"){
        var stock;
        var stockSettings = testJSON(this.itemArr[this.num].settings);
        // if(this.itemArr[this.num].dtype == "m" && stockSettings.template == "t1"){
        //   stock = new WidgetCrawling(this.itemObj);
        // }
        // else{
          stock = new WidgetStock(this.itemObj);
        // }
        // var stock = new WidgetStock(this.itemObj);
        this.freeMc.append(stock.htmStr);
      } else if(this.itemArr[this.num].type == "survey"){
        var survey = new WidgetBrowser(this.itemObj);
        // var survey = new WidgetSurvey(this.itemObj);
        this.freeMc.append(survey.htmStr);
      } else if(this.itemArr[this.num].type == "fillercontent"){
        var filler = new WidgetFillerContent(this.itemObj);
        this.freeMc.append(filler.htmStr);
      } else if(this.itemArr[this.num].type == "weblogin"){
        var web = new WidgetWebLogin(this.itemObj);
        this.freeMc.append(web.htmStr);
      } else if(this.itemArr[this.num].type == "instagram"){
        var instagram;
        if(this.itemArr[this.num].dtype == "t"){
          instagram = new WidgetListView(this.itemObj);
        } else{
          instagram = new WidgetThumbView(this.itemObj);
        }
        this.freeMc.append(instagram.htmStr);
      } else if(this.itemArr[this.num].type == "facebook" || this.itemArr[this.num].type == "fbworkplace"){
        var facebook;
        if(this.itemArr[this.num].dtype == "t"){
          facebook = new WidgetListView(this.itemObj);
        } else if(this.itemArr[this.num].dtype == "m"){
          facebook = new WidgetThumbView(this.itemObj);
        } else if(this.itemArr[this.num].dtype == "v"){
          facebook = new WidgetBrowser(this.itemObj);
        }
        this.freeMc.append(facebook.htmStr);
      }
    // else if(vm.itemArr[num].type == "instagram"){
      //   vm.widgetStr = '<script type="text/javascript">var id="' + vm.itemArr[num].id + '";var cid="' + freeMcId + '";var fid="' + vm.itemArr[num].fId + '";</script><script type="text/javascript" src="./widgets/js/instagram.js"></script>';
      //   freeMc.html(vm.widgetStr);
      // }
      // else if(vm.itemArr[num].type == "twitter"){
      //   vm.widgetStr = '<script type="text/javascript">var id="' + vm.itemArr[num].id + '";var cid="' + freeMcId + '";var fid="' + vm.itemArr[num].fId + '";</script><script type="text/javascript" src="./widgets/js/twitter.js"></script>';
      //   freeMc.html(vm.widgetStr);
      // }
    // else if(vm.itemArr[num].type == "stock"){
      //   vm.widgetStr = '<script type="text/javascript">var id="' + vm.itemArr[num].id + '";var cid="' + freeMcId + '";var fid="' + vm.itemArr[num].fId + '";</script><script type="text/javascript" src="./widgets/js/stock.js"></script>';
      //   freeMc.html(vm.widgetStr);
      // }
    // else if(vm.itemArr[num].type == "meeting"){
      //   vm.widgetStr = '<script type="text/javascript">var id="' + vm.itemArr[num].id + '";var cid="' + freeMcId + '";var fid="' + vm.itemArr[num].fId + '";</script><script type="text/javascript" src="./widgets/js/meeting.js"></script>';
      //   freeMc.html(vm.widgetStr);
      // }
    // else if(vm.itemArr[num].type == "calendarOfEvents"){
      //   vm.widgetStr = '<script type="text/javascript">var id="' + vm.itemArr[num].id + '";var cid="' + freeMcId + '";var fid="' + vm.itemArr[num].fId + '";</script><script type="text/javascript" src="./widgets/js/calendarOfEvent.js"></script>';
      //   freeMc.html(vm.widgetStr);
      // }
    // else if(vm.itemArr[num].type == "facebook"){
      //   vm.widgetStr = '<script type="text/javascript">var id="' + vm.itemArr[num].id + '";var cid="' + freeMcId + '";var fid="' + vm.itemArr[num].fId + '";</script><script type="text/javascript" src="./widgets/js/facebook.js"></script>';
      //   freeMc.html(vm.widgetStr);
      // }
      this.transition();
    }
  }

  transition(){
    if(this.prop.transition == "f"){
      TweenMax.to(this.freeMc, 0.5, {opacity:1});
      TweenMax.to(this.curMc, 0.5, {opacity:0});
      setTimeout(()=>{this.tweenComplete()}, 500);
    } else{
      this.freeMc.css({'visibility':'visible'});
      this.curMc.css({'visibility':'hidden'});
      this.curMc.empty();

      this.freeMc = $("#" + this.curMcId);
      this.curMc = $("#" + this.freeMcId);

      this.freeMcId = this.freeMc.attr("id");
      this.curMcId = this.curMc.attr("id");
    }
  }

  tweenComplete(){
    //TweenMax.killTweensOf(this.freeMc);
    //TweenMax.killTweensOf(this.curMc);
    this.curMc.empty();

    this.freeMc = $("#" + this.curMcId);
    this.curMc = $("#" + this.freeMcId);

    this.freeMcId = this.freeMc.attr("id");
    this.curMcId = this.curMc.attr("id");
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
        return 'rgba('+ [(c >> 16) & 255,(c >> 8) & 255, c & 255].join(',') +', '+ alpha +')';
      } else{
        return "rgba('255, 255, 255', "+ alpha +")";
      }
    }
  }
}
export{Frame};