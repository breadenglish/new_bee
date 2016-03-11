var UserInfo=function(win_id){
	this.user_win_id=win_id,
	this.UserWin=function(){
		return $("#"+this.user_win_id).dialog({
			title:'登录',
			width:350,
			height:190,
			closed:false,
			modal:true,
			buttons:[{
				text:'登录',
				handler:function(){
					window.location="mainLayout.do";
				}
			}]
		});
	},
	this.showLoginWin=function(){
		this.UserWin().show();
	}
}