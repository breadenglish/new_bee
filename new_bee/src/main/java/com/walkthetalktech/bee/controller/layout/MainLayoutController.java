package com.walkthetalktech.bee.controller.layout;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.walkthetalktech.authority.enums.ResourceType;
import com.walkthetalktech.authority.model.authority.SysResource;
import com.walkthetalktech.authority.model.users.UserInfo;
import com.walkthetalktech.authority.service.authority.ISysResourceService;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

@Controller
public class MainLayoutController {

	@Autowired
	private ISysResourceService sysResourceService;

	@RequestMapping("findTreeNodeList")
	@ResponseBody
	public List<JSONObject> findTreeNodeList(SysResource sysResource) {
		List<JSONObject> jsonObjectList=new ArrayList<JSONObject>();
		
		sysResource.setAvaiable(true);
		sysResource.setIsDel(false);
		sysResource.setResourceType(ResourceType.MENU.getValue());
		List<SysResource> sysResourceList = sysResourceService.findSysResourceListBySysResource(sysResource);
		if (null == sysResourceList||sysResourceList.size()==0) {
			JSONObject jsonObject = new JSONObject();
			jsonObject.put("iconCls", "icon-no");
			jsonObject.put("text", "没有数据");
			jsonObjectList.add(jsonObject);
			return jsonObjectList;
		}
		for (SysResource sr : sysResourceList) {
			JSONObject treeNode= new JSONObject();
			treeNode.put("id", sr.getId());
			treeNode.put("iconCls", sr.getResourceIcon());
			treeNode.put("text", sr.getSysResourceName());
			treeNode.put("href", sr.getResourceLink());
			jsonObjectList.add(treeNode);
		}
		return jsonObjectList;
	}

	@RequestMapping("findMenuList")
	@ResponseBody
	public JSONObject findMenuList() {
		JSONObject jsonObject = new JSONObject();
		UserInfo userInfo = new UserInfo();
		userInfo.setAccount("admin");
		List<SysResource> sysResourceList = sysResourceService.findSysResourceListByUserInfo(userInfo,
				ResourceType.MENU);
		if (null == sysResourceList) {
			jsonObject.put("status", "-1");
			return jsonObject;
		}
		JSONArray menuArray = new JSONArray();
		for (SysResource sysResource : sysResourceList) {
			JSONObject menuJson = new JSONObject();
			menuJson.put("title", sysResource.getSysResourceName());
			menuJson.put("menuId", sysResource.getId());
			menuJson.put("iconCls", sysResource.getResourceIcon());
			menuJson.put("href", sysResource.getResourceLink());
			menuArray.add(menuJson);
		}
		jsonObject.put("status", "1");
		jsonObject.put("menuArray", menuArray);
		return jsonObject;
	}

	@RequestMapping("mainLayout")
	public String mainLayout() {
		return "main";
	}

	@RequestMapping("leftTree")
	public String leftTree() {
		return "module/layout/left_tree";
	}

	@RequestMapping("mainCenter")
	public String mainCenter() {
		return "module/layout/center_panel";
	}

	@RequestMapping("welcome")
	public String welcome() {
		return "common/welcome";
	}
}
