<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ include file="../../common/common.jsp" %>
<script type="text/javascript" src="<%=JS_MODULE_URL%>/roles/resource_role.js"></script>
<div id="role_resource_panel"></div>
<div id="role_resource_toolbar" style="padding:5px;height:auto;display:none">
	<div style="margin-bottom:5px"> 
		<input id="search_value"/>
		<div id="search_condition" style="width:120px">
		    <div data-options="name:'roleName'">角色名称</div>
		    <div data-options="name:'rolePrefix'">角色标识</div>
		    <div data-options="name:'roleDescription'">角色描述</div>
		</div>
	</div>
</div>
<script type="text/javascript">
var resource_role=new ResourceRole();
resource_role.setting('role_resource_panel','search_value');
resource_role.init();
</script>