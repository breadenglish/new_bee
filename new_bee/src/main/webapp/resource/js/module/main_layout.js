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
			height:'100%',
			title:'菜单',
			border:true,
			split:true,
			href:tree_panel_url
		})
	},
	this.centerTabs=function(center_panel_url){
		this.mainLayout().layout('add',{
			region:'center',
			width:'80%',
			height:'100%',
			href:center_panel_url
		})
	}
}