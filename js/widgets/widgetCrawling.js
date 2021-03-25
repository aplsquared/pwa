class WidgetCrawling{
  constructor(prop){
    this.settings = testJSON(prop.settings);
    this.txtDir = "left";
    this.isBing = false;
    this.prop = prop;
    this.feed;

    if(this.settings.dir){
      this.txtDir = this.settings.dir == "bt"?"up":"left";
    }
    if(this.prop.filename.split("-")[0] == "Bing"){
      this.isBing = true;
    }

    this.htmStr = '<div id="'+ this.prop.type +'-'+ this.prop.id +'" style="width:'+ this.prop.w +'px;height:'+ this.prop.h +'px;background:'+ window.hexToRgbA(this.settings.bg, this.settings.bga) +';font-family:' + this.settings.font.value +'"></div>';
    setTimeout(()=>{this.init()}, 200);
    return this.htmStr;
  }

  init(){
    if(this.prop.type == "crawlingtext"){
      this.loadLiveFeed();
    } else{
      this.loadLiveFeed();
      this.refreshTimer = setInterval(()=>{this.loadLiveFeed();}, 900000);
      window.addTimer(this.refreshTimer, "i", this.prop.fid);
    }
  }

  loadLiveFeed(){
    var feedObj = {title:"", logo:"", items:[]};
    if(this.prop.type == "news" || this.prop.type == "rss"){
      if(this.isBing){
        this.apiPath = apiPath +"/bingnews/"+ this.prop.id.split("-")[2] +"?"+ new Date().getTime();
      } else{
        this.apiPath = apiPath +"/reverseCall?url="+ this.prop.src +"?"+ new Date().getTime();
      }
    } else if(this.prop.type == "twitter" || this.prop.type == "instagram" || this.prop.type == "facebook" || this.prop.type == "crawlingtext"){
      this.apiPath = apiPath +"/"+ this.prop.type +"/"+  this.prop.id.split("-")[2] +"?format=json&"+ new Date().getTime();
    }
    $.get(this.apiPath, (data)=>{
      if(this.prop.type == "news" || this.prop.type == "rss"){
        if(this.isBing){
          feedObj.title = this.prop.provider;
          feedObj.logo = "";
          for(var i=0; i<data.news.length; i++){
            feedObj.items.push({img:"", title:data.news[i].title, desc:data.news[i].desc, date:""});
          }
        } else{
          data = $.parseXML(data);
          feedObj.title = $(data).find('rss channel > title').text();
          feedObj.logo = $(data).find('rss channel > image url').text();
          $(data).find('rss channel item').each(function(){
            feedObj.items.push({img:"", title:$(this).find('title').text(), desc:$('<span>').html($(this).find('description').text()).find('img').remove().end().text(), date:""});
          });
        }
      }
      else if(this.prop.type == "twitter"){
        feedObj.title = data.tweet[0].title;
        feedObj.logo = "";
        for(var i=0; i<data.tweet.length; i++){
          feedObj.items.push({img:data.tweet[i].img, title:data.tweet[i].title, desc:data.tweet[i].desc, date:data.tweet[i].date});
        }
      } else if(this.prop.type == "instagram"){
        feedObj.title = data.info[0].label;
        feedObj.logo = "";
        for(var i=0; i<data.gallery.length; i++){
          feedObj.items.push({img:data.gallery[i].thumb, title:data.gallery[i].msg, desc:"", date:""});
        }
      } else if(this.prop.type == "facebook"){
        feedObj.title = data.facebook.info.name;
        feedObj.logo = "";
        for(var i=0; i<data.facebook.gallery.length; i++){
          feedObj.items.push({img:data.facebook.gallery[i].thumb, title:data.facebook.gallery[i].msg, desc:"", date:""});
        }
      } else if(this.prop.type == "crawlingtext"){
        feedObj.title = "";
        feedObj.logo = "";
        for(var i=0; i<data.channel.length; i++){
          feedObj.items.push({img:"", title:data.channel[i].title, desc:"", date:""});
        }
      }
      if(feedObj.items.length > 0){
        this.feed = feedObj;
        feedObj = null;
        this.loadHtmlFx();
      }
    });
  }

  loadHtmlFx(){
    this.htmStr = "";
    this.textFontSize = (this.settings.dir == "bt" || this.settings.fontSizeOpt == "c")?this.settings.fontSize:(this.prop.h - this.prop.h/3.4); //this.prop.h*0.60;
    this.htmStr += '<div style="font-family:'+ this.settings.font.value +';white-space:nowrap;font-weight:bold;font-size:'+ this.textFontSize +'px;height:'+ this.prop.h +'px;color:'+ this.settings.titleText +'">';
    if(this.txtDir == "up"){
      this.htmStr += '<marquee behavior="scroll" height="'+ this.prop.h +'" direction="'+ this.txtDir +'" class="text-'+ this.settings.align +'" scrollamount="'+ (this.settings.speed * 2) +'"><style type="text/css">#' + this.prop.type + '-'+ this.prop.id + ' .bull{color:'+ this.settings.bullet +'}</style>';
    }
    else{
      this.htmStr += '<marquee behavior="scroll" height="'+ this.prop.h +'" style="line-height:'+ (this.prop.h - this.prop.h/22) +'px;font-size:'+ this.textFontSize +'px;" direction="'+ this.txtDir +'" class="vAlign-t text-'+ this.settings.align +'" scrollamount="'+ (this.settings.speed * 2) +'"><style type="text/css">#' + this.prop.type + '-'+ this.prop.id + ' .bull{color:'+ this.settings.bullet +'}</style>';
    }
    var textStr = "";
    for(var i=0; i<this.feed.items.length; i++){
      if(this.txtDir == "left"){
        this.htmStr += '<span><span class="bull">&#9724;</span> '+ this.feed.items[i].title +' </span>'
      }
      else{
        this.htmStr += '<div class="marB20 pad5">'+ this.feed.items[i].title +'</div>';
      }
    }
    this.htmStr += '</marquee></div>';
    $("#" + this.prop.type + "-" + this.prop.id).append(this.htmStr);
  }
}
export{WidgetCrawling};