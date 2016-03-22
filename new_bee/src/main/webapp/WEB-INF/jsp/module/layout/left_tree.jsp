<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ include file="../../common/common.jsp" %>
<script type="text/javascript" src="<%=JS_URL%>/module/layout/accordion_menu.js?v=201603171648"></script>
<div id="accordion_menu"></div>
<script type="text/javascript">
var accordionMenu=new AccordionMenu('accordion_menu');
accordionMenu.load_menu();
</script>