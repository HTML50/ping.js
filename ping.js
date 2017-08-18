'use strit'
function Ping(param){
      this.url = param.url || '' ;
      this.frequency = param.frequency || 5000;
      this.mode = param.mode || 'graph';
      this.node = param.node;
 
    this.stop = function(){
      clearTimeout(ID);
      return 'ping stopped'
    }
    
    this.start = function(){
      ping();
      return 'ping started'
    }
    
    
      let img = new Image(),
      _this = this,
      beginTime,time,ID;
    
    
      img.onload = reply;
      img.onerror = reply;
    
      
    function ping(){
       beginTime = new Date().getTime();
       img.src = _this.url +'?' + beginTime ;
    }
    
    function reply(e){
      time = new Date().getTime() - beginTime;
      ID = setTimeout(ping,_this.frequency);
      var output;
      
      if(_this.mode === 'text'){
        output = time +' ms';
      }else{
        var img;
        if(time > 2000){
          img = 'error'
        }else if(time>1000){
          img = 'bad'
        }else if(time>500){
          img = 'slow'
        }else if(time>300){
          img = 'fine'
        }else if(time>50){
          img = 'good'
        }else{
          img = 'excellent'
        }
        output = '<img src="img/'+img+'.png" title="'+time+' ms" style="height:64px">'
      }
      _this.node.innerHTML = output;
    }
     
    return this.start();
}