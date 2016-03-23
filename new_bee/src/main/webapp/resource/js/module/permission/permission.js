var Permission=function(){
	this.permission_grid_id='',
	this.permission_add_btn_id='',
	this.permission_remove_btn_id='',
	this.permission_modify_btn_id='',
	this.permission_edit_win_id='',
	this.permission_edit_win_title='添加权限',
	this.permission_name_id='',
	this.permission_prefix_id='',
	this.permission_description_id='',
	this.permission_edit_form_id='',
	this.permission_edit_form_url='addPermission.do',
	this.setting=function(permission_grid_id,permission_add_btn_id,permission_remove_btn_id,permission_modify_btn_id,permission_edit_win_id,permission_edit_form_id,permission_name_id,permission_prefix_id,permission_description_id){
		this.permission_grid_id=permission_grid_id;
		this.permission_add_btn_id=permission_add_btn_id;
		this.permission_remove_btn_id=permission_remove_btn_id;
		this.permission_modify_btn_id=permission_modify_btn_id;
		
		
		//form表单里的属性id
		this.permission_edit_win_id=permission_edit_win_id;
		this.permission_edit_form_id=permission_edit_form_id;
		this.permission_name_id=permission_name_id;
		this.permission_prefix_id=permission_prefix_id;
		this.permission_description_id=permission_description_id;
	},
	this.getPermissionEditWin=function(){
		return $('#'+this.permission_edit_win_id);
	},
	this.getPermissionGrid=function(){
		return $('#'+this.permission_grid_id);
	},
	this.permissionAddBtnInit=function(){
		var $this=this;
		$('#'+this.permission_add_btn_id).linkbutton({
			text:'新增',
			plain:true,
			iconCls:'icon-add',
			onClick:function(){
				$this.permissionEditWinInit('新增权限', 0).show();
			}
		});
	},
	this.permissionRemoveBtnInit=function(){
		var $this=this;
		$('#'+this.permission_remove_btn_id).linkbutton({
			text:'删除',
			plain:true,
			iconCls:'icon-remove',
			onClick:function(){
				$this.removePermission();
			}
		});
	},
	this.permissionModifyBtnInit=function(){
		var $this=this;
		$('#'+this.permission_modify_btn_id).linkbutton({
			text:'修改',
			plain:true,
			iconCls:'icon-edit',
			onClick:function(){
				$this.modifyPermission();
			}
		});
	},
	this.permissionEditWinInit=function(title,type){
		var $this=this;
		return this.getPermissionEditWin().dialog({
			title:title,
			width:400,
			height:270,
			modal:true,
			buttons:[{
				text:'保存',
				handler:function(){
					$this.editPermission(type);
				}
			}],
			onClose:function(){
				$('#'+$this.permission_edit_form_id).form('clear');
				/*$this.roleInfoEditWinClose();*/
			}
		});
	},
	this.permissionEditWinClose=function(){
		$('#'+this.permission_edit_form_id).form('clear');
		this.getPermissionEditWin().dialog('close');
	},
	this.permissionGridInit=function(){
		this.getPermissionGrid().datagrid({
			fit:true,
			fitColumns:true,
			url:'permissionList.do',
			rownumbers:true,
			checkOnSelect:true,
			ctrlSelect:true,
			selectOnCheck:true,
			pagination:true,
			pageSize:2,
			pageList:[2,4,6,8],
			pageNumber:1,
			toolbar: '#permission_datagrid_toolbar',
			columns:[[{
				checkbox:true,
				field:'id',
				title:'编号',
				width:'25%'
			},{
				field:'permissionName',
				title:'权限名称',
				width:'25%'
			},{
				field:'permissionPrefix',
				title:'权限代号',
				width:'25%'
			},{
				field:'permissionDescription',
				title:'权限描述',
				width:'25%'
			}]]
		});
	},
	this.modifyPermission=function(){
		var record=this.getPermissionGrid().datagrid('getSelected');
		if(null==record){
			Tool.show('修改权限', '请选择一条你要修改的权限');
			return;
		}
		$('#'+this.permission_edit_form_id).form('load',{
			permissionId:record.id,
			permissionName:record.permissionName,
			permissionPrefix:record.permissionPrefix,
			permissionDescription:record.permissionDescription
		});
		this.permissionEditWinInit('修改权限',1).show();
	},
	this.editPermission=function(type){
		var $this=this;
		var permission_name=$('#'+$this.permission_name_id).val();
		if(Tool.stringIsBlank(permission_name)){
			Tool.alert('权限名称不能为空');
			return;
		}
		var permission_prefix=$('#'+$this.permission_prefix_id).val();
		if(Tool.stringIsBlank(permission_prefix)){
			Tool.alert('权限标识不能为空');
			return;
		}
		var permission_description=$('#'+$this.permission_description_id).val();
		var id=null;
		if(type==1){
			$this.permission_edit_win_title='修改权限';
			id=$('#permissionId').val();
			$this.permission_edit_form_url='modifyPermission.do';
		}else{
			$this.permission_edit_win_title='添加权限';
			$this.permission_edit_form_url='addPermission.do';
		}
		Tool.postMethod(this.permission_edit_form_url, {
			id:id,
			permissionName:permission_name,
			permissionPrefix:permission_prefix,
			permissionDescription:permission_description
		}, function(result){
			if(result.status){
				Tool.alert($this.permission_edit_win_title+'成功');
				$this.getPermissionGrid().datagrid('reload');
				$this.permissionEditWinClose();
				return;
			}
			Tool.alert(result.message);
		}, function(errMsg){
			
		});
	},
	this.removePermission=function(){
		var $this=this;
		var recordArray=this.getPermissionGrid().datagrid('getSelections');
		if(null==recordArray||recordArray.length==0){
			Tool.show('删除操作', '请选择要删除的对象');
			return;
		}
		var deleteRecordName='';
		var deleteRecordIds=''
		for(var i in recordArray){
			deleteRecordName+=('<span style="color:red">'+recordArray[i].permissionName+'</span>,');
			deleteRecordIds+=(recordArray[i].id+',');
		}
		deleteRecordName=Tool.removeLastSign(deleteRecordName, ',');
		deleteRecordIds=Tool.removeLastSign(deleteRecordIds, '');
		Tool.confirm('确认删除信息', '你确认删除'+deleteRecordName+'吗?', function(){
			Tool.postMethod('removePermissionListByIds.do', {
				permissionIds:deleteRecordIds
			}, function(result){
				if(result.status==1){
					Tool.show('删除操作','删除'+deleteRecordName+'成功');
					$this.getPermissionGrid().datagrid('reload');
					return;
				}
				Tool.alert('删除失败');
			}, function(errMsg){
				console.info(Tool.objTString(errMsg));
			})
			
		})
	},
	this.init=function(){
		this.permissionAddBtnInit();
		this.permissionModifyBtnInit();
		this.permissionGridInit();
		this.permissionRemoveBtnInit();
	}
}