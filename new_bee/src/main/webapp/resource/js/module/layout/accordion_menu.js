var AccordionMenu=function(accordion_menu_id){
	this.accordion_menu_id=accordion_menu_id,
	this.get_accordion=function(){
		return $('#'+this.accordion_menu_id);
	},
	this.init=function(){
		var $this=this;
		this.get_accordion().accordion({
			fit:true,
			onSelect:function(title,index){
				var obj=$(this).accordion('getSelected');
				var accordionId=$(obj).attr('id');
				$this.child_menu_tree(accordionId.split('-')[1]);
			}
		});
	},
	this.add_accordion=function(id,title,content,iconCls){
		this.init();
		$('#'+this.accordion_menu_id).accordion('add',{
			id:'accordion-'+id,
			title:title,
			iconCls:iconCls,
			content:content,
			selected: false
		});
	},
	this.load_menu=function(){
		var $this=this;
		Tool.postMethod('findMenuList.do', null, function(result){
			if(result.status==1){
				var menuArray=result.menuArray;
				for(var i=0;i<menuArray.length;i++){
					var menu=menuArray[i];
					var menuList=('<ul id="'+menu.menuId+'"></ul>');
					$this.add_accordion(menu.menuId,menu.title, menuList,menu.iconCls);
				}
			}
		}, function(errMsg){
			console.info(errMsg);
		});
	},
	this.child_menu_tree=function(id){
		var $this=this;
		var tabsPanel=$('#center_panel');
		$('#'+id).tree({
			url:'findTreeNodeList.do',
			queryParams:{
				id:id
			},
			onClick:function(node){
				$this.canvas_center(node,tabsPanel);
			}
		});
	},
	this.canvas_center=function(node,tabsPanel){
		var exists=tabsPanel.tabs('exists',node.text);
		if(!exists){
			tabsPanel.tabs('add',{
				title:node.text,
				selected:true,
				href:node.href,
				closable:true
			})
		}else{
			tabsPanel.tabs('select',node.text);
		}
	}
}