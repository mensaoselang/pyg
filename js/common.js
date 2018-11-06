$(function(){
    //公共路劲
    var baseUrl="http://api.pyg.ak48.xyz/api/public/v1/";
    //设置拦截器
    $.ajaxSettings.beforeSend = function (xhr, obj) {
        console.log(xhr);
        obj.url = baseUrl  + obj.url;
      }
})