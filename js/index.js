$(function () {
    init();
 //初始化数据
    function init() {
        getSlides();
        getNav();
        getList()
    }
   //获取轮播图数据
    function getSlides() {
        //发生ajax请求
        $.get("home/swiperdata", function (result) {
            if (result.meta.status == 200) {
                //成功
                //准备生成模板
                var htmStr = template("sliderTempalte", {data:result.data});
                //渲染数据到页面上
                $(".sliders").html(htmStr);
                //获得slider插件对象
                var gallery = mui('.mui-slider');
                gallery.slider({
                    interval: 1000 //自动轮播周期，若为0则不自动播放，默认为0；
                });
            } else {
                //失败
                console.log(result);
            }

        })
    }
    //获取导航数据
    function getNav(){
     //发送ajax请求
     $.get("home/catitems",function(result){
         if(result.meta.status==200){
             //准备生成模板
             var htmlStr=template("navTemplate",{data:result.data});
             //渲染数据到页面上
             $(".nav").html(htmlStr);
         }else{
             console.log(result);
         }
     })
    }
    //获取商品列表数据
   function getList(){
       //发送ajax请求
       $.get("home/goodslist",function(res){
           if(res.meta.status==200){
               //成功。准备生成模板
               var html=template("listTemplate",{data:res.data});
               //渲染数据到页面上
               $(".lists").html(html);
           }
       })
   }
})