var tzname = "Eastern Standard Time";
var confirmContent = {items:[]};
var downloadArrCreated = false;
var tempActiveFrameList = "";
var waitingDownloadArr = [];
var tz = "America/Toronto";
var activeFrameList = "";
var reloadCanvas = false;
var isDuplicate = false;
var restrictStartTime;
var downloadArr = [];
var firstRun = true;
var resizeCount = 0;
var restrictEndTime;
var mediaList = [];
var feedURL = "";
var outputHeight;
var outputWidth;
var curNum = 0;
var imgW = 0;
var imgH = 0;
var curDate;
var urlDate;
var apiRes;
var canvas;
var scaleX;
var scaleY;
var img;
var ctx;
var ss;

function generatePlaylist(){
  tempActiveFrameList = "";
  // curDate = new Date();
  urlDate = new Date(urlTS +" "+ urlT +":"+ "00");

  if(feed.layout && feed.layout[0].frame){
    $.each(feed.layout, function(index, layout){
      $.each(layout.frame, function(index, frame){
        // console.warn(frame);
        // var fst = new Date(curDate.getFullYear(), curDate.getMonth(), curDate.getDate(), frame.st.split(" ")[1].split(":")[0], frame.st.split(" ")[1].split(":")[1], frame.st.split(" ")[1].split(":")[2]);
        // var fet = new Date(curDate.getFullYear(), curDate.getMonth(), curDate.getDate(), frame.et.split(" ")[1].split(":")[0], frame.et.split(" ")[1].split(":")[1], frame.et.split(" ")[1].split(":")[2]);
        // if((fst.getTime() < curDate.getTime()) && (fet.getTime() > curDate.getTime())){
          
          var fst = new Date(frame.st);
          var fet = new Date(frame.et);
          // console.log("fst ", fst, " fet ", fet, " urlDate ", urlDate);
          // console.warn("fst ", fst.getTime(), " fet ", fet.getTime(), " urlDate ", urlDate.getTime());
        
        if((fst.getTime() <= urlDate.getTime()) && (fet.getTime() >= urlDate.getTime())){
          frame.active = true;
          tempActiveFrameList += frame.sort + "|";
        } else{
          frame.active = false;
        }
      });
    });
    
    if((tempActiveFrameList != activeFrameList) || reloadCanvas){
      activeFrameList = tempActiveFrameList;
      $('div[id^="container-1-"]').remove();
      $('div[id^="container-2-"]').remove();
      $("#fs").css("opacity", 0);
      reloadCanvas = false;
      $(".frame").remove();
      $("#fl").remove();
      $("#fs").empty();
      clearAllTimers();
      if(feed.device && convertBoolean(feed.device[0].blankScreen)){
        showWaiting(false);
        $("#container").html('<div id="fl" style="background-color:#000;height:' + screenH + 'px;"></div>');
      } else{
        if(activeFrameList.length > 0){
          showWaiting(false);
          updateToolbar("refresh", false);
          redraw();
        } else{
          showWaiting(true);
        }
      }
    }
  } else{
    redraw();
    defaultImage = feed.device[0].defaultImageName;
    $('div[id^="container-1-"]').remove();
    $('div[id^="container-2-"]').remove();
    $("#fs").css("opacity", 0);
    activeFrameList = [];
    $(".frame").remove();
    $("#fl").remove();
    $("#fs").empty();
    clearAllTimers();

    if(feed.device && convertBoolean(feed.device[0].blankScreen)){
      showWaiting(false);
      $("#container").html('<div id="fl" style="background-color:#000;height:' + screenH + 'px;"></div>');
    } else{
      showWaiting(true);
    }
  }
}

function getDeviceInfo(init = false){
  updateToolbar("refresh", true);
  downloadArrCreated = false;
  if(eip != ""){
    feedURL = feedPath +"/preview?eip="+ eip +"&ts="+ urlTS +"&t="+ urlT;
  } else{
    feedURL = feedPath +"/preview?ip="+ mac +"&ts="+ urlTS +"&t="+ urlT;
  }
  $.get(feedURL, function(data){
    updateToolbar("refresh", false);
    feed = testJSON(data);

    if($(location).attr('hostname') == "localhost"){
      global.tim = "https://rc.lsquared.com" + feed.device[0].timthumb;
    } else{
      global.tim = feed.device[0].timthumb;
    }
    
    
    global.bucket = global.mBucket = feed.device[0].bucket;
    if(feed.device[0].mbucket && feed.device[0].mbucket != ""){
      global.mBucket = feed.device[0].mbucket;
    }
    
    if(feed.device[0].version != feedVersion){
      feedVersion = feed.device[0].version;
      if(!feed.layout || !feed.layout.length){
        defaultImage = feed.device[0].defaultImageSrc;
        showWaiting(true);
      } else{
        tzname = feed.device[0].tzname;
        tz = feed.device[0].timeZone;
        screenW = feed.layout[0].w;
        screenH = feed.layout[0].h;
        did = feed.device[0].id;
        if(firstRun && feed.device){}
        generatePlaylist();
      }
    }
  })
  .fail(function(){
    updateToolbar("refresh", false);
  });
}

function readyToWork(){
  setTimeout(function(){getDeviceInfo(true)}, 2000);
  setInterval(function(){getDeviceInfo()}, 60000);
}
function init(){
  readyToWork();
}
setTimeout(function(){
  init();
}, 1000);
