<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<div id="role_layout">
	
</div>
<script type="text/javascript">
<!--
$('#role_layout').layout({
	fit:true
});
$('#role_layout').layout('add',{
	region:'north',
	width:'100%',
	height:'50%',
	split:true,
	title:'角色管理',
	href:'roleInfoIndex.do'
});
$('#role_layout').layout('add',{
	region:'center',
	width:'100%',
	height:'50%',
	title:'角色-资源配额',
	href:'resourceRoleInfo.do'
});
//-->
</script>