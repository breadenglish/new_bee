var SysResource = function() {
			this.sysresource_grid_id = '',
			this.sysresource_grid_toolbar_id = '',
			this.sysresource_add_btn_id = '',
			this.sysresource_remove_btn_id = '',
			this.sysresource_modify_btn_id = '',
			this.sysresource_edit_node_btn_id='',
			
			this.sysresource_edit_win_id = '',
			this.sysresource_edit_form_id='',
			this.sysresource_edit_name_id='',
			this.sysresource_edit_prefix_id='',
			this.sysresource_edit_type_id='',
			this.sysresource_edit_link_id='',
			this.sysresource_edit_child_tr_id='',
			this.sysresource_edit_child_id='',
			this.sysresource_edit_description_id='',
			this.setting = function(sysresource_grid_id,
					sysresource_grid_toolbar_id, sysresource_add_btn_id,
					sysresource_remove_btn_id, sysresource_modify_btn_id,sysresource_edit_node_btn_id,
					sysresource_edit_win_id,sysresource_edit_form_id,
					sysresource_edit_name_id,sysresource_edit_prefix_id,
					sysresource_edit_type_id,sysresource_link_id,
					sysresource_edit_child_tr_id,sysresource_edit_child_id,
					sysresource_edit_description_id) {
				this.sysresource_grid_id = sysresource_grid_id;
				this.sysresource_grid_toolbar_id = sysresource_grid_toolbar_id;
				this.sysresource_add_btn_id = sysresource_add_btn_id;
				this.sysresource_modify_btn_id = sysresource_modify_btn_id;
				this.sysresource_remove_btn_id = sysresource_remove_btn_id;
				this.sysresource_edit_node_btn_id=sysresource_edit_node_btn_id;
				
				this.sysresource_edit_win_id=sysresource_edit_win_id;
				this.sysresource_edit_form_id=sysresource_edit_form_id;
				this.sysresource_edit_name_id=sysresource_edit_name_id;
				this.sysresource_edit_prefix_id=sysresource_edit_prefix_id;
				this.sysresource_edit_type_id=sysresource_edit_type_id;
				this.sysresource_edit_link_id=sysresource_link_id;
				this.sysresource_edit_child_tr_id=sysresource_edit_child_tr_id;
				this.sysresource_edit_child_id=sysresource_edit_child_id;
				this.sysresource_edit_description_id=sysresource_edit_description_id;
			},
			this.getSysResourceGrid = function() {
				return $('#' + this.sysresource_grid_id);
			},
			this.getSysResourceEditWin=function(){
				return $('#'+this.sysresource_edit_win_id);
			},
			this.sysResourceEditWinInit=function(title,sysresourceId,sysresourceType){
				var $this=this;
				return $('#'+this.sysresource_edit_win_id).dialog({
					title:title,
					width:400,
					height:350,
					modal:true,
					buttons:[{
						text:'保存',
						handler:function(){
							$this.saveSysResource(sysresourceId);
						}
					}],
					onOpen:function(){
						if(sysresourceType==1){
							$this.sysResourceNodeComboboxInit(sysresourceId);
						}
					},
					onClose:function(){
						if($('#'+$this.sysresource_edit_child_tr_id).is(':hidden')){
							$('#'+$this.sysresource_edit_child_tr_id).hide();
						}
						$('#'+$this.sysresource_edit_form_id).form('clear');
					}
				});
			},
			this.sysResourceTypeComboboxInit=function(){
				var $this=this;
				$('#'+this.sysresource_edit_type_id).combobox({
					url:'findSysResourceType.do',
					valueField:'sysResourceTypeId',
					textField:'sysResourceType',
					editable:false,
					panelMaxHeight:80,
					value:3,
					onChange:function(newValue,oldValue){
						if(newValue==1){
							$this.sysResourceNodeComboboxInit(null);
							$('#'+$this.sysresource_edit_child_tr_id).show();
						}else{
							$('#'+$this.sysresource_edit_child_id).combotree('clear');
							$('#'+$this.sysresource_edit_child_tr_id).hide();
						}
					}
				});
			},
			this.sysResourceAddBtnInit = function() {
				var $this=this;
				$('#' + this.sysresource_add_btn_id).linkbutton({
					text : '新增',
					plain : true,
					iconCls : 'icon-add',
					onClick : function() {
						$this.addSysResourceEvent();
					}
				});
			},
			this.sysResourceRemoveBtnInit = function() {
				var $this = this;
				$('#' + this.sysresource_remove_btn_id).linkbutton({
					text : '删除',
					plain : true,
					iconCls : 'icon-remove',
					onClick : function() {
						$this.removeSysResource();
					}
				});
			},
			this.sysResourceModifyBtnInit = function() {
				var $this=this;
				$('#' + this.sysresource_modify_btn_id).linkbutton({
					text : '修改',
					plain : true,
					iconCls : 'icon-edit',
					onClick : function() {
						$this.modifySysResourceEvent();
					}
				});
			},
			this.sysResourceNodeComboboxInit=function(sysresourceId){
				$('#'+this.sysresource_edit_child_id).combotree({
					url:'findSysResourceTreeBySysResource.do',
					editable:false,
					checkbox:true,
					multiple:true,
					queryParams:{
						id:sysresourceId
					}
				});
			},
			this.sysResourceGridInit = function(toolbar_id) {
				this.getSysResourceGrid().treegrid({
					url : 'findSysResourceTreeGridBySysResource.do',
					idField : 'index',
					treeField : 'name',
					fit : true,
					fitColumns : true,
					border : false,
					rownumbers : true,
					pagination : true,
					pageSize : 2,
					pageList : [ 2, 4, 6, 8 ],
					pageNumber : 1,
					toolbar : '#' + toolbar_id,
					columns : [ [ {
						title : '编号',
						field : 'index',
						width : '12.5%',
						hidden : true
					}, {
						title : '主键',
						field : 'id',
						checkbox : true
					}, {
						title : '名称',
						field : 'name',
						width : '20%'
					}, {
						title : '标识',
						field : 'prefix',
						width : '20%'
					}, {
						title : '类型',
						field : 'resourceType',
						wdith : '20%',
						formatter : function(value, row, index) {
							if (value == 1) {
								return '菜单';
							} else if (value == 2) {
								return '按钮';
							} else if(value==3){
								return '链接';
							}else{
								return value;
							}
						}
					}, {
						title : '描述',
						field : 'description',
						width : '20%'
					}, {
						title : '链接',
						field : 'link',
						width : '20%'
					} ] ]
				});
			},
			this.addSysResourceEvent=function(){
				$('#'+this.sysresource_edit_type_id).combobox('enable');
				this.sysResourceEditWinInit('添加资源', null,null).show();
			},
			this.modifySysResourceEvent=function(){
				var $this=this;
				var record=this.getSysResourceGrid().treegrid('getSelected');
				if(null==record||record.length==0){
					Tool.show('修改资源', '请选择需要修改的资源');
					return;
				}
				var sysResourceId=record.id.split('_')[1];
				$('#'+$this.sysresource_edit_type_id).combobox('setValue',record.resourceType);
				$('#'+$this.sysresource_edit_type_id).combobox('disable');
				$('#'+$this.sysresource_edit_form_id).form('load',{
					sysresourceName:record.name,
					sysresourcePrefix:record.prefix,
					sysresourceLink:record.link,
					sysresourceDescription:record.description
				});
				this.sysResourceEditWinInit('修改资源', sysResourceId,record.resourceType).show();
				
			},
			this.saveSysResource=function(sysresourceId){
				var $this=this;
				console.info('主键:'+sysresourceId);
				var sysResourceName=$('#'+this.sysresource_edit_name_id).val();
				if(Tool.stringIsBlank(sysResourceName)){
					Tool.alert('资源名称不能为空');
					return;
				}
				console.info('名称:'+sysResourceName);
				var sysResourcePrefix=$('#'+this.sysresource_edit_prefix_id).val();
				console.info('标识:'+sysResourcePrefix);
				var sysResourceType=$('#'+this.sysresource_edit_type_id).combobox('getValue');
				console.info('类型:'+sysResourceType);
				if(Tool.stringIsBlank(sysResourceType)){
					Tool.alert('资源类型不能为空');
					return;
				}
				var childrenIdArrayString='';
				if(sysResourceType==1){
					var recordTree=$('#'+this.sysresource_edit_child_id).combotree('tree');
					var recordArray=recordTree.tree('getChecked');
					console.info(recordArray);
					for(var i in recordArray){
						var record=recordArray[i];
						childrenIdArrayString+=(record.id);
						childrenIdArrayString+=(',');
					}
					childrenIdArrayString=Tool.removeLastSign(childrenIdArrayString, ',');
				}
				console.info('子节点的idString:'+childrenIdArrayString);
				var sysResourceLink=$('#'+this.sysresource_edit_link_id).val();
				console.info('链接:'+sysResourceLink);
				var sysResourceDescription=$('#'+this.sysresource_edit_description_id).val();
				console.info('描述:'+sysResourceDescription);
				Tool.postMethod('saveSysResource.do', {
					id:sysresourceId,
					sysResourceName:sysResourceName,
					sysResourcePrefix:sysResourcePrefix,
					resourceType:sysResourceType,
					resourceLink:sysResourceLink,
					childIdArrayString:childrenIdArrayString,
					resourceDescription:sysResourceDescription
				}, function(result){
					$this.getSysResourceEditWin().dialog('close');
					$this.getSysResourceGrid().treegrid('reload');
				}, function(errMsg){
					
				});
			},
			this.removeSysResource = function() {
				var $this = this;
				var record = this.getSysResourceGrid().treegrid('getSelected');
				if (null == record || record.length == 0) {
					Tool.show('删除资源', '请选择要删除的资源');
					return;
				}
				var msg = '';
				if (record.children != undefined) {
					var childrenString = '';
					for ( var i in record.children) {
						var child = record.children[i];
						childrenString += child.name;
						childrenString += ',';
					}
					childrenString = Tool.removeLastSign(childrenString, ',');
					msg = '删除<span style="color:red;font-weight:bold">'
							+ record.name
							+ '</span>的同时,将会删除以下子节点:<span style="color:red;font-weight:bold">'
							+ childrenString + '</span>';
				} else {
					msg = '你确认删除<span style="color:red;font-weight:bold">'
							+ record.name + '</span>吗?'
				}
				var sysResourceId=record.id.split('_')[1];
				Tool.confirm('删除资源', msg, function() {
					Tool.postMethod('removeSysResourceList.do', {
						sysResourceIdListString:sysResourceId
					}, function(result){
						if(result.status==1){
							$this.getSysResourceGrid().treegrid('reload');
							Tool.show('删除资源',
									'成功删除<span style="color:red;font-weight:bold">'
											+ record.name + '</span>');
						}
					}, function(errMsg){
						
					});
					
				});
			}, this.init = function() {
				this.sysResourceAddBtnInit();
				this.sysResourceRemoveBtnInit();
				this.sysResourceModifyBtnInit();
				this.sysResourceTypeComboboxInit();
				this.sysResourceGridInit(this.sysresource_grid_toolbar_id);
			}
}