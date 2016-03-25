var RoleInfo=function(){
	this.role_grid_id='',
	this.role_add_btn_id='',
	this.role_remove_btn_id='',
	this.role_modify_btn_id='',
	this.role_resource_edit_btn_id='',
	this.role_search_value_id='',
	//关于编辑窗口的初始化
	this.role_edit_win_id='',
	this.role_edit_win_title='添加权限',
	this.role_name_id='',
	this.role_prefix_id='',
	this.role_description_id='',
	this.role_edit_form_id='',
	this.role_edit_form_url='addRoleInfo.do',
	
	//关于对角色资源修改的初始化属性配置
	this.role_resource_win_id='',
	this.role_resource_tree_id='',
	this.setting=function(role_grid_id,role_add_btn_id,role_remove_btn_id,role_modify_btn_id,role_resource_edit_btn_id,role_search_value_id,role_edit_win_id,role_edit_form_id,role_name_id,role_prefix_id,role_description_id,role_resource_win_id,role_resource_tree_id){
		this.role_grid_id=role_grid_id;
		this.role_add_btn_id=role_add_btn_id;
		this.role_remove_btn_id=role_remove_btn_id;
		this.role_modify_btn_id=role_modify_btn_id;
		this.role_resource_edit_btn_id=role_resource_edit_btn_id;
		this.role_search_value_id=role_search_value_id;
		//form表单里的属性初始化
		this.role_edit_win_id=role_edit_win_id;
		this.role_edit_form_id=role_edit_form_id;
		this.role_name_id=role_name_id;
		this.role_prefix_id=role_prefix_id;
		this.role_description_id=role_description_id;
		
		//关于对角色资源修改的初始化属性配置
		this.role_resource_win_id=role_resource_win_id;
		this.role_resource_tree_id=role_resource_tree_id;
	},
	this.getRoleInfoEditWin=function(){
		return $('#'+this.role_edit_win_id);
	},
	this.getRoleInfoGrid=function(){
		return $('#'+this.role_grid_id);
	},
	this.getRoleResourceWin=function(){
		return $('#'+this.role_resource_win_id);
	},
	this.getRoleResourceTree=function(){
		return $('#'+this.role_resource_tree_id);
	},
	this.roleInfoAddBtnInit=function(){
		var $this=this;
		$('#'+this.role_add_btn_id).linkbutton({
			text:'新增',
			plain:true,
			iconCls:'icon-add',
			onClick:function(){
				$this.roleInfoEditWinInit('新增角色', 0).show();
			}
		});
	},
	this.roleInfoRemoveBtnInit=function(){
		var $this=this;
		$('#'+this.role_remove_btn_id).linkbutton({
			text:'删除',
			plain:true,
			iconCls:'icon-remove',
			onClick:function(){
				$this.removeRoleInfo();
			}
		});
	},
	this.roleInfoModifyBtnInit=function(){
		var $this=this;
		$('#'+this.role_modify_btn_id).linkbutton({
			text:'修改',
			plain:true,
			iconCls:'icon-edit',
			onClick:function(){
				$this.modifyRoleInfo();
			}
		});
	},
	this.roleInfoResourceEditBtnInit=function(){
		$('#'+this.role_resource_edit_btn_id).linkbutton({
			text:'编辑资源',
			plain:true,
			iconCls:'icon-edit',
			onClick:function(){
				$this.modifyRoleInfo();
			}
		});
	},
	this.searchRoleBoxInit=function(){
		var $this=this;
		$('#'+this.role_search_value_id).searchbox({
		    width:200,    
		    menu:'#search_role_condition',
		    prompt:'请输入条件信息',
		    searcher:function(value,name){
		    	$this.searchRoleInfoByCondition(name,value);
		    }
		});
	},
	this.roleInfoEditWinInit=function(title,type){
		var $this=this;
		return this.getRoleInfoEditWin().dialog({
			title:title,
			width:400,
			height:270,
			modal:true,
			buttons:[{
				text:'保存',
				handler:function(){
					$this.editRoleInfo(type);
				}
			}],
			onClose:function(){
				$('#'+$this.role_edit_form_id).form('clear');
				/*$this.roleInfoEditWinClose();*/
			}
		});
	},
	this.roleInfoEditWinClose=function(){
		$('#'+this.role_edit_form_id).form('clear');
		this.getRoleInfoEditWin().dialog('close');
	},
	this.roleInfoGridInit=function(){
		this.getRoleInfoGrid().datagrid({
			fit:true,
			fitColumns:true,
			url:'roleInfoList.do',
			rownumbers:true,
			checkOnSelect:true,
			ctrlSelect:true,
			selectOnCheck:true,
			pagination:true,
			pageSize:2,
			pageList:[2,4,6,8],
			pageNumber:1,
			fitColumns:true,
			border:false,
			toolbar:'#roles_datagrid_toolbar',
			columns:[[{
				field:'id',
				title:'编号',
				checkbox:true
			},{
				field:'roleName',
				title:'角色名称',
				width:'24%'
			},{
				field:'rolePrefix',
				title:'角色标识',
				width:'24%'
			},{
				field:'roleDescription',
				title:'角色描述',
				width:'24%'
			},{
				field:'createTime',
				title:'创建时间',
				width:'24%'
			}]]
		})
	},
	this.roleResourceWinInit=function(){
		this.getRoleResourceWin().dialog({
			
		});
	},
	this.roleResourceTreeInit=function(){
		this.getRoleResourceTree().tree({
			
		});
	},
	this.modifyRoleInfo=function(){
		var record=this.getRoleInfoGrid().datagrid('getSelected');
		if(null==record){
			Tool.show('修改角色', '请选择一条你要修改的角色记录');
			return;
		}
		$('#'+this.role_edit_form_id).form('load',{
			rolesId:record.id,
			rolesName:record.roleName,
			rolesPrefix:record.rolePrefix,
			rolesDescription:record.roleDescription
		});
		this.roleInfoEditWinInit('修改角色',1).show();
	},
	this.editRoleInfo=function(type){
		var $this=this;
		var role_name=$('#'+$this.role_name_id).val();
		if(Tool.stringIsBlank(role_name)){
			Tool.alert('角色名称不能为空!');
			return;
		}
		var role_prefix=$('#'+$this.role_prefix_id).val();
		if(Tool.stringIsBlank(role_prefix)){
			Tool.alert('角色标识不能为空');
			return;
		}
		var role_description=$('#'+$this.role_description_id).val();
		var id=null;
		if(type==1){
			$this.role_edit_win_title='修改角色';
			id=$('#rolesId').val();
			$this.role_edit_form_url='modifyRoleInfo.do';
		}else{
			$this.role_edit_win_title='添加角色';
			$this.role_edit_form_url='addRoleInfo.do';
		}
		
		Tool.postMethod($this.role_edit_form_url, {
			id:id,
			roleName:role_name,
			rolePrefix:role_prefix,
			roleDescription:role_description
		}, function(result){
			if(result.status){
				Tool.alert($this.role_edit_win_title+'成功');
				$this.getRoleInfoGrid().datagrid('reload');
				$this.roleInfoEditWinClose();
				return;
			}
			Tool.alert(result.message);
		}, function(errMsg){
			
		})
	},
	this.removeRoleInfo=function(){
		var $this=this;
		var recordArray=this.getRoleInfoGrid().datagrid('getSelections');
		if(null==recordArray||recordArray.length==0){
			Tool.show('删除操作', '请选择要删除的对象');
			return;
		}
		var deleteRecordName='';
		var deleteRecordIds=''
		for(var i in recordArray){
			deleteRecordName+=('<span style="color:red">'+recordArray[i].roleName+'</span>,');
			deleteRecordIds+=(recordArray[i].id+',');
		}
		deleteRecordName=Tool.removeLastSign(deleteRecordName, ',');
		deleteRecordIds=Tool.removeLastSign(deleteRecordIds, '');
		Tool.confirm('确认删除信息', '你确认删除'+deleteRecordName+'吗?', function(){
			Tool.postMethod('removeRoleInfoListByIds.do', {
				rolesIds:deleteRecordIds
			}, function(result){
				if(result.status==1){
					Tool.show('删除操作', '删除'+deleteRecordName+'成功');
					$this.getRoleInfoGrid().datagrid('reload');
					return;
				}
				Tool.alert(result.message);
			}, function(errMsg){});
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
		this.getRoleInfoGrid().datagrid('reload',condition);
	},
	this.init=function(){
		this.searchRoleBoxInit();
		this.roleInfoAddBtnInit();
		this.roleInfoRemoveBtnInit();
		this.roleInfoModifyBtnInit();
		this.roleInfoResourceEditBtnInit();
		this.roleInfoGridInit();
	}
}