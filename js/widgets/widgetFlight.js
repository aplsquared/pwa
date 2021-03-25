class WidgetFlight {
  constructor(prop){
    this.settings = testJSON(prop.settings);
    this.roDuration = 12000;
    this.reDuration = 900000;
    this.maxHeight = prop.h;
    this.prop = prop;
    this.rowHeight = 80;
    this.containerArr = [];
    this.tempArr = [];
    this.refreshTimer;
    this.rotateTimer;

    if(this.settings.rotationOpt == "c"){
      this.roDuration = this.settings.rotate * 1000;
    }
    if(this.prop.transition == "f"){
      this.visibilityCssStr = "opacity:0;";
    }

    this.htmStr = '<div id="'+ this.prop.type +'-'+ this.prop.id +'" class="flight" style="width:'+ this.prop.w +'px;height:'+ this.prop.h +'px;background-color:'+ window.hexToRgbA(this.settings.bg, this.settings.bga) +';"><div style="overflow:hidden;height:'+ this.prop.h +'px">';
    this.htmStr += '<div id="header"><div class="flightHeadH d-flex align-items-center padLR10" style="background-color:'+ window.hexToRgbA(this.settings.headerBg, this.settings.headerBga) + ';"><div id="headerTxt" class="wHeader" style="background:' + window.hexToRgbA(this.settings.headerBg, this.settings.headerBga) + ';font-family:' + this.settings.headerFont.value + ';font-size:' + this.settings.headerSize + 'px;color:' + this.settings.headerText + ';"><div class="icon hIcon"></div><div>' + (this.prop.dType == "Arrival" ? "Arrival Schedule for " : "Departure Schedule for ") + this.prop.airportName + '</div></div></div><div style="background-color:' + window.hexToRgbA(this.settings.headerBg, 0.8) + '; font-family:' + this.settings.headerFont.value + '; color:' + this.settings.headerText + ';" class="fSHeader d-flex"><div style="width:' + (this.prop.w * 0.20 - 65) + 'px; padding-left:65px;" class="padLR10">Flights</div><div style="width:' + (this.prop.w * 0.30 - 4) + 'px; padding-left:4px;" class="padLR10">City</div><div style="width:' + this.prop.w * 0.15 + 'px;" class="padLR10">Time</div><div style="width:' + this.prop.w * 0.15 + 'px;" class="padLR10">Terminal</div><div class="text-r padLR10" style="width:' + (this.prop.w * 0.20 - 38) + 'px;">Status</div><div style="padding-right:20px">&nbsp;</div></div></div>';
    this.htmStr += '<div id="mContainer"></div>';
    this.htmStr += '<div class="w100 flightFooter" style="background:'+ window.hexToRgbA(this.settings.headerBg, this.settings.headerBga) +'"></div>';
    this.htmStr += '</div></div>';

    setTimeout(()=>{
      this.init();
    }, 200);
    return this.htmStr;
  }

  init(){
    this.loadFeed();
    this.refreshTimer = setInterval(()=>{this.loadFeed()}, this.reDuration);
    window.addTimer(this.refreshTimer, "i", this.prop.fid);
  }

  loadFeed(){
    this.htmStr = "";
    var flight = [];
    $.ajax({
      // url: apiPath + "/flight/" + this.prop.id.split("-")[2] + "?" + new Date().getTime(),
      url: apiPath + "/flightyyz/" + this.prop.id.split("-")[2] + "?" + new Date().getTime(),
      dataType: 'xml',
      async: false,
      success: (data) => {
        this.flightObj = data;
        this.info = {
          name: $(data).find('flights info').attr('city'),
          code: $(data).find('facebook info').attr('code')
        };
        $(data).find('flights > flight').each(function (){
          flight.push({
            flightNo: $(this).attr('FlightNumber'),
            terminal: $(this).attr('Terminal'),
            time: $(this).attr('ScheduledTime'),
            city: $(this).attr('City'),
            remark: $(this).attr('Remarks'),
            airlineName: $(this).attr('AirlineName'),
            airlineCode: $(this).attr('AirlineCode')
          });
        });
        this.flight = flight;
      },
      error: function (err){
        console.error(err);
      }
    });
    this.loadHtmlFx();
  }

  loadHtmlFx(){
    this.htmStr = "";
    if(this.flight.length > 0){
      $("#" + this.prop.type + "-" + this.prop.id + " #mContainer").append('<div id="rows"></div>');
      this.containerArr = [];
      this.tempArr = [];
      this.num = 0;

      // window.getSvg('flight', 'hIcon', '#ffffff');

      for (var i = 0; i < this.flight.length; i++){
        var fontFamily;
        var fontSize;
        if(i % 2 == 0){
          fontFamily = this.settings.rowFont.value;
          fontSize = this.settings.rowSize;
        } else {
          fontFamily = this.settings.altFont.value;
          fontSize = this.settings.altSize;
        }

        this.htmStr = '<div id="row-' + i + '" style="visibility:hidden;"><div class="padLR10 d-flex align-items-center" style="font-size:' + fontSize + 'px;min-height:' + this.rowHeight + 'px;font-family:' + fontFamily + '"><div class="text-overflow" style="width:' + this.prop.w * 0.20 + 'px;"><div class="pull-left"><div class="rIcon"></div></div><div style="margin-left:55px"><div class="flightName">' + this.flight[i].flightNo + '</div><div class="text-xs airlineName" style="color:' + this.settings.airline + '">' + this.flight[i].airlineName + '</div></div></div><div class="text-overflow" style="width:' + this.prop.w * 0.30 + 'px;">' + this.flight[i].city + '</div><div class="text-overflow" style="width:' + this.prop.w * 0.15 + 'px;">' + this.flight[i].time.split(",")[1] + '</div><div class="text-overflow" style="width:' + this.prop.w * 0.15 + 'px;color:' + this.settings.terminal + '">' + this.flight[i].terminal + '</div><div class="text-overflow padR10 d-flex align-items-center" style="width:' + this.prop.w * 0.20 + 'px;color:' + this.settings.statusDefault + '"><div class="text-overflow marR10 flex-grow-1">' + this.flight[i].remark + '</div><div class="boxIcon"></div></div><div class="clearfix"></div></div>';
        this.htmStr += '</div>';

        $("#" + this.prop.type + "-" + this.prop.id + " #mContainer #rows").append(this.htmStr);

        if(($("#" + this.prop.type + "-" + this.prop.id + " #mContainer #rows").outerHeight() + $("#" + this.prop.type + "-" + this.prop.id + " #header").outerHeight() + ($("#" + this.prop.type + "-" + this.prop.id + " #mContainer #rows").children().length * 15)) > this.maxHeight){
          this.containerArr.push(this.tempArr);
          this.tempArr = [];
          i = i - 1;
          $("#" + this.prop.type + "-" + this.prop.id + " #mContainer #rows").empty();
        } else {
          this.tempArr.push({
            index: i
          });
        }
      }
      // window.getSvg('flight', 'rIcon', '#d2d2d2', '#ffffff');
      if(this.tempArr.length > 0){
        this.containerArr.push(this.tempArr);
      }

      $("#" + this.prop.type + "-" + this.prop.id + " #mContainer").empty();
      for (var j = 0; j < this.containerArr.length; j++){
        $("#" + this.prop.type + "-" + this.prop.id + " #mContainer").append('<div id="rows-' + j + '" style="' + this.visibilityCssStr + 'position:absolute;width:' + this.prop.w + 'px;"></div>');
        for (var k = 0; k < this.containerArr[j].length; k++){
          var fontFamily;
          var fontColor;
          var fontSize;
          var bg;
          if(k % 2 == 0){
            bg = window.hexToRgbA(this.settings.rowBg, this.settings.rowBga);
            fontFamily = this.settings.rowFont.value;
            fontSize = this.settings.rowSize;
          } else {
            bg = window.hexToRgbA(this.settings.altBg, this.settings.altBga);
            fontFamily = this.settings.altFont.value;
            fontSize = this.settings.altSize;
          }

          if(this.flight[this.containerArr[j][k].index].remark == 'Delayed'){
            fontColor = this.settings.delayedText;
          } else if(this.flight[this.containerArr[j][k].index].remark == 'On Time'){
            fontColor = this.settings.ontimeText;
          } else if(this.flight[this.containerArr[j][k].index].remark == 'Cancel' || this.flight[k].remark == 'Cancelled'){
            fontColor = this.settings.canceledText;
          } else if(this.flight[this.containerArr[j][k].index].remark == 'Arrived' || this.flight[k].remark == 'Departed'){
            fontColor = this.settings.arrivedText;
          } else {
            fontColor = this.settings.flight;
          }

          this.htmStr = '<div class="padLR10 d-flex align-items-center" style="font-size:' + fontSize + 'px;min-height:' + this.rowHeight + 'px;background:' + bg + ';font-family:' + fontFamily + '"><div class="text-overflow" style="width:' + this.prop.w * 0.20 + 'px;"><div class="pull-left"><div class="rIcon"></div></div><div style="margin-left:55px"><div class="flightName" style="color:' + fontColor + '">' + this.flight[this.containerArr[j][k].index].flightNo + '</div><div class="text-xs airlineName" style="color:' + this.settings.airline + '">' + this.flight[this.containerArr[j][k].index].airlineName + '</div></div></div><div class="text-overflow padLR10" style="width:' + this.prop.w * 0.30 + 'px;color:' + this.settings.city + '"><span class="text-ellipsis">' + this.flight[this.containerArr[j][k].index].city + '</span></div><div class="text-overflow padLR10" style="width:' + this.prop.w * 0.15 + 'px;color:' + this.settings.time + '">' + this.flight[this.containerArr[j][k].index].time.split(",")[1] + '</div><div class="text-overflow padLR10" style="width:' + this.prop.w * 0.15 + 'px;color:' + this.settings.terminal + '">' + this.flight[this.containerArr[j][k].index].terminal + '</div><div class="text-overflow d-flex align-items-center" style="width:' + this.prop.w * 0.20 + 'px;color:' + this.settings.statusDefault + '"><div class="text-overflow flex-grow-1 text-r marR10">' + this.flight[this.containerArr[j][k].index].remark + '</div><div class="boxIcon" style="background:' + fontColor + ';"></div></div><div class="clearfix"></div></div>';
          $("#" + this.prop.type + "-" + this.prop.id + " #mContainer #rows-" + j).append(this.htmStr);
        }
      }
      if(this.prop.transition == "f"){
        TweenMax.to($("#" + this.prop.type + "-" + this.prop.id + " #mContainer #rows-" + this.num), 0.5, {
          opacity: 1
        });
      } else {
        $("#" + this.prop.type + "-" + this.prop.id + " #mContainer #rows-" + this.num).css("visibility", "visible");
      }
      this.pageCount = 1;
      this.rotateTimer = setInterval(() => {
        if(this.prop.transition == "f"){
          TweenMax.to($("#" + this.prop.type + "-" + this.prop.id + " #mContainer #rows-" + this.num), 0.5, {
            opacity: 0
          });
        } else{
          $("#"+ this.prop.type +"-"+ this.prop.id +" #mContainer #rows-"+ this.num).css("visibility", "hidden");
        }
        this.num++;
        this.pageCount++;
        if(this.num >= $("#"+ this.prop.type +"-"+ this.prop.id +" #mContainer>div").length){
          this.num = 0;
          this.pageCount = 1;
        }
        if(this.prop.transition == "f"){
          TweenMax.to($("#"+ this.prop.type +"-"+ this.prop.id +" #mContainer #rows-"+ this.num), 0.5, {opacity:1});
        } else{
          $("#"+ this.prop.type +"-"+ this.prop.id +" #mContainer #rows-"+ this.num).css("visibility", "visible");
        }
      }, this.roDuration);
      window.addTimer(this.rotateTimer, "i", this.prop.fid);
    }
  }
}
export{WidgetFlight};