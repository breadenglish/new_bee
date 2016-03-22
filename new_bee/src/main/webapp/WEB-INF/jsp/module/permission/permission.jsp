<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ include file="../../common/common.jsp" %>
<script type="text/javascript" src="<%=JS_MODULE_URL%>/permission/permission.js?v=201603171752"></script>
<div id="permission_panel"></div>
<div id="permission_datagrid_toolbar" style="padding:5px;height:auto;display:none">    
    <div style="margin-bottom:5px">    
        <a id="add-permission-btn" href="javascript:void(0)"></a>   
        <a id="remove-permission-btn" href="javascript:void(0)"></a>
        <a id="modify-permission-btn" href="javascript:void(0)"></a>     
    </div>      
</div>   
<div id="edit_permission_win" style="display:none">
<div style="padding:10px 60px 20px 60px">
	    <form id="edit_permission_form" method="post">
	    	<input type="hidden" name="permissionId" id="permissionId" />
	    	<table cellpadding="5">
	    		<tr>
	    			<td>权限名称:</td>
	    			<td><input class="easyui-textbox" id="permission_name" type="text" name="permissionName" style="width:150px" data-options="required:true"></input></td>
	    		</tr>
	    		<tr>
	    			<td>权限标识:</td>
	    			<td><input class="easyui-textbox" id="permission_prefix" type="text" name="permissionPrefix" style="width:150px" data-options="required:true"></input></td>
	    		</tr>
	    		<tr>
	    			<td>权限描述:</td>
	    			<td><input class="easyui-textbox" id="permission_description" name="permissionDescription" style="width:150px;height:60px"></input></td>
	    		</tr>
	    	</table>
	    </form>
	</div>
</div>



<script type="text/javascript">
var permission=new Permission();
permission.setting('permission_panel','add-permission-btn','remove-permission-btn','modify-permission-btn','edit_permission_win','edit_permission_form','permission_name','permission_prefix','permission_description');
permission.init();
</script>