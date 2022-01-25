var nstars = new Array();
var nstarvalue = get_id('starsHiddenInput').value;
if (nstarvalue != null) {
    nstars = nstarvalue.split(",");
    set_stars(nstars);
}

function del_arr(arr,val){
  var arr = arr.filter(function(item){
     return item != val;
 });
 return arr;
}

function get_star(str) {
    var nstarvalue = get_id('starsHiddenInput').value;
    if (nstarvalue != null) {
        nstars = nstarvalue.split(",");
    }
    nstars.push(str);
    nstars = clearAry(nstars);
    set_stars(nstars);
    get_id('starsInput').focus();
}

function del_star(str) {
    nstars = del_arr(nstars,str);
    set_stars(nstars);
    get_id('starsInput').focus();
}

function set_stars(nstars) {
    var nstarhtml = '';
    var nstarvalue = '';
    for (var i = 0; i < nstars.length; i++) {
        if (nstars[i] != 'undefined' && nstars[i] != '' && nstars[i] != null) {
            nstarhtml += '<div class="star-checked-name">' + nstars[i] + '<em onclick="del_star(\'' + nstars[i] + '\')"></em></div>';
            nstarvalue += nstars[i] + ',';
        }
    }
    nstarvalue = nstarvalue.substring(0, nstarvalue.lastIndexOf(','));
    get_id('wordstars').innerHTML = nstarhtml;
    get_id('starsInput').value = '';
    get_id('starsHiddenInput').value = nstarvalue;
    if (get_id('stars_list')) get_id('stars_input').removeChild(get_id('stars_list'));
}

function clearAry(arr) {
    var arr = arr || [];
    var obj = {},
    res = [];
    for (var i = 0,
    ilen = arr.length; i < ilen; i += 1) {
        var curItem = arr[i],
        curItemType = typeof(curItem) + curItem;
        if (obj[curItemType] !== 1) {
            res.push(curItem);
            obj[curItemType] = 1;
        }
    }
    return res;
}

function get_stars(str) {
    str = str.replace(/(^\s*)|(\s*$)/g,"");
    if (str != '' && str != null) {
        var domain = document.domain;
        var port = window.location.port;
        var url = '//' + domain + ':' + port + '/stars/api.php?q=' + str;
        var ajax = createXMLHttpRequest();
        ajax.open('get', url);
        ajax.send(null);
        ajax.onreadystatechange = function() {
            if (ajax.readyState == 4 && ajax.status == 200) {
              if(ajax.responseText){
                var ostars = JSON.parse(ajax.responseText);
                    if (get_id('stars_list')) get_id('stars_input').removeChild(get_id('stars_list'));
                    var dvleft = get_id('starsInput').offsetLeft;
                    var dvObj = '<div id="stars_list" style="width: 300px; border: 1px solid #4abee0; font-size:1.2rem;position: absolute;top:42px;left:' + dvleft + 'px;background:#fff;overflow:hidden;z-index:999;"></div>';
                    get_id('stars_input').innerHTML = get_id('stars_input').innerHTML + dvObj;
                    var $bool = true;
                    var pObjs = '';
                    for (var i = 0; i < ostars.length; i++) {
                        var name = ostars[i]['topic'];
                        if(name == str) $bool = false;//如果当前内容已存在对应标签,则不插入当前内容到标签列表
                        var pObj = '<p style="cursor: pointer; margin: 5px;" onclick="get_star(this.innerText);">' + name + '</p>';
                        pObjs = pObjs + pObj;
                    }
                    var pStr = '<p style="cursor: pointer; margin: 5px;" onclick="get_star(this.innerText);">' + str + '</p>';
                    if($bool) get_id('stars_list').innerHTML = get_id('stars_list').innerHTML + pStr;
                    get_id('stars_list').innerHTML = get_id('stars_list').innerHTML + pObjs;
                    get_id('starsInput').focus();
                    get_id('starsInput').value = str;
              } else {
                get_id('starsInput').onmouseleave=function(){
                    get_star(str);
                    str = '';
                }
                if (get_id('stars_list')) get_id('stars_input').removeChild(get_id('stars_list'));
              }
            } else {
                if (get_id('stars_list')) get_id('stars_input').removeChild(get_id('stars_list'));
            }
        }
    } else {
        if (get_id('stars_list')) get_id('stars_input').removeChild(get_id('stars_list'));
    }
}