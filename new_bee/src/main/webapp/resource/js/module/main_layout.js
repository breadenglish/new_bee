var MainLayout=function(main_layout_id){
	this.mainLayout=function(){
		$('#'+main_layout_id).layout({
			fit:true
		})
		return $('#'+main_layout_id);
	},
	this.treePanel=function(tree_panel_url){
		this.mainLayout().layout('add',{
			region:'west',
			width:'20%',
			title:'菜单',
			border:false,
			href:tree_panel_url
		})
	},
	this.centerTabs=function(center_panel_url){
		this.mainLayout().layout('add',{
			region:'center',
			wdith:'70%',
			border:false,
			href:center_panel_url
		})
	}
}