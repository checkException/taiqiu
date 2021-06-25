/**
*	create by litao  2020-12-16 15:22:59
*/
//js 工具类
var Action={
    //serviceUrl:"http://127.0.0.1:8090/api",
    serviceUrl:"http://120.27.245.71:8070/taiqiu",
		tipTimer: null,
		callGetService: function (url, callback) {
		    var load_index;
	        setTimeout(function () {
	            $.ajax({
	                url: url,    //请求的url地址
	                dataType: "json",   //返回格式为json
	                async: true, //请求是否异步，默认为异步，这也是ajax重要特性
	                type: "GET",   //请求方式 GET
	                beforeSend: function () {
                        load_index= layer.load(1,{offset: 't'});
	                },
	                success: function (data) {
	                    callback(data);
	                },
	                complete: function () {
	                    /*//请求完成的处理
	                     Action.unLockAction();*/
                        layer.close(load_index);
	                },
	                error: function () {
	                    //请求出错处理
                        layer.msg("请求失败，请稍后重试！",{icon: 5});
                        layer.close(load_index);
	                    /*Action.chsTip("请求失败，请稍后重试！", function () {

	                    }, 3000);*/
	                }
	            });
	        }, 5);

	    },
	    callPostService: function (url, data, callback,content_Type) {
            if(content_Type==undefined||content_Type==null||content_Type!=1){
                content_Type = "application/x-www-form-urlencoded;charset=UTF-8";
            }else{
                content_Type = "application/json;charset=utf-8";
            }
	        setTimeout(function () {
	            $.ajax({
	                url: Action.serviceUrl+url,    //请求的url地址
	                dataType: "json",   //返回格式为json
	                async: true, //请求是否异步，默认为异步，这也是ajax重要特性
	                data: data,    //参数值
	                type: "POST",   //请求方式 POST
                    contentType:content_Type,
                    withCredential:true,
                    crossDomain:true,
	                beforeSend: function () {

	                },
	                success: function (data) {
	                    if(data.code=='9996'){
                            location.href='../login/login.html';
                            return ;
                        }
	                    callback(data);
	                },
	                complete: function () {
	                    //请求完成的处理
	                    //Action.unLockAction();
	                },
	                error: function () {
	                    //请求出错处理
                        layer.msg("请求失败，请稍后重试！",{icon: 5});
	                    /*Action.chsTip("请求失败，请稍后重试！", function () {

	                    }, 3000);*/
	                }
	            });
	        }, 5);
	    },
	tipMsg:{
		error:{
            findMsg:"查找失败，请重试或联系管理人员查看！",
			updMsg:"更新失败，请重试或联系管理人员查看！",
			delMsg:"删除失败，请重试或联系管理人员查看！",
			addMsg:"添加失败，请重试或联系管理人员查看！"
		},
		success:{
            updMsg:"更新成功！",
            delMsg:"删除成功！",
            addMsg:"添加成功！"
		}
	},
	tip_alert:function(type){
		if(type=='add'){
			layer.msg(Action.tipMsg.success.addMsg);
		}else if(type=='edit'){
			layer.msg(Action.tipMsg.success.updMsg);
		}else if(type=='del'){
			layer.msg(Action.tipMsg.success.delMsg);
		}
	},
	pageInfo:{
        pageSize:10,					//每页显示的数量
        currentPageNo:1				//当前页
	},
    closeWindow:function(index){
        layer.close(index);
    },
    refreshWindow:function(index){
        layer.close(index);

        window.location.replace(location.href);
    },
    goods_img_url:"",
    randomString:function (len) {//生产随机字符串
        len = len || 32;
        var $chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
        var maxPos = $chars.length;
        var pwd = '';
        for (i = 0; i < len; i++) {
            pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
        }
        return pwd;
    },
    formatDate:function (timeStamp) {
        var now= new Date(timeStamp);
        var year=now.getFullYear();
        var month=now.getMonth()+1;
        var date=now.getDate();
        var hour=now.getHours();
        var minute=now.getMinutes();
        var second=now.getSeconds();
        return year+"-"+month+"-"+date+" "+hour+":"+minute+":"+second;
    }
};


function setCookie(name, value) {
    document.cookie = name + "=" + value ;
}

