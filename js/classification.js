$(function(){
    init();
var Categories;
    //初始化
    function init(){
        setHtmlFont();
        getList();
    }
    //获取商品列表数据
    function getList(){
          //发送ajax请求
          $.get("categories",function(res){
            if(res.meta.status==200){
              //   console.log(res);
                Categories=res.data;
              
              //  console.log(Categories[0].children);
              //   var htmlStr=template("rightTemplate",{data:Categories[0].children});
              //   $(".right_menu").html(htmlStr);
              getLeftmenu();
              getRightmenu(0);
            }
          })
    }
    //获取左边数据
    function getLeftmenu(){
         //准备字符串模板
         var html=template("leftTemplate",{data:Categories});
         //渲染数据到页面上
         $(".left_menu ul").html(html);
    }
  //获取右边数据
   function getRightmenu(index){
    var htmlStr=template("rightTemplate",{data:Categories[index].children});
    $(".right_menu").html(htmlStr);
   }
   //屏幕适配
   function setHtmlFont(){
       //屏幕基础值
       var baseVal=100;
       //设计稿宽度
       var pageWidth=640;
       //当前的屏幕宽度
       var screenWidth=document.querySelector("html").offsetWidth;
       //字体大小
       var fs=screenWidth*baseVal/pageWidth;
       //把字体设置到html里面
       document.querySelector("html").style.fontSize=fs+'px';
   }
   //屏幕改变重新触发屏幕适配
   window.onreset=function(){
    setHtmlFont();
   }
})