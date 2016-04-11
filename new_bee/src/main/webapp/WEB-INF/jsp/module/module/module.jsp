<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="../../common/common.jsp"%>
<script type="text/javascript" src="<%=JS_MODULE_URL%>/module/module.js"></script>
<div id="module_panel"></div>
<div id="module_datagrid_toolbar"
	style="padding: 5px; height: auto; display: none">
	<div style="margin-bottom: 5px">
		<a id="add-module-btn" href="javascript:void(0)"></a> <a
			id="remove-module-btn" href="javascript:void(0)"></a> <a
			id="modify-module-btn" href="javascript:void(0)"></a>
	</div>
</div>
<div id="edit_module_win" style="display: none">
	<div style="padding: 10px 60px 20px 60px">
		<form id="edit_module_form" method="post">
			<table cellpadding="5">
				<tr>
					<td>应用名称:</td>
					<td><input class="easyui-textbox" id="module_name" type="text"
						name="moduleName" style="width: 150px"
						data-options="required:true"></input></td>
				</tr>
				<tr>
					<td>应用标识:</td>
					<td><input class="easyui-textbox" id="module_prefix" type="text"
						name="modulePrefix" style="width: 150px"
						data-options="required:true"></input></td>
				</tr>
				<tr>
					<td>应用类型:</td>
					<td><input id="module_type" type="text"
						name="moduleType" style="width: 150px"
						data-options="required:true"></input></td>
				</tr>
				<tr>
					<td>重复登录:</td>
					<td><input class="easyui-switchbutton" id="module_repeat_login"
						type="text" name="moduleRepeatLogin" style="width: 150px"></input></td>
				</tr>
				<tr>
					<td>最大登录:</td>
					<td><input class="easyui-textbox" id="module_max_login"
						type="number" name="moduleMaxLogin" style="width: 150px"></input></td>
				</tr>
				<tr>
					<td>应用描述:</td>
					<td><input class="easyui-textbox" id="module_description"
						name="moduleDescription" style="width: 150px; height: 60px"></input></td>
				</tr>
			</table>
		</form>
	</div>
</div>



<script type="text/javascript">
	var module = new Module();
	module.setting('module_panel', 'module_datagrid_toolbar', 'add-module-btn',
			'remove-module-btn', 'modify-module-btn', 'edit_module_win',
			'edit_module_form', 'module_name','module_prefix' ,'module_type',
			'module_repeat_login', 'module_max_login', 'module_description');
	module.init();
</script>