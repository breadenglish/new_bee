<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ include file="../../common/common.jsp" %>
<script type="text/javascript" src="<%=JS_MODULE_URL%>/roles/role_info.js"></script>
<div id="roles_panel"></div>
<div id="roles_datagrid_toolbar" style="padding:5px;height:auto;display:none">    
    <div style="margin-bottom:5px">    
        <a id="add-roles-btn" href="javascript:void(0)"></a>   
        <a id="remove-roles-btn" href="javascript:void(0)"></a>
        <a id="modify-roles-btn" href="javascript:void(0)"></a>     
    </div>      
</div>   
<div id="edit_roles_win" style="display:none">
<div style="padding:10px 60px 20px 60px">
	    <form id="edit_roles_form" method="post">
	    	<input type="hidden" name="rolesId" id="rolesId" />
	    	<table cellpadding="5">
	    		<tr>
	    			<td>角色名称:</td>
	    			<td><input class="easyui-textbox" id="roles_name" type="text" name="rolesName" style="width:150px" data-options="required:true"></input></td>
	    		</tr>
	    		<tr>
	    			<td>角色标识:</td>
	    			<td><input class="easyui-textbox" id="roles_prefix" type="text" name="rolesPrefix" style="width:150px" data-options="required:true"></input></td>
	    		</tr>
	    		<tr>
	    			<td>角色描述:</td>
	    			<td><input class="easyui-textbox" id="roles_description" name="rolesDescription" style="width:150px;height:60px"></input></td>
	    		</tr>
	    	</table>
	    </form>
	</div>
</div>



<script type="text/javascript">
var role_info=new RoleInfo();
role_info.setting('roles_panel','add-roles-btn','remove-roles-btn','modify-roles-btn','edit_roles_win','edit_roles_form','roles_name','roles_prefix','roles_description');
role_info.init();
</script>