<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="../../common/common.jsp"%>
<script type="text/javascript"
	src="<%=JS_MODULE_URL%>/sysresources/sysresource.js"></script>
<div id="sysresource_treegrid_panel"></div>
<div id="sysresource_treegrid_toolbar"
	style="padding: 5px; height: auto; display: none">
	<div style="margin-bottom: 5px">
		<a id="add-sysresource-btn" href="javascript:void(0)"></a> <a
			id="remove-sysresource-btn" href="javascript:void(0)"></a> <a
			id="modify-sysresource-btn" href="javascript:void(0)"></a>
			<!-- <a
			id="edit-sysresource-node-btn" href="javascript:void(0)"></a> -->
	</div>
</div>

<div id="edit_sysresource_win" style="display: none">
	<div style="padding: 10px 60px 20px 60px">
		<form id="edit_sysresource_form" method="post">
			<input type="hidden" name="sysResourceId" id="sysresource_id" />
			<table cellpadding="5">
				<tr>
					<td>资源名称:</td>
					<td><input class="easyui-textbox" id="sysresource_name" name="sysresourceName"
						type="text" style="width: 150px" data-options="required:true"></input></td>
				</tr>
				<tr>
					<td>资源标识:</td>
					<td><input class="easyui-textbox" id="sysresource_prefix" name="sysresourcePrefix"
						type="text" style="width: 150px"></input></td>
				</tr>
				<tr>
					<td>资源类型:</td>
					<td><input class="easyui-combobox" id="sysresource_type" name="sysresourceType"
						style="width: 150px;"></input></td>
				</tr>
				<tr>
					<td>资源链接:</td>
					<td><input class="easyui-textbox" id="sysresource_link" name="sysresourceLink"
						style="width: 150px;"></input></td>
				</tr>
				<tr style="display:none" id="child_node">
					<td>子节点:</td>
					<td><input id="sysresource_child" name="sysResourceChild"
						style="width: 150px;"></input></td>
				</tr>
				<tr>
					<td>资源描述:</td>
					<td><input class="easyui-textbox" id="sysresource_description" name="sysresourceDescription"
						style="width: 150px; height: 60px"></input></td>
				</tr>
			</table>
		</form>
	</div>
</div>



<script type="text/javascript">
	var sysResource = new SysResource();
	sysResource.setting('sysresource_treegrid_panel',
			'sysresource_treegrid_toolbar', 'add-sysresource-btn',
			'remove-sysresource-btn', 'modify-sysresource-btn','edit-sysresource-node-btn',
			'edit_sysresource_win', 'edit_sysresource_form','sysresource_name','sysresource_prefix', 'sysresource_type',
			'sysresource_link','child_node','sysresource_child','sysresource_description');
	sysResource.init();
</script>