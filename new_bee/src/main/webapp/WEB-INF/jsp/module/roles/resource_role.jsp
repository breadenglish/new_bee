<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ include file="../../common/common.jsp" %>
<script type="text/javascript" src="<%=JS_MODULE_URL%>/roles/resource_role.js"></script>
<div id="role_resource_panel"></div>
<script type="text/javascript">
var resource_role=new ResourceRole();
resource_role.setting('role_resource_panel');
resource_role.init();
</script>