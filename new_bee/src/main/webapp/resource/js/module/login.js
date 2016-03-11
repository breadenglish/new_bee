var UserInfo=function(win_id,account_id,password_id,validate_code_id){
	this.user_win_id=win_id,
	this.account_id=account_id,
	this.password_id=password_id,
	this.validate_code_id=validate_code_id,
	this.UserWin=function(){
		var $this=this;
		return $("#"+this.user_win_id).dialog({
			title:'登录',
			width:350,
			height:190,
			closed:false,
			modal:true,
			buttons:[{
				text:'登录',
				handler:function(){
					var account=$('#'+$this.account_id).val();
					var password=$('#'+$this.password_id).val();
					//var validate_code_id=$('#'+validate_code_id).val();
					$this.login(account, password, null);
				}
			}]
		});
	},
	this.showLoginWin=function(){
		this.UserWin().show();
	},
	this.login=function(account,password,validate_code_id){
		
		if(Tool.stringIsBlank(account)||Tool.stringIsBlank(password)){
			Tool.alert('用户名/密码不能为空');
			return false;
		}
		
		Tool.postMethod('loginBeeSystem.do', {
			account:account,
			password:password
		}, function(result){
			if(result.status=="1"){
				window.location="mainLayout.do";
			}else{
				Tool.alert(result.message);
			}
		}, function(errmsg){
			console.info(errmsg);
		})
		
	}
}