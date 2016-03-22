var Tool={
	stringIsBlank:function(strings){
		if (strings.replace(/(^s*)|(s*$)/g, "").length ==0)
		{
			return true;
		} 
		return false;
	},
	stringIsNotBlank:function(strings){
		return !Tool.stringIsBlank(strings);
	},
	postMethod:function(url,data,success_function,error_function){
		$.ajax({
			url:url,
			type:'POST',
			data:data,
			success:function(result){
				success_function(result);
			},
			error:function(err_msg){
				error_function(err_msg);
			}
		});
	},
	objTString:function(obj){
		return JSON.stringify(obj);
	},
	removeLastSign:function(string,sign){
		return string.substring(0,string.lastIndexOf(sign))
	},
	alert:function(message){
		$.messager.alert('消息提示',message);
	},
	show:function(title,msg){
		$.messager.show({
			title:title,
			msg:msg,
			timeout:2000,
			showType:'slide'
		});
	},
	confirm:function(title,msg,callback){
		$.messager.confirm(title,msg,function(isOk){
			if(isOk){
				callback();
			}
		});
	}
}