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
				success_funciton(result);
			},
			error:function(err_msg){
				error_function(err_msg);
			}
		});
	},
	alert:function(message){
		$.messager.alert('消息提示',message);
	}
}