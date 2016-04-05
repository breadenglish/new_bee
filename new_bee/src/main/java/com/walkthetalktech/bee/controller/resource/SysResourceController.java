package com.walkthetalktech.bee.controller.resource;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.walkthetalktech.authority.model.authority.RoleInfo;
import com.walkthetalktech.authority.model.authority.SysResource;
import com.walkthetalktech.authority.service.authority.ISysResourceService;
import com.walkthetalktech.bee.model.TreeNode;
import com.walkthetalktech.bee.utils.ModelConverter;

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
	public List<TreeNode> findSysResourceListByRoleInfo(RoleInfo roleInfo){
		List<SysResource> allSysResourceList=sysResourceService.findSysResourceListCascadeBySysResource(null);
		List<Long> sysResourceList=sysResourceService.findSysResourceIdListByRoleInfo(roleInfo);
		return ModelConverter.sysResourceConvertToTreeNode(allSysResourceList, null,sysResourceList).getChildren();
	}
	
	@RequestMapping("saveRoleSysResourceList")
	@ResponseBody
	public Map<String,Object> saveRoleSysResourceList(String treeNodeIds,Long roleInfoId){
		Map<String,Object> jsonObject=new HashMap<String,Object>();
		boolean isOk=false;
		try {
			isOk=sysResourceService.modifyRoleResourceByRoleInfoIdAndSysResourceIds(treeNodeIds, roleInfoId);
		} catch (Exception e) {
			e.printStackTrace();
		}
		if(isOk){
			jsonObject.put("state", "1");
		}else{
			jsonObject.put("state", "-1");
			jsonObject.put("message", "更新失败");
		}
		return jsonObject; 
	}
}
