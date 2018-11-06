$(function(){
    //定义左侧滚动条对象
    var LeftScroll;
    init();
var Categories;
    //初始化
    function init(){
        setHtmlFont();
        // getList();
        renderMain();
        eventList();
    }
    //数据渲染
    function renderMain(){
     //获取本地存储中的分类数据
     var localDataStr=sessionStorage.getItem("cates");
     //判断是否存在本地数据
     if(!localDataStr){
         //发送请求获取数据
         getList();
     }else{
        var localData=JSON.parse(localDataStr);//将json字符串解析成对象
        //判断数据是否过期
        if(Date.now()-localData.time>360000){
            //过期重新请求数据
            getList();
        }else{
         Categories=localData.data;
         getLeftmenu();
         getRightmenu(0);
        }
     }

    }
    //注册事件
    function eventList(){
        //委托注册左侧点击事件
        $(".left_menu").on("tap","li",function(){
        //   console.log(this);
        //点击激活
        $(this).addClass("active").siblings().removeClass("active");
        //获得当前点击索引
        var index=$(this).index();
        //右侧跟随改变
        getRightmenu(index);
        //点击置顶
        LeftScroll.scrollToElement(this);
        })
    }
    //获取商品列表数据
    function getList(){
          //发送ajax请求
          $.get("categories",function(res){
            if(res.meta.status==200){
              //   console.log(res);
                Categories=res.data;
              //将数据存入本地存储
              sessionStorage.setItem("cates",JSON.stringify({
                  time:Date.now(),
                  data:Categories
              }));
              //  console.log(Categories[0].children);
              //   var htmlStr=template("rightTemplate",{data:Categories[0].children});
              //   $(".right_menu").html(htmlStr);
              getLeftmenu();
              getRightmenu(0);
            }else{
                console.log("failed");
            }
          })
    }
    //获取左边数据
    function getLeftmenu(){
         //准备字符串模板
         var html=template("leftTemplate",{data:Categories});
         //渲染数据到页面上
         $(".menu_wrap ").html(html).hide().fadeIn(3000);
         //初始化左侧滚动条
         LeftScroll=new IScroll(".left_menu");
    }
  //获取右边数据
   function getRightmenu(index){
    var htmlStr=template("rightTemplate",{data:Categories[index].children});
    $(".right_menu").html(htmlStr).hide().fadeIn(3000);
 

    var nums=$(".right_menu img").length;//获取当前要加载的图片的数量
    // console.log(nums);
    $(".right_menu img").on("load",function(){
        nums--;//当最后一张图片加载完毕后
        if(nums==0){
               //初始化右侧滚动条
            var rightscroll=new IScroll(".right_menu");
        }
    })
   }
   //屏幕适配
   function setHtmlFont(){
       //屏幕基础值
       var baseVal=100;
       //设计稿宽度
       var pageWidth=320;
       //当前的屏幕宽度
       var screenWidth=document.querySelector("html").offsetWidth;
       //字体大小
       var fs=screenWidth*baseVal/pageWidth;
       //把字体设置到html里面
       document.querySelector("html").style.fontSize=fs+'px';
   }
   //屏幕改变重新触发屏幕适配
   window.onresize=function(){
    setHtmlFont();
   }
})