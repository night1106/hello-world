var c = document.getElementById("myclock");
var ctx=c.getContext("2d");

var ww=$(window).outerWidth();
var wh=$(window).outerHeight();

c.width=ww;
c.height=wh;

var center={
  x:ww/2,
  y:wh/2
}

function getWindowSize(){
  ww=$(window).outerWidth();
  wh=$(window).outerHeight();
  c.width=ww;
  c.height=wh;
  
  center={
  x:ww/2,
  y:wh/2
}
  
  ctx.restore();
  ctx.translate(center.x,center.y);
}
$(window).resize(getWindowSize);
getWindowSize();


var time=0;

//設定十毫秒一次
setInterval(draw,10);

function draw(){
  //bg
  ctx.fillStyle="#111";
  ctx.beginPath();
  ctx.rect(-2000,-2000,4000,4000);
  ctx.fill();
  
  ctx.strokeStyle="rgba(255,255,255,0.1)";
  ctx.lineWidth=1;
  
  //座標軸
  ctx.beginPath();
  ctx.moveTo(-ww/2,0);
  ctx.lineTo(ww/2,0); 
  ctx.moveTo(0,-wh/2);
  ctx.lineTo(0,wh/2);
  ctx.stroke();
  
  
  //----------------------------------------
  //circle
  var cr = 200;
  var deg_to_pi = Math.PI/180;
  
  
  ctx.beginPath();
  ctx.lineWidth=2;
  
  //i = 0 1 2 3 .........
  //360/4=90
  for(var i=0;i<=200;i++){
    var now_r= cr+ 1*Math.sin(Math.PI*2*i/10+ time/25 )*2;
    var deg = (i/200) *  360  * deg_to_pi;
    
    ctx.lineTo( 
      now_r*Math.cos(deg),
      now_r*Math.sin(deg) 
    );
  }
  ctx.strokeStyle="white";
  ctx.stroke();
  
  //外患
  var r=300;
  var count=240;
  ctx.beginPath();
  ctx.lineWidth=4;
  for(var i=0;i<=count;i++){
    //將240個點平均分布在圓周上，加上一點點時間
    deg= 360 * ( i / count) + time / 200;
    //如果每180度以內餘數 > 90度
    if ( ( deg % 180 ) > 90 ){
      //如果成立就預設要畫
      ctx.lineTo(
        r * Math.cos( deg * deg_to_pi),
        r * Math.sin( deg * deg_to_pi)
      );
    }else{
      //不成立就只移動點，不繪製
      ctx.moveTo(
        r * Math.cos( deg * deg_to_pi),
        r * Math.sin( deg * deg_to_pi)
      );
    }
  }
  //設定樣式跟繪製
  ctx.strokeStyle="#FCFAF9";
  //將剛剛預設要畫的都畫出來
  ctx.stroke();
  //刻度
  var r= 220;
  var count =120;
  var text=1;
  
  for(var i=0;i<count;i++){
    var deg =360 *(i/count)*deg_to_pi;
    
    ctx.beginPath();
    if(i%10==0){
      ctx.lineWidth=5;
      ctx.moveTo(r*Math.cos(deg),r*Math.sin(deg));
      ctx.lineTo((r+15)*Math.cos(deg),(r+15)*Math.sin(deg));
    }
    else if(i%5==0){
      ctx.lineWidth=3;
      ctx.moveTo(r*Math.cos(deg),r*Math.sin(deg));
      ctx.lineTo((r+8)*Math.cos(deg),(r+8)*Math.sin(deg));
    }
    else{
      ctx.lineWidth=1;
      ctx.moveTo(r*Math.cos(deg),r*Math.sin(deg));
      ctx.lineTo((r+5)*Math.cos(deg),(r+5)*Math.sin(deg));
    }
    
    ctx.strokeStyle="rgba(255,255,255,0.5)";
    ctx.stroke();
  }
  
  //num
  for(var i=0;i<=count;i++){
    
  }
  
  //外圈
  var rr=400;
  
  for(var i=0;i<60;i++){
    var deg =360 *(i/60)*deg_to_pi;
    
    ctx.beginPath();
    if(i%10==0){
      ctx.lineWidth=2;
      ctx.moveTo(rr*Math.cos(deg),rr*Math.sin(deg));
      ctx.lineTo((rr+10)*Math.cos(deg),(rr+10)*Math.sin(deg));
    }
    else{
      ctx.lineWidth=1;
      ctx.moveTo(rr*Math.cos(deg),rr*Math.sin(deg));
      ctx.lineTo((rr+5)*Math.cos(deg),(rr+5)*Math.sin(deg));
    }
    ctx.strokeStyle="rgba(255,255,255,0.9)";
    ctx.stroke();
  }
  
  
  //-------
  var now =new Date();
  var sec=now.getSeconds();
  var min=now.getMinutes();
  var hour=now.getHours();
  
  $(".time").text("00:"+hour+":"+min+":"+sec);
  
  function drawPointer(r,deg,lineWidth){
    ctx.beginPath();
    ctx.lineWidth=lineWidth;
    
    var now_deg=deg +90;
    
    ctx.moveTo(0,0);
    ctx.lineTo(r*Math.cos(now_deg*deg_to_pi),r*Math.sin(now_deg*deg_to_pi));
    ctx.stroke();
  }
  drawPointer(330,-360*(sec/60),2);
  drawPointer(180,-360*(min/60),5);
  drawPointer(140,-360*(hour+min/60)/12.0,8);
  
  
  time+=1;
}