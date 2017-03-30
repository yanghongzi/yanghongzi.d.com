/**
 * Created by LBF on 2017/3/24.
 */
;(function($){
    var Dialog=function(config){
       var _this=this;
        //Ĭ�ϲ�������
         this.config={
            //�Ի���Ŀ�
           width:"auto",
            //�Ի���ĸ�
            height:"auto",
             //�Ի������ʾ��Ϣ
             message:null,
            //�Ի��������
            type:"waiting",
            //��ť����
            buttons:null,
            //�������ӳٶ�ùر�
            delay:null,
            //�Ի������ֵ�͸����
            maskOpacity:null
        };

        ///Ĭ�ϲ�����չ
       if(config && $.isPlainObject(config)){
           $.extend(this.config,config);
       }else{
           this.isConfig=true;
       }

        //����������DOM
        this.body=$("body");
        //�������ֲ�
        this.mask=$('<div class="g-dialog-contianer" >');
        //�����Ի���
        this.win=$('<div class="dialog-window">');
        //�����Ի���ͷ��
        this.winHerder=$('<div class="dialog-herder"></div>');
        //������ʾ��Ϣ
        this.winContent=$('<div class="dialog-content">');
        //�����Ի���ť��
        this.winFooter=$('<div class="dialog-footer">');

        //��ȾDOM
        this.creat();
    };
    Dialog.prototype={
        //�����Ի���
        creat:function(){
            var _this_=this,
                config=this.config,
                mask=this.mask,
                win=this.win,
                header=this.winHerder,
                content=this.winContent,
                footer=this.winFooter,
                body=this.body;

            //���û�д����κ����ò����͵���һ���ȴ���ͼ����ʽ�ĵ���
            if(this.isConfig){
               win.append(header.addClass("waiting"));
               mask.append(win);
               body.append(mask);
            }else{
                //����������Ϣ������Ӧ�ĵ���
                header.addClass(config.type);
                win.append(header);
                //���������Ϣ�ı�
                if(config.message!=null){
                    content.html(config.message);
                    win.append(content);
                }
                //������˰�ť��
                if(config.buttons!=null){
                    _this_.createButtons(footer,config.buttons);
                    win.append(footer);

                }
                //������˵�������
                if(config.width!="auto") {
                    win.width(config.width);

                }
                //������˵�����߶�
                if(config.height!="auto") {
                    win.height(config.height);

                }
                //���õ������ùر�
                if(config.delay!=null&&config.delay!=0){
                    window.setTimeout(function(){
                        _this_.close();
                    },config.delay);
                }
                //�������͸����
                if(config.maskOpacity!=null) {
                    mask.css("background-color"," rgba(0,0,0,"+config.maskOpacity+")");
                }
            }

            mask.append(win);
            body.append(mask);
        } ,
        //�����رնԻ���
        close:function(){
            this.mask.remove();
        },
        //�����Ի���ť��
        createButtons:function(footer,buttons){
            var _this_=this;
          $(buttons).each(function(i){
              var type=this.type?"class='"+this.type+"'":"";
              var btnText=this.text?this.text:"��ť"+(++i);
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
