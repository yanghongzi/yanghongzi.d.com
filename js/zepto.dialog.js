/**
 * Created by LBF on 2017/3/24.
 */
;(function($){
    var Dialog=function(config){
       var _this=this;
        //默认参数配置
         this.config={
            //对话框的宽
           width:"auto",
            //对话框的高
            height:"auto",
             //对话框的提示信息
             message:null,
            //对话框的类型
            type:"waiting",
            //按钮配置
            buttons:null,
            //弹出框延迟多久关闭
            delay:null,
            //对话框遮罩的透明度
            maskOpacity:null
        };

        ///默认参数扩展
       if(config && $.isPlainObject(config)){
           $.extend(this.config,config);
       }else{
           this.isConfig=true;
       }

        //创建基本的DOM
        this.body=$("body");
        //创建遮罩层
        this.mask=$('<div class="g-dialog-contianer" >');
        //创建对话框
        this.win=$('<div class="dialog-window">');
        //创建对话框头部
        this.winHerder=$('<div class="dialog-herder"></div>');
        //创建提示信息
        this.winContent=$('<div class="dialog-content">');
        //创建对话框按钮组
        this.winFooter=$('<div class="dialog-footer">');

        //渲染DOM
        this.creat();
    };
    Dialog.prototype={
        //创建对话框
        creat:function(){
            var _this_=this,
                config=this.config,
                mask=this.mask,
                win=this.win,
                header=this.winHerder,
                content=this.winContent,
                footer=this.winFooter,
                body=this.body;

            //如果没有传递任何配置参数就弹出一个等待的图标形式的弹框
            if(this.isConfig){
               win.append(header.addClass("waiting"));
               mask.append(win);
               body.append(mask);
            }else{
                //根据配置信息创建相应的弹框
                header.addClass(config.type);
                win.append(header);
                //如果传了信息文本
                if(config.message!=null){
                    content.html(config.message);
                    win.append(content);
                }
                //如果传了按钮组
                if(config.buttons!=null){
                    _this_.createButtons(footer,config.buttons);
                    win.append(footer);

                }
                //如果传了弹出框宽度
                if(config.width!="auto") {
                    win.width(config.width);

                }
                //如果传了弹出框高度
                if(config.height!="auto") {
                    win.height(config.height);

                }
                //设置弹出框多久关闭
                if(config.delay!=null&&config.delay!=0){
                    window.setTimeout(function(){
                        _this_.close();
                    },config.delay);
                }
                //如果传了透明度
                if(config.maskOpacity!=null) {
                    mask.css("background-color"," rgba(0,0,0,"+config.maskOpacity+")");
                }
            }

            mask.append(win);
            body.append(mask);
        } ,
        //创建关闭对话框
        close:function(){
            this.mask.remove();
        },
        //创建对话框按钮组
        createButtons:function(footer,buttons){
            var _this_=this;
          $(buttons).each(function(i){
              var type=this.type?"class='"+this.type+"'":"";
              var btnText=this.text?this.text:"按钮"+(++i);
               var callback=this.callback?this.callback:null;
              var button=$("<button "+type+">"+btnText+"</button>");
             if(callback){
                 button.tap(function(){
                   var isClose=callback();
                    if(isClose){
                        _this_.close();
                    }
                  })
              }else{
                 button.tap(function(){
                    _this_.close();
                 });
              }

              footer.append(button);

          })
        }
    };
    window.Dialog=Dialog;
    $.dialog=function(config){
        return new Dialog(config);
    }

})(Zepto);
