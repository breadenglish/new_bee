<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<title>NEW_BEE</title>
<%@ include file="common/header.jsp" %>
<script type="text/javascript" src="<%=JS_URL%>/common/tool.js"></script>
<script type="text/javascript" src="<%=JS_URL%>/module/main_layout.js"></script>
<script type="text/javascript">
$(function(){
	var mainLayout=new MainLayout("main_layout");
	mainLayout.mainLayout();
	mainLayout.treePanel("leftTree.do");
	mainLayout.centerTabs('mainCenter.do');
})
</script>
</head>
<body>
<div id="main_layout">
</div>
</body>
</html>