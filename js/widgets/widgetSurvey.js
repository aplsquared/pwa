
class WidgetSurvey{
  constructor(prop){
    this.settings = testJSON(prop.settings);
    this.maxH = parseInt(prop.h);
    this.rotateTime = 12000;
    this.surveyArr = [];
    this.listData = [];
    this.apiPath = "";
    this.curArr = [];
    this.rotateTimer;
    this.prop = prop;
    this.num = 0;

    if(this.settings.rotationOpt == "c"){
      this.rotateTime = this.settings.rotate * 1000;
    }
    this.htmStr = '<div id="'+ this.prop.type +'-'+ this.prop.id +'" style="width:'+ this.prop.w +'px;height:'+ this.prop.h +'px;background:'+ window.hexToRgbA(this.settings.result.bg, this.settings.result.bga) +';">';
    this.htmStr += '<style type="text/css">#'+ this.prop.type +'-'+ this.prop.id +' #item-list>div{background:'+ window.hexToRgbA(this.settings.result.bg, this.settings.result.bga) +';padding:6px}#'+ this.prop.type +'-'+ this.prop.id +' #item-list>div:nth-child(even){background:'+ window.hexToRgbA(this.settings.result.altBg, this.settings.result.altBga) +';} #'+ this.prop.type +'-'+ this.prop.id +' #item-list .title{color:'+ this.settings.result.qColor +';font-family:'+ this.settings.result.qFont.value +';font-size:'+ this.settings.result.qSize +'px} #' + this.prop.type +'-'+ this.prop.id +' #item-list>div .answers{color:'+ this.settings.result.aColor +';font-family:'+ this.settings.result.qFont.value +';font-size:' + this.settings.result.aSize + 'px;margin-left:15px;}</style>';
    this.htmStr += '<div id="item-list-container"></div></div>';
    setTimeout(()=>{this.init()}, 200);
    return this.htmStr;
  }
  init(){
    this.loadFeed();
    this.refreshTimer = setInterval(()=>{this.loadFeed();}, 300000);
    window.addTimer(this.refreshTimer, "i", this.prop.fid);
  }

  loadFeed(){
    $.get(apiPath + "/surveyQuestions/" + this.prop.id.split("-")[2] +"?"+ new Date().getTime(), (data)=>{
      this.listData = data;
      if(this.listData.length > 0){
        this.loadHtmlFx();
      }
    });
  }

  loadHtmlFx(){
    $('#'+ this.prop.type +'-'+ this.prop.id +' #item-list-container').empty().append('<div id="item-list"></div>');
    this.surveyArr = [];
    this.curArr = [];

    for(var i=0; i<this.listData.length; i++){
      this.htmStr = '<div>';
        this.htmStr += '<div class="title">'+ (i+1) +'. '+ this.listData[i].label +'</div>';
        this.htmStr += '<div class="answers">';
          for(var j=0; j<this.listData[i].options.length; j++){
            this.htmStr += '<div style="margin-top:5px">[ '+ this.listData[i].options[j].label +' ] '+ this.listData[i].options[j].opt +'</div>';
          }
        this.htmStr += '</div>';
      this.htmStr += '</div>';
      $("#"+ this.prop.type +'-'+ this.prop.id +" #item-list").append(this.htmStr);

      if($("#"+ this.prop.type +'-'+ this.prop.id +" #item-list").outerHeight() > this.maxH){
        if(this.curArr.length > 0){
          this.surveyArr.push(this.curArr);
          this.curArr = [];
          this.curArr.push(i);
          $("#"+ this.prop.type +'-'+ this.prop.id +" #item-list-container").empty().append('<div id="item-list" style="visibility:hidden"></div>');
          $("#"+ this.prop.type +'-'+ this.prop.id +" #item-list").append(this.htmStr);
        } else{
          console.log("height is too low to accomodate even single item.");
        }
      } else{
        this.curArr.push(i);
      }
    }

    if(this.curArr.length > 0){
      this.surveyArr.push(this.curArr);
    }
    if(this.rotateTimer){
      clearInterval(this.rotateTimer);
    }
    if(this.surveyArr.length > 1){
      $("#" + this.prop.type + '-' + this.prop.id + " #item-list-container").empty();
      this.listStyle = "opacity:0;";
      this.htmStr = "";
      this.num = 0;
      if(this.prop.transition == "n"){
        this.listStyle = "visibility:hidden;";
      }
      for(var i=0; i<this.surveyArr.length; i++){
        if(i == 0){
          this.htmStr += '<div id="item-list" class="list-' + i + '" style="position:absolute;width:' + this.prop.w + 'px;">';
        }
        else{
          this.htmStr += '<div id="item-list" class="list-' + i + '" style="position:absolute;width:' + this.prop.w + 'px;' + this.listStyle + '">';
        }
          for(var j=0; j<this.surveyArr[i].length; j++){
            this.htmStr += '<div>';
              this.htmStr += '<div class="title">'+ (this.surveyArr[i][j]+1) +'. '+ this.listData[this.surveyArr[i][j]].label +'</div>';
            // this.htmStr += '<div class="title">' + this.feed.items[this.surveyArr[i][j]].title;
              this.htmStr += '<div class="answers">';
                for(var k=0; k<this.listData[this.surveyArr[i][j]].options.length; k++){
                  this.htmStr += '<div style="margin-top:5px">[ '+ this.listData[this.surveyArr[i][j]].options[k].label +' ] '+ this.listData[this.surveyArr[i][j]].options[k].opt +'</div>';
                }
              this.htmStr += '</div>';
            this.htmStr += '</div>';
          }
        this.htmStr += '</div>';
        
        // for(var j=0; j<this.listData[i].length; j++){
        //   this.htmStr = '<div>';
        //     this.htmStr += '<div class="title">'+ (i+1) +'. '+ this.listData[i].label +'</div>';
        //     this.htmStr += '<div class="answers">';
        //       for(var k=0; k<this.listData[i].options.length; k++){
        //         this.htmStr += '<div style="margin-top:5px">[ '+ this.listData[i].options[k].label +' ] '+ this.listData[i].options[k].opt +'</div>';
        //       }
        //     this.htmStr += '</div>';
        //   this.htmStr += '</div>';
        // }
      }
      $("#"+ this.prop.type +'-'+ this.prop.id +" #item-list-container").append(this.htmStr);
      this.rotateTimer = setInterval(()=>{
        if(this.prop.transition == "f"){
          $("#" + this.prop.type + '-' + this.prop.id + " #item-list-container #item-list.list-" + this.num).css({"opacity":0});
        } else{
          $("#" + this.prop.type + '-' + this.prop.id + " #item-list-container #item-list.list-" + this.num).css({"visibility":"hidden"});
        }
        this.num++;
        if(this.num >= this.surveyArr.length){
          this.num = 0;
        }
        if(this.prop.transition == "f"){
          TweenMax.to($("#" + this.prop.type + '-' + this.prop.id + " #item-list-container #item-list.list-" + this.num), 0.5, {opacity:1});
        } else{
          $("#" + this.prop.type + '-' + this.prop.id + " #item-list-container #item-list.list-" + this.num).css("visibility", "visible");
        }
      }, this.rotateTime);
      window.addTimer(this.rotateTimer, "i", this.prop.fid);
    }

    // if(this.listData.length > 1){
    //   this.showNextItem = setInterval(()=>{
    //     this.num++;
    //     if(this.num >= this.listData.length){
    //       this.num = 0;
    //     }
    //     $("#" + this.prop.type + "-" + this.prop.id).empty();
    //     $("#" + this.prop.type + "-" + this.prop.id).append(this.listData[this.num]);
    //   }, this.rotateTime);
    //   window.addTimer(this.showNextItem, "i", this.prop.fid);
    // }
    // $("#" + this.prop.type + '-' + this.prop.id).append(this.htmStr); 
  }
}
export{WidgetSurvey};

// <ul class="folder-content hide" ng-class="{'show': $first}">
//     <li class="row" ng-repeat="r in curResultGrp">
//       <div class="panel-body">
//         <div class="padR10">
//           <div class="text-bold word-break marB5">{{$index + 1 + ". " + r.label}}</div>
//           <span ng-repeat="opt in r.options">
//             <div class="col-xs-6 word-break" ng-if="opt.label != ''">
//               <div class="marB5"><span class="text-bold pull-left marR5">[{{opt.label}}]</span> <span>{{opt.opt}}</span></div>
//               <div class="progress">
//                 <div class="progress-bar" role="progressbar" aria-valuenow="{{opt.percent}}" aria-valuemin="0" aria-valuemax="100" style="width:{{opt.percent}}%;">
//                   {{opt.percent}}%
//                 </div>
//               </div>
//             </div>
//             <div class="clearfix" ng-if="$odd"></div>
//           </span>
//         </div>
//       </div>
//     </li>
//   </ul>