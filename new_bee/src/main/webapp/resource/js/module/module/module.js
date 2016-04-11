var Module = function() {
	this.module_grid_id = '', this.module_grid_tool_bar_id = '',
			this.module_add_btn_id = '', this.module_add_remove_btn_id = '',
			this.module_add_modify_btn_id = '',

			this.module_edit_win_id = '', this.module_edit_form_id = '',
			this.module_edit_name_id = '', this.module_edit_prefix_id = '',
			this.module_edit_type_id = '',
			this.module_edit_is_repeat_login_id = '',
			this.module_edit_max_login_id = '',
			this.module_edit_description_id = '', 
			this.setting = function(
					module_grid_id, module_grid_tool_bar_id, module_add_btn_id,
					module_add_remove_btn_id, module_add_modify_btn_id,module_edit_win_id,module_edit_form_id,
					module_edit_name_id,module_edit_prefix_id,module_edit_type_id,
					module_edit_is_repeat_login_id,module_edit_max_login_id,module_edit_description_id) {
				this.module_grid_id = module_grid_id;
				this.module_grid_tool_bar_id = module_grid_tool_bar_id;
				this.module_add_btn_id = module_add_btn_id;
				this.module_add_remove_btn_id = module_add_remove_btn_id;
				this.module_add_modify_btn_id = module_add_modify_btn_id;
				
				//应用编辑窗口的匹配
				this.module_edit_win_id=module_edit_win_id;
				this.module_edit_form_id=module_edit_form_id;
				this.module_edit_name_id=module_edit_name_id;
				this.module_edit_prefix_id=module_edit_prefix_id;
				this.module_edit_type_id=module_edit_type_id;
				this.module_edit_is_repeat_login_id=module_edit_is_repeat_login_id;
				this.module_edit_max_login_id=module_edit_max_login_id;
				this.module_edit_description_id=module_edit_description_id;
			},
			this.getIsRepeatLoginBtn=function(){
				return $('#'+this.module_edit_is_repeat_login_id);
			},
			this.getModuleEditWin=function(){
				return $('#'+this.module_edit_win_id);
			},
			this.getModuleGrid = function() {
				return $('#' + this.module_grid_id);
			}, this.moduleAddBtnInit = function() {
				var $this=this;
				return $('#' + this.module_add_btn_id).linkbutton({
					text : '新增',
					plain : true,
					iconCls : 'icon-add',
					onClick : function() {
						$this.moduleEditWinInit('新增应用', null).show();
					}
				});
			}, this.moduleRemoveBtnInit = function() {
				var $this=this;
				return $('#' + this.module_add_remove_btn_id).linkbutton({
					text : '修改',
					plain : true,
					iconCls : 'icon-edit',
					onClick : function() {
						$this.editModule();
					}
				});
			}, this.moduleModifyBtnInit = function() {
				var $this=this;
				return $('#' + this.module_add_modify_btn_id).linkbutton({
					text : '删除',
					plain : true,
					iconCls : 'icon-remove',
					onClick : function() {
						$this.removeModule();
					}
				});
				;
			},
			this.moduleEditIsRepeatLoginBtnInit=function(){
				return $('#'+this.module_edit_is_repeat_login_id).switchbutton({
					onText:'允许',
					offText:'不允许'
				});
			},
			this.moduleEditTypeInit=function(){
				return $('#'+this.module_edit_type_id).combobox({
					url:'moduleTypeList.do',
					editable:false,
					panelMaxHeight:100,
					textField:'moduleTypeName',
					valueField:'moduleType'
				});
			},
			this.moduleEditWinInit=function(title,moduleId){
				var $this=this;
				return this.getModuleEditWin().dialog({
					title:title,
					width:400,
					height:360,
					modal:true,
					buttons:[{
						text:'保存',
						handler:function(){
							$this.saveModule(moduleId);
						}
					}],
					onOpen:function(){
						$this.moduleEditIsRepeatLoginBtnInit();
						$this.moduleEditTypeInit();
					},
					onClose:function(){
						$('#'+$this.module_edit_form_id).form('clear');
					}
				});
			},
			this.moduleGridInit = function(tool_bar_id) {
				this.getModuleGrid().datagrid({
					fit : true,
					fitColumns : true,
					url : 'findModuleListByModule.do',
					rownumbers : true,
					checkOnSelect : true,
					ctrlSelect : true,
					selectOnCheck : true,
					pagination : true,
					pageSize : 2,
					pageList : [ 2, 4, 6, 8 ],
					pageNumber : 1,
					toolbar : '#' + tool_bar_id,
					columns : [ [ {
						title : '编号',
						field : 'id',
						checkbox : true
					}, {
						title : '应用名称',
						field : 'moduleName',
						width : '14.28%'
					}, {
						title : '应用标识',
						field : 'modulePrefix',
						width : '14.28%'
					}, {
						title : '应用类型',
						field : 'moduleType',
						width : '14.28%',
						formatter:function(value,row,index){
							if(value==0){
								return 'J2EE(JavaWeb)';
							}else if(value==1){
								return 'J2SE(Java工具)';
							}else if(value==2){
								return 'IOS(IOS应用)';
							}else if(value==3){
								return 'Android(安卓应用)';
							}
						}
					}, {
						title : '应用描述',
						field : 'moduleDescription',
						width : '14.28%'
					}, {
						title : '重复登录',
						field : 'isRepeatLogin',
						width : '14.28%',
						formatter:function(value,row,index){
							if(value){
								return '允许';
							}
							return '不允许';
						}
					}, {
						title : '最大登录数',
						field : 'maxLoginNum',
						width : '14.28%'
					}, {
						title : '创建时间',
						field : 'createTime',
						width : '14.28%'
					} ] ]
				});
			},
			this.editModule=function(){
				var record=this.getModuleGrid().datagrid('getSelected');
				if(null==record||record.length==0){
					Tool.show('编辑应用', '请选择你要编辑的应用');
					return;
				}
				console.info(record);
				if(record.isRepeatLogin){
					this.getIsRepeatLoginBtn().switchbutton('check');
				}else{
					this.getIsRepeatLoginBtn().switchbutton('uncheck');
				}
				var moduleType=record.moduleType;
				$('#'+this.module_edit_form_id).form('load',{
					moduleName:record.moduleName,
					modulePrefix:record.modulePrefix,
					moduleType:moduleType,
					moduleMaxLogin:record.maxLoginNum,
					moduleDescription:record.moduleDescription
				});
				this.moduleEditWinInit('编辑应用',record.id).show();
			},
			this.saveModule=function(moduleId){
				var $this=this;
				console.info('moduleId---------->'+moduleId);
				var moduleName=$('#'+this.module_edit_name_id).val();
				console.info('moduleName--------->'+moduleName);
				if(Tool.stringIsBlank(moduleName)){
					Tool.alert('应用名称不能为空');
					return;
				}
				var modulePrefix=$('#'+this.module_edit_prefix_id).val();
				console.info('modulePrefix--------->'+modulePrefix);
				if(Tool.stringIsBlank(modulePrefix)){
					Tool.alert('应用标识不能为空');
					return;
				}
				var moduleType=$('#'+this.module_edit_type_id).combobox('getValue');
				console.info('moduleModuleType--------->'+moduleType);
				var moduleModuleIsRepeatLogin=$('#'+this.module_edit_is_repeat_login_id).switchbutton('options').checked;
				console.info('moduleModuleIsRepeatLogin--------->'+moduleModuleIsRepeatLogin);
				var moduleModuleMaxLogin=$('#'+this.module_edit_max_login_id).val();
				console.info('moduleModuleMaxLogin--------->'+moduleModuleMaxLogin);
				var moduleModuleDescription=$('#'+this.module_edit_description_id).val();
				console.info('moduleModuleDescription--------->'+moduleModuleDescription);
				Tool.postMethod('saveModule.do', {
					id:moduleId,
					moduleName:moduleName,
					modulePrefix:modulePrefix,
					moduleType:moduleType,
					isRepeatLogin:moduleModuleIsRepeatLogin,
					maxLoginNum:moduleModuleMaxLogin,
					moduleDescription:moduleModuleDescription
				}, function(result){
					if(result.status==1){
						$this.getModuleGrid().datagrid('reload');
						$this.getModuleEditWin().dialog('close');
						Tool.alert('保存成功');
						return;
					}
					Tool.alert(result.message);
				}, function(errMsg){
					
				});
			},
			this.removeModule=function(){
				var $this=this;
				var recordArray=this.getModuleGrid().datagrid('getSelections');
				if(null==recordArray||recordArray.length==0){
					Tool.alert('请选择要删除的应用信息!');
					return;
				}
				var recordIds='';
				var recordNames='';
				for(var i in recordArray){
					var record=recordArray[i];
					recordIds+=record.id;
					recordIds+=',';
					recordNames+=record.moduleName;
					recordNames+=',';
				}
				recordIds=Tool.removeLastSign(recordIds, ',');
				recordNames=Tool.removeLastSign(recordNames, ',');
				Tool.confirm('删除应用', '你确认删除<span style="color:red;font-weight:bold">'+recordNames+'</span>吗?', function(){
					Tool.postMethod('removeModuleByModuleIdArray.do', {
						moduleIdArrayString:recordIds
					}, function(result){
						if(result.status==1){
							$this.getModuleGrid().datagrid('reload');
							Tool.show('删除应用','删除<span style="color:red;font-weight:bold">'+recordNames+'</span>成功');
							return;
						}
						Tool.alert(result.message);
					}, function(errMsg){
						
					});
					
				});
			},
			this.init = function() {
				this.moduleAddBtnInit();
				this.moduleRemoveBtnInit();
				this.moduleModifyBtnInit();
				this.moduleGridInit(this.module_grid_tool_bar_id);
			}
};