webpackJsonp([6],{3:function(t,e){},36:function(t,e){},60:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=i(20),s=i.n(n),o=i(21),a=i.n(o),r=i(0),c=i(2),h=i.n(c),l=i(3),u=(i.n(l),i(36));i.n(u);h.a.attach(document.body,{});var d=function(){function t(e,i,n){var o=this;s()(this,t),this.ox=i,this.oy=n,this.xpos=0,this.ypos=0,this.vx=0,this.vy=0,this.mass=1,this.number=e,this.w=260,this.delay=Math.random(),this.tdelay=0,this.dom=document.createElement("div"),this.dom.className="present present-"+Math.ceil(9*Math.random()),this.dom.style.transform="translate3d(0px, "+this.oy+"px, 0)",this.dom.style.left=Math.random()*this.w+i-this.w/2+"px",this.dom.addEventListener("click",function(){o.dom.className="present click"})}return a()(t,[{key:"add",value:function(t){t.appendChild(this.dom)}},{key:"setPosition",value:function(t,e){this.dom.style.transform="translate3d("+t+"px, "+e+"px, 0)"}},{key:"setVisible",value:function(t){this.dom.style.display=t?"block":"none"}},{key:"move",value:function(t,e){++this.tdelay>12*this.number&&(this.vy+=t*this.mass,this.ypos+=this.vy,this.ypos<e&&(this.setVisible(1),this.setPosition(this.xpos,this.ypos+this.oy)))}},{key:"reset",value:function(){this.xpos=0,this.ypos=0,this.vx=0,this.vy=0,this.tdelay=0,this.setPosition(0,this.oy)}}]),t}();new r.a({el:"#app",data:function(){return{page:0,list:[],gravity:.05,floor:1e3,count:6,clickPrz:0,loading:!1}},computed:{},created:function(){},mounted:function(){},methods:{startGame:function(){if(1===this.page){for(var t=document.querySelector(".mc-content"),e=0;e<50;e++){var i=new d(e,window.innerWidth/2-30,180);this.list.push(i),i.add(t)}var n=this;window.presentTimer=requestAnimationFrame(function t(){for(var e=0;e<40;e++)n.list[e].move(n.gravity,n.floor);presentTimer=requestAnimationFrame(t)}),window.countTimer=setInterval(function(){n.count>0?n.count--:(cancelAnimationFrame(presentTimer),clearInterval(countTimer),n.clickPrz=document.querySelectorAll(".click").length,n.goPage(2))},1e3)}},resetGame:function(){if(1===this.page){for(var t=0;t<this.list.length;t++)this.list[t].reset();var e=this;window.presentTimer=requestAnimationFrame(function t(){for(var i=0;i<40;i++)e.list[i].move(e.gravity,e.floor);presentTimer=requestAnimationFrame(t)}),this.count=6,window.countTimer=setInterval(function(){e.count>0?e.count--:(cancelAnimationFrame(presentTimer),clearInterval(countTimer),e.clickPrz=document.querySelectorAll(".click").length,e.goPage(2))},1e3)}},goPage:function(t){var e=this;this.loading=!0,this.page=t,2===this.page&&this.clickPrz<1&&(this.page=3),setTimeout(function(){e.loading=!1},500)},openPrz:function(){this.loading||(window.location.href="chris_share.html")},pad2:function(t){return t<10?"0"+t:t},generateBeforeDate:function(){var t=new Date;return t.getFullYear().toString()+this.pad2(t.getMonth()+1)+this.pad2(t.getDate())+this.pad2(t.getHours())+this.pad2(t.getMinutes())+this.pad2(t.getSeconds())},backTop:function(){document.body.scrollTop=document.documentElement.scrollTop=0}}})}},[60]);