var ResourceRole=function(){
	this.resource_role_grid_id='',
	this.resource_role_toolbar_search_id='',
	this.setting=function(resource_role_grid_id,resource_role_toolbar_search_id){
		this.resource_role_grid_id=resource_role_grid_id;
		this.resource_role_toolbar_search_id=resource_role_toolbar_search_id;
	},
	this.getResourceRoleGrid=function(){
		return $('#'+this.resource_role_grid_id);
	},
	this.searchBoxInit=function(){
		var $this=this;
		$('#'+this.resource_role_toolbar_search_id).searchbox({
		    width:200,    
		    menu:'#search_condition',
		    prompt:'请输入条件信息',
		    searcher:function(value,name){
		        $this.searchRoleInfoByCondition(name, value);
		    }
		});
	},
	this.searchRoleInfoByCondition=function(name,value){
		var condition=new Object();
		var roleName=null;
		var rolePrefix=null;
		var roleDescription=null;
		if(name=='roleName'){
			condition.roleName=value;
		}else if(name=='roleDescription'){
			condition.roleDescription=value;
		}else if(name=='rolePrefix'){
			condition.rolePrefix=value;
		}
		this.getResourceRoleGrid().treegrid('reload',condition);
	},
	this.resourceRoleGridInit=function(){
		this.getResourceRoleGrid().treegrid({
			url:'roleInfoSysResourceList.do',
			idField:'prefix',
			treeField:'name',
			fit:true,
			fitColumns:true,
			border:false,
			rownumbers:true,
			pagination:true,
			pageSize:2,
			pageList:[2,4,6,8],
			pageNumber:1,
			toolbar:'#role_resource_toolbar',
			columns:[[{
				title:'编号',
				field:'id',
				width:'20%',
				hidden:true
			},{
				title:'名称',
				field:'name',
				width:'20%'
			},{
				title:'标识',
				field:'prefix',
				width:'20%'
			},{
				title:'角色描述',
				field:'roleDescription',
				width:'20%'
			},{
				title:'资源描述',
				field:'sysResourceDescription',
				width:'20%'
			}]]
		});
	},
	this.init=function(){
		this.searchBoxInit();
		this.resourceRoleGridInit();
	}
}