
function pop_close()
{
  get_id("pop_mask").style.display = 'none';
  get_id("pop_page").style.display = 'none';
  get_id("pop_add").style.display = 'none';
  get_id("pop_edit").style.display = 'none';
  get_id("pop_mask").className = 'popup_mask';
  get_id("pop_page").className = 'popup_page';
}

function pop_display(strid)
{
  get_id("pop_mask").style.display = 'block';
  get_id("pop_page").style.display = 'block';
  get_id("pop_add").style.display = 'block';
  get_id("pop_mask").className = 'popup_mask on';
  get_id("pop_page").className = 'popup_page on';
  get_id("strid").value = strid;
}

function add_ok(strid){
	var img_title = get_id("img_title").value ;
	var img_desc = get_id("img_desc").value ;
	var img_url = get_id("img_url").value ;
	var opname = img_title ;
	var opvalue = img_title+"#:#"+img_desc+"#:#"+img_url ;
	if (img_title == "" || img_title.length == 0){
		alert('标题不能为空');
	}
	else if (img_url == "" || img_url.length == 0){
		alert('请上传附件');
	}
	else{
		selects.add(get_id(strid), opname, opvalue);
		get_id("img_title").value = '';
		get_id("img_desc").value = '';
		get_id("img_url").value = '';
		alert('上传附件成功');
	}
}

function edit_display(strers)
{
  get_id("pop_mask").style.display = 'block';
  get_id("pop_page").style.display = 'block';
  get_id("pop_edit").style.display = 'block';
  get_id("pop_mask").className = 'popup_mask on';
  get_id("pop_page").className = 'popup_page on';
}

function edit_img(strid, strvalue)
{
    if(strvalue == "" || strvalue == null || strvalue == undefined){
         alert('不能为空');
    }else{
    edit_display();
    var img_array= new Array(); //定义一数组
    img_array = strvalue.split("#:#");;
	get_id("edit_title").value = img_array[0];
	get_id("edit_desc").value = img_array[1];
	get_id("edit_url").value = img_array[2];
	get_id("strid").value = strid;
    }
}

function edit_ok(strid){
	var img_title = get_id("edit_title").value ;
	var img_desc = get_id("edit_desc").value ;
	var img_url = get_id("edit_url").value ;
	var opname = img_title ;
	var opvalue = img_title+"#:#"+img_desc+"#:#"+img_url ;
	if (img_title == "" || img_title.length == 0){
		alert('标题不能为空');
	}
	else if (img_url == "" || img_url.length == 0){
		alert('请上传附件');
	}
	else{
        selects.remove(get_id(strid));
		selects.add(get_id(strid), opname, opvalue);
		get_id("edit_title").value = '';
		get_id("edit_desc").value = '';
		get_id("edit_url").value = '';
		alert('编辑附件成功');
	}
}

function insert_img(strid, strurl, strntype, strtype, strbase)
{
var tstrtype;
var img_arr = strurl.split("#:#");
var img_arr_len = img_arr.length - 1;
var img_url = img_arr[img_arr_len];
var img_title = img_arr[0];
var img_desc = img_arr[1];
  if (strtype == -1)
  {tstrtype = strntype;}
  else
  {
    var thtype = request["htype"];
    if (thtype == undefined)
    {tstrtype = strtype;}
    else
    {tstrtype = get_num(thtype);}
  }
  var file_type = get_file_type(strurl);
  switch (tstrtype)
  {
    case 0:
      if(file_type =='mp4' || file_type == 'avi' || file_type == 'webm' || file_type == 'ogg'){
      	editor_insert(strid, "<p style=\"text-align: center;\"><video controls=\"controls\" src=\"" + img_url + "\" id=\"ckplayer_a1\" style=\"width:85%;max-width:750px;margin:0 auto;\" loop=\"loop\" poster=\"\" webkit-playsinline=\"\"></video></p>");
      }else if(file_type =='pdf'){
      	editor_insert(strid, "<p style=\"text-align: left;\"><strong><a href=\"" + img_url + "\" download>" + img_title + "</a></strong></p>");
      }else if(file_type =='zip'|| file_type =='rar'){
      	editor_insert(strid, "<p style=\"text-align: left;\"><strong><a href=\"" + img_url + "\" download>" + img_title + "</a></strong></p>");
      }else{
     	 editor_insert(strid, "<img src=\"" + img_url + "\" title=\"" + img_title + "\" alt=\"" + img_desc + "\" border=\"0\">");
      }
      break;
    case 1:
      itextner(strid, "[img]" + img_url + "[/img]");
      break;
    case 3:
      itextner(strid,  "<img src=\"" + img_url + "\" border=\"0\">");
      break;
  }
}