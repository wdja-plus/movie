//幻灯js开始
var mySwiper = new Swiper ('.swiper-container', {
autoplay: {
  delay:3000,//秒            
  disableOnInteraction: false,//滑动不会失效
  reverseDirection: false,//如果最后一个 反向播放
},
loop: true,//轮播
followFinger: false,//手指滑动完毕在动
// 如果需要分页器
pagination: {
  el: '.swiper-pagination',
  clickable: true,
  renderBullet: function (index, className) {
    return '<span class="' + className + '">' + (index + 1) + '</span>';
  },
},

// 如果需要前进后退按钮
navigation: {
  nextEl: '.swiper-button-next',
  prevEl: '.swiper-button-prev',
},
});
//幻灯js结束

//菜单js开始
  var curPageUrl = window.document.location.href;
  var rootPath = curPageUrl.split("//")[0] + '//' + curPageUrl.split("//")[1].split("/")[0] + '/' + curPageUrl.split("//")[1].split("/")[1];
  var pobj = nav.getElementsByTagName('a');
  var awidth = 100/pobj.length;
  for(i = 0; i<pobj.length; i++){
    on(pobj[i], "mouseover", onMouseOver);
    on(pobj[i], "mouseout", onMouseOut);
    if(pobj[i].href + '/' == rootPath || pobj[i].href == rootPath) pobj[i].className = 'nav-link active';
    else pobj[i].className = 'nav-link';
  }
  function onMouseOver(e){
    clearClass();
    this.className = 'nav-link active';
  }
  function onMouseOut(e){
    clearClass();
    if(this.href + '/' == rootPath || this.href == rootPath){
      this.className = 'nav-link active';
    }else{
      on(nav, "mouseout", addClass);
    }
  }
  function addClass(){
    var pobj = nav.getElementsByTagName('a');
    for(i = 0; i<pobj.length; i++){
      if(pobj[i].href + '/' == rootPath || pobj[i].href == rootPath) pobj[i].className = 'nav-link active';
      else pobj[i].className = 'nav-link';
    }
  }
  function clearClass(){
    var pobj = nav.getElementsByTagName('a');
    for(i = 0; i<pobj.length; i++){
      pobj[i].className = 'nav-link';
    }
  }
  function on(element, type, callback) {
    if (element.addEventListener) {
      if (type.slice(0,2) === "on") type = type.slice(2);
      element.addEventListener(type, callback);
    } else {
      if (type.slice(0, 2) !== "on") type = "on" + type;
      element.attachEvent(type, callback);
    }
  }
//菜单js结束