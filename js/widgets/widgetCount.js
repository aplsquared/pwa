class WidgetCount{
  constructor(prop){
    this.settings = testJSON(prop.settings);
    this.mInterval = 10000; //3600000
    this.interval = null;
    this.textStr = "";
    this.htmStr = "";
    this.prop = prop;
    this.start = "";
    this.end = "";
    this.count = 0;
    this.now = "";
    this.time = 0;

    if(this.prop.dtype == "d"){
      if(this.settings.down.type == 'a'){
        this.count = this.settings.down.end;
      } else if(this.settings.down.type == 'c'){
        this.count = 0;
        this.now = new Date().getTime();
        this.end = Date.parse(this.settings.down.dateStr + " " + this.settings.down.timeStr);
        if(this.now < this.end){
          if(this.settings.cType == 's'){
            this.count = (this.end - this.now) / 1000;
          } else if(this.settings.cType == 'm'){
            var sec = (this.end - this.now) / 1000;
            this.count = Math.floor(sec / 60);
          } else if(this.settings.cType == 'h'){
            var sec = (this.end - this.now) / 1000;
            this.count = Math.floor(sec / 3600);
          } else if(this.settings.cType == 'd'){
            var sec = (this.end - this.now) / 1000;
            this.count = Math.floor(sec / (3600 * 24));
          } else if(this.settings.cType == 'w'){
            var sec = (this.end - this.now) / 1000;
            this.count = Math.floor(sec / (3600 * 24 * 7));
          } else if(this.settings.cType == 'M'){
            var sec = (this.end - this.now) / 1000;
            this.count = Math.floor(sec / (3600 * 24 * 30));
          }
          this.count = parseInt(this.count);
        }
      }
    } else if(this.prop.dtype == "u"){
      if(this.settings.up.type == "a"){
        this.count = 0;
      } else if(this.settings.up.type == "c"){
        this.count = 0;
        this.now = new Date().getTime();
        this.start = Date.parse(this.settings.up.dateStr + " " + this.settings.up.timeStr);
      }
    }

    this.htmStr = '<div id="count-' + this.prop.id + '" style="width:' + this.prop.w + 'px;height:' + this.prop.h * 0.85 + 'px;background-color:' + window.hexToRgbA(this.settings.bg, this.settings.bga) + '">'
    this.htmStr += '</div>';
    setTimeout(() => {
      this.loadContent()
    }, 200);
    return this.htmStr;
  }

  loadContent(){
    if(this.settings.cType == 's'){
      this.time = 1000;
    } else if(this.settings.cType == 'm'){
      this.time = 60000;
    } else if(this.settings.cType == 'h'){
      this.time = 60 * 60 * 1000;
    } else if(this.settings.cType == 'd'){
      this.time = 60 * 60 * 1000 * 24;
    } else if(this.settings.cType == 'w'){
      this.time = 60 * 60 * 1000 * 24 * 7;
    } else if(this.settings.cType == 'M'){
      this.time = 60 * 60 * 1000 * 24 * 30;
    }

    this.textStr = '<div id="countBox-'+ this.prop.fid +'" style="width:'+ this.prop.w +'px;height:'+ this.prop.h +'px;background:"'+ window.hexToRgbA(this.settings.bg, this.settings.bga) +'">';
    if(this.settings.title){
      this.textStr += '<div class="d-flex align-items-center"><div id="title" class="text-ellipsis" style="font-size:'+ this.settings.titleSize +'px;color:'+ this.settings.titleText +';font-family:'+ this.settings.titleFont.value +'">'+ this.settings.title +'</div><div id="cnt" style="font-size:'+ this.settings.countSize +'px;color:'+ this.settings.countText +';font-family:'+ this.settings.countFont.value +'">'+ this.count +'</div></div>';
    } else {
      this.textStr += '<div id="cnt" style="font-size:'+ this.settings.countSize +'px;color:'+ this.settings.countText +';font-family:'+ this.settings.countFont.value +'">'+ this.count +'</div>';
    }
    this.textStr += '</div>';
    $("#count-" + this.prop.id).html(this.textStr);

    if(this.settings.titleP == 't'){
      $('#countBox-' + this.prop.fid).addClass('countPT');
      $('#countBox-' + this.prop.fid + ' > div').removeClass('d-flex');
    } else if(this.settings.titleP == 'b'){
      $('#countBox-' + this.prop.fid).addClass('countPT');
      $('#countBox-' + this.prop.fid + ' > div').addClass('d-grid').removeClass('d-flex');
      $('#countBox-' + this.prop.fid + ' #title').css('grid-row', '2');
    } else if(this.settings.titleP == 'r'){
      $('#countBox-' + this.prop.fid + ' #title').css('order', '2');
      $('#countBox-' + this.prop.fid + ' #cnt').css('order', '1');
      $('#countBox-' + this.prop.fid + ' #cnt').addClass('marR5');
    } else if(this.settings.titleP == 'l'){
      $('#countBox-' + this.prop.fid + ' #title').css('order', '1');
      $('#countBox-' + this.prop.fid + ' #cnt').css('order', '2');
      $('#countBox-' + this.prop.fid + ' #title').addClass('marR5');
    }
    this.startTimerFx(this.count);
  }
  getTimeDifference(now, start, type){
    // console.log('Time Difference', type);
    // console.log('Time Difference Now', now);
    // console.log('Time Difference Start', start);
    if(type == 's'){
      return Math.abs(parseInt((now - start)/1000));
    } else if(type == 'm'){
      return Math.abs(parseInt((now - start)/60000));
    } else if(type == 'h'){
      return Math.abs(parseInt((now - start)/60000));
      // return parseInt((now - start)/3600000);
    } else if(type == 'd'){
      var oneDay = 24 * 60 * 60 * 1000;
      return Math.abs(parseInt((now - start)/oneDay));
    } else if(type == 'w'){
      var oneWeek = 7 * 24 * 60 * 60 * 1000;
      return Math.abs(parseInt((now - start)/oneWeek));
    } else if(type == 'M'){
      var oneMonth = 30 * 24 * 60 * 60 * 1000;
      return Math.abs(parseInt((now - start)/oneMonth));
    } else {
      return 0;
    }
  }
  startTimerFx(count){
    // Display Type Down
    if(this.prop.dtype == "d"){
      if(count > 0){
        var intervalTime = this.time;
        var timerCount = count;
        if(this.settings.down.type == 'c'){
          var timerCount = this.getTimeDifference(this.now, this.end, this.settings.cType);
          if(this.settings.cType == 'm'){
            var ts = Math.abs(this.now - this.end);
            intervalTime = ts % 60000;
          } else if(this.settings.cType == 'h'){
            if(timerCount >= 60){
              timerCount = parseInt(timerCount / 60);
            } else {
              timerCount = 0;
            }
            var ts = Math.abs(this.now - this.end);
            intervalTime = ts % 3600000;
          } else if(this.settings.cType == 'd'){
            var ts = Math.abs(this.now - this.end);
            intervalTime = ts % 86400000;
          } else if(this.settings.cType == 'w'){
            var ts = Math.abs(this.now - this.end);
            intervalTime = ts % 604800000;
          }
        }
        if(this.settings.cType == 'M'){
          intervalTime = this.mInterval;
        }
        this.currentTime = new Date().getTime();
        // console.log('outer interval down', intervalTime);
        this.outerInterval = setInterval(() => {
          if(this.settings.cType == 'M'){
            if(this.settings.down.type == 'c'){
              if(timerCount > 0){
                timerCount = this.getTimeDifference(new Date().getTime(), this.end, this.settings.cType);
                intervalTime = this.mInterval;
              }
            } else {
              var count = this.getTimeDifference(this.currentTime, new Date().getTime(), this.settings.cType);
              if(count > 0){
                timerCount = timerCount - count;
                this.currentTime = new Date().getTime();
                if(timerCount == 0){
                  clearInterval(this.outerInterval);
                  window.addTimer(this.outerInterval, "i", this.prop.fid);
                }
              }
            }
            $('#countBox-' + this.prop.fid + ' #cnt').html(timerCount);
            if(timerCount == 0){
              if(this.settings.down.type == 'c'){
                clearInterval(this.outerInterval);
                window.addTimer(this.outerInterval, "i", this.prop.fid);
              }
            }
          } else {
            clearInterval(this.outerInterval);
            timerCount = timerCount - 1;
            $('#countBox-' + this.prop.fid + ' #cnt').html(timerCount);
            // if(timerCount == 0){
            //     clearInterval(this.outerInterval);
            //     window.addTimer(this.outerInterval, "i", this.prop.fid);
            // }
            if(timerCount > 0){
              if(this.settings.cType == 's'){
                intervalTime = 1000;
              } else if(this.settings.cType == 'm'){
                intervalTime = 60000;
              } else if(this.settings.cType == 'h'){
                intervalTime = 3600000;
              } else if(this.settings.cType == 'd'){
                intervalTime = 86400000;
              } else if(this.settings.cType == 'w'){
                intervalTime = 604800000;
              }
              // console.log('inner interval down', intervalTime);
              this.interval = setInterval(() => {
                timerCount = timerCount - 1;
                if(timerCount == 0){
                  clearInterval(this.interval);
                }
                $('#countBox-' + this.prop.fid + ' #cnt').html(timerCount);
              }, intervalTime);
              window.addTimer(this.interval, "i", this.prop.fid);
            }
          }
        }, intervalTime);
        window.addTimer(this.outerInterval, "i", this.prop.fid);
      }
    } else{//Up
      var timerCount = count;
      var intervalTime = this.time;
      if(this.settings.up.type == 'c'){
        if(this.now < this.start){
          // console.log("Now is smaller than start", this.start, this.prop);
          var diffCount = this.getTimeDifference(this.now, this.start, this.settings.cType);
          this.outerInterval = setInterval(() => {
            var isTrue = (new Date().toString() == new Date(this.start).toString() ? true : false);
            if(isTrue){
              clearInterval(this.outerInterval);
              if(this.settings.cType == 'h'){
                intervalTime = 60 * 60 * 1000;
              } else if(this.settings.cType == 'd'){
                intervalTime = 60 * 60 * 1000 * 24;
              } else if(this.settings.cType == 'w'){
                intervalTime = 60 * 60 * 1000 * 24 * 7;
              } else if(this.settings.cType == 'M'){
                this.start = new Date().getTime();
                intervalTime = this.mInterval;
              }
              // console.log("Interval up ===", intervalTime);
              this.interval = setInterval(() => {
                if(this.settings.cType == 'M'){
                  timerCount = this.getTimeDifference(new Date().getTime(), this.start, this.settings.cType);
                } else {
                  timerCount = timerCount + 1;
                }
                $('#countBox-' + this.prop.fid + ' #cnt').html(timerCount);
              }, intervalTime);
              window.addTimer(this.interval, "i", this.prop.fid);
            }
          }, 1000);
          window.addTimer(this.outerInterval, "i", this.prop.fid);
        } else {
          // console.log("Now is greater than start", this.start, this.prop);
          // get time difference
          var diffCount = this.getTimeDifference(this.now, this.start, this.settings.cType);
          var intervalTime = this.time;
          if(this.settings.cType == 'm'){
            var ts = Math.abs(new Date().getTime() - this.start);
            intervalTime = 60000 - (ts % 60000);
          } else if(this.settings.cType == 'h'){
            if(diffCount > 60){
              diffCount = parseInt(diffCount / 60);
            } else {
              diffCount = 0;
            }
            var ts = Math.abs(this.now - this.start);
            intervalTime = 3600000 - (ts % 3600000);
          } else if(this.settings.cType == 'd'){
            var timestamp = Math.abs(this.now - this.start);
            var day = parseInt(timestamp / 86400000);
            var remainingTimeStamp = timestamp - (day * 86400000);
            intervalTime = Math.abs(remainingTimeStamp - 86400000);
          } else if(this.settings.cType == 'w'){
            var timestamp = Math.abs(this.now - this.start);
            var week = parseInt(timestamp / 604800000);
            var remainingTimeStamp = timestamp - (week * 604800000);
            intervalTime = Math.abs(remainingTimeStamp - 604800000);
          } else if(this.settings.cType == 'M'){
            intervalTime = this.mInterval;
          }
          $('#countBox-' + this.prop.fid + ' #cnt').html(diffCount);
          // console.log("Interval up1", intervalTime);
          this.outerInterval = setInterval(() => {
            clearInterval(this.outerInterval);
            if(this.settings.cType == 's'){
              diffCount = diffCount + 1;
              intervalTime = 1000;
            } else if(this.settings.cType == 'm'){
              diffCount = diffCount + 1;
              intervalTime = 60000;
            } else if(this.settings.cType == 'h'){
              diffCount = diffCount + 1;
              intervalTime = 60 * 60 * 1000;
            } else if(this.settings.cType == 'd'){
              diffCount = diffCount + 1;
              intervalTime = 60 * 60 * 1000 * 24;
            } else if(this.settings.cType == 'w'){
              diffCount = diffCount + 1;
              intervalTime = 60 * 60 * 1000 * 24 * 7;
            }
            // console.log("final interval", intervalTime);
            $('#countBox-' + this.prop.fid + ' #cnt').html(diffCount);
            this.interval = setInterval(() => {
              if(this.settings.cType == 'M'){
                diffCount = this.getTimeDifference(new Date().getTime(), this.start, this.settings.cType);
                intervalTime = this.mInterval;
              } else {
                diffCount = diffCount + 1;
              }
              // console.log("this is working", diffCount);
              $('#countBox-' + this.prop.fid + ' #cnt').html(diffCount);
            }, intervalTime);
            window.addTimer(this.interval, "i", this.prop.fid);
          }, intervalTime);
          window.addTimer(this.outerInterval, "i", this.prop.fid);
        }
      } else {
        // When widget load
        var intervalTime = this.time;
        if(this.settings.cType == 'M'){
          this.start = new Date().getTime();
          intervalTime = this.mInterval;
        }
        this.interval = setInterval(() => {
          if(this.settings.cType == 'M'){
            timerCount = this.getTimeDifference(new Date().getTime(), this.start, this.settings.cType);
          } else{
            timerCount = timerCount + 1;
          }
          $('#countBox-' + this.prop.fid + ' #cnt').html(timerCount);
        }, intervalTime);
        window.addTimer(this.interval, "i", this.prop.fid);
      }
    }
  }
}
export{WidgetCount};