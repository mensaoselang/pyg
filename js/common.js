$(function(){
    //公共路劲
    var baseUrl="http://api.pyg.ak48.xyz/api/public/v1/";
    //设置拦截器
    //ajax发送前调用
    $.ajaxSettings.beforeSend = function (xhr, obj) {
        console.log(xhr);
        obj.url = baseUrl  + obj.url;
        //显示正在等待 
       $("body").addClass("waiting");
      }
      //ajax发送结束后调用

    $.ajaxSettings.complete=function(){
       
        $("body").removeClass("waiting");
     }

})