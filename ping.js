'use strict'

function Ping(param) {
    this.url = param.url || '';
    this.frequency = param.frequency || 5000;
    this.style = param.style || 'graph';
    this.timeout = param.timeout || '5000';
    this.height = param.height || 32;
    this.node = param.node || 'DOM\'s not indicated';

    this.stop = function() {
        clearTimeout(ID);
        return 'ping stopped'
    }

    this.start = function() {
        ping();
        return 'ping started'
    }


    var img = new Image(),
        _this = this,
        beginTime, time, ID;


    img.onload = reply;
    img.onerror = reply;


    function ping() {
        beginTime = new Date().getTime();
        img.src = _this.url + '?' + beginTime;
    }

    function getSpeedStatus(time) {
        if (time > _this.timeout) {
            return 'error';
        } else if (time > 1000) {
            return 'bad';
        } else if (time > 500) {
            return 'slow';
        } else if (time > 300) {
            return 'fine';
        } else if (time > 50) {
            return 'good';
        } else {
            return 'excellent';
        }
    }

    function setGraph(distance, color) {
      var process = document.getElementById('pingProcess');
        process.style.transform = 'rotate(45deg) translate(-42px,' + (distance + (Math.random() * 20)) + 'px)'
        process.style.background = color;
        process.style.color = color;
    }

    function reply(e) {
        time = new Date().getTime() - beginTime;
        ID = setTimeout(ping, _this.frequency);
        var output;

        if (_this.style === 'text') {
            output = time + ' ms';
        } else if (_this.style === 'image') {
            var img = getSpeedStatus(time);
            output = '<img src="img/' + img + '.png" title="' + time + ' ms" style="height:'+_this.height+'px">'
        } else{
            var ele = document.getElementById('pingGraphDIV'),
                speed = getSpeedStatus(time);;
                console.log(speed)
            if (!ele) {
                _this.node.innerHTML = '<graph id="pingGraphDIV">\
            <graph class="ping-triangle">\
                <graph id="pingProcess" class=""></graph>\
            </graph>\
          </graph>'

          var style = document.createElement("style");
          document.head.appendChild(style);
          style.sheet.insertRule('#pingGraphDIV{width:200px;height:200px;overflow:hidden;border-right:2px #000 solid;border-bottom:2px #000 solid;margin:20px auto;display:block;zoom:1}', 0);
          style.sheet.insertRule('#pingGraphDIV graph{display:block}', 0);
          style.sheet.insertRule('.ping-triangle{width:289px;height:287px;transform:rotateZ(45deg) translate(82px,0);border:2px #000 solid;overflow:hidden}', 0);
          style.sheet.insertRule('#pingProcess{background:#fff;color:#fff;width:202px;height:200px;transform:rotate(45deg) translate(-42px,100px);transition:transform 2s,background 2s,color 2s;animation:moving 3s infinite}', 0);
          style.sheet.insertRule('@keyframes moving{0%{box-shadow:0 0 0 0 currentColor}50%{box-shadow:0 0 0 5px currentColor}100%{box-shadow:0 0 0 0 currentColor}}', 0);
          }

            if (speed === 'error') {
                setGraph(300, 'red');
            } else if (speed === 'bad') {
                setGraph(250, 'red');
            } else if (img === 'slow') {
                setGraph(200, '#ffd56c');
            } else if (speed === 'fine') {
                setGraph(180, 'yellow');
            } else if (speed === 'good') {
                setGraph(130, '#7cca0a');
            } else {
                setGraph(107, 'green');
            }
            document.getElementById('pingGraphDIV').style.zoom = _this.height/200;
            return true;
        } 
        _this.node.innerHTML = output;
    }

    return this.start();
}