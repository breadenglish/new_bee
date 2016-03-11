<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<title>NEW_BEE</title>
<%@ include file="/WEB-INF/jsp/common/header.jsp" %>
<script type="text/javascript" src="<%=JS_URL%>/common/tool.js"></script>
<script type="text/javascript" src="<%=JS_URL %>/module/login.js"></script>
<script type="text/javascript">
	$(function(){
		var userInfo=new UserInfo('login_win','account','password');
		userInfo.showLoginWin();
	});
</script>
</head>
<body>
<div id="login_win" style="width:400px">
	<div style="padding:10px 60px 20px 60px">
	    <form id="ff" method="post">
	    	<table cellpadding="5">
	    		<tr>
	    			<td>账号:</td>
	    			<td><input class="easyui-textbox" id="account" type="text" name="name" data-options="required:true"></input></td>
	    		</tr>
	    		<tr>
	    			<td>密码:</td>
	    			<td><input class="easyui-textbox" id="password" type="password" name="password" data-options="required:true"></input></td>
	    		</tr>
	    	</table>
	    </form>
	    </div>
</div>
</body>
</html>