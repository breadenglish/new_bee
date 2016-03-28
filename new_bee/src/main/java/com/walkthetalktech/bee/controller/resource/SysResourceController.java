package com.walkthetalktech.bee.controller.resource;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.walkthetalktech.authority.model.authority.RoleInfo;
import com.walkthetalktech.authority.model.authority.SysResource;
import com.walkthetalktech.authority.service.authority.ISysResourceService;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

@Controller
public class SysResourceController {

	@Autowired
	private ISysResourceService sysResourceService;
	
	@RequestMapping("sysResourceIndex")
	public String sysResourceIndex(){
		return "module/sysresources/sysresource";
	}
	
	@RequestMapping("findSysResourceListByRoleInfo")
	@ResponseBody
	public JSONArray findSysResourceListByRoleInfo(RoleInfo roleInfo){
		List<SysResource> sysResourceList=sysResourceService.findSysResourceListByRoleInfo(roleInfo,true);
		JSONArray treeNodeArray=new JSONArray();
		for (SysResource sr : sysResourceList) {
			JSONObject treeNode= new JSONObject();
			treeNode.put("id", sr.getId());
			treeNode.put("iconCls", sr.getResourceIcon());
			treeNode.put("text", sr.getSysResourceName());
			if(sr.getChildren().size()>0){
				List<JSONObject> jsonObjectList=new ArrayList<JSONObject>();
				for (SysResource childSysResource : sr.getChildren()) {
					JSONObject child=new JSONObject();
					child.put("id", childSysResource.getId());
					child.put("iconCls", childSysResource.getResourceIcon());
					child.put("text", childSysResource.getSysResourceName());
					jsonObjectList.add(child);
				}
				if(jsonObjectList.size()>0){
					treeNode.put("children", jsonObjectList);
				}
			}
			treeNodeArray.add(treeNode);
		}
		return treeNodeArray;
	}
}
