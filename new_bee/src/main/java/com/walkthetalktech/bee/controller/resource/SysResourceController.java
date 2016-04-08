package com.walkthetalktech.bee.controller.resource;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.walkthetalktech.authority.model.authority.RoleInfo;
import com.walkthetalktech.authority.model.authority.SysResource;
import com.walkthetalktech.authority.model.authority.SysResourceType;
import com.walkthetalktech.authority.service.authority.ISysResourceService;
import com.walkthetalktech.bee.model.TreeNode;
import com.walkthetalktech.bee.utils.ModelConverter;

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
	
	
	@RequestMapping("findSysResourceTreeGridBySysResource")
	@ResponseBody
	public Map<String,Object> findSysResourceTreeGridBySysResource(SysResource sysResource,Integer page){
		sysResource.setBeginNum((page-1)*sysResource.getRows());
		sysResource.setResourceParentId(0l);
		List<SysResource> sysResourceList=sysResourceService.findSysResourceListCascadeBySysResource(sysResource);
		ModelConverter.setTreeGridIndexBegin(-1);
		List<JSONObject> treeGridList=ModelConverter.sysResourceConvertToTreeGrid(sysResourceList);
		Integer count=sysResourceService.findSysResourceCountBySysResource(sysResource);
		Map<String,Object> jsonObject=new HashMap<String,Object>();
		jsonObject.put("rows", treeGridList);
		jsonObject.put("total", count);
		return jsonObject;
	}
	
	@RequestMapping("findSysResourceTreeBySysResource")
	@ResponseBody
	public List<TreeNode> findSysResourceTreeBySysResource(SysResource sysResource){
		List<SysResource> sysResourceList=sysResourceService.findSysResourceListCascadeBySysResource(null);
		List<Long> ownerIdList=null;
		if(null!=sysResource.getId()){
			SysResource sysResourceParam=new SysResource();
			sysResourceParam.setResourceParentId(sysResource.getId());
			ownerIdList=sysResourceService.findSysResourceIdListBySysResource(sysResourceParam);
		}
		List<TreeNode> sysResourceTreeList=ModelConverter.sysResourceConvertToTreeNode(sysResourceList, null, ownerIdList).getChildren();
		return sysResourceTreeList;
	}
	
	
	@RequestMapping("findSysResourceType")
	@ResponseBody
	public List<SysResourceType> findSysResourceType(){
		List<SysResourceType> sysResourceTypeList=new ArrayList<SysResourceType>();
		SysResourceType menuType=new SysResourceType();
		menuType.setSysResourceTypeId(1l);
		menuType.setSysResourceType("菜单");
		SysResourceType buttonType=new SysResourceType();
		buttonType.setSysResourceTypeId(2l);
		buttonType.setSysResourceType("按钮");
		SysResourceType linkType=new SysResourceType();
		linkType.setSysResourceTypeId(3l);
		linkType.setSysResourceType("链接");
		sysResourceTypeList.add(menuType);
		sysResourceTypeList.add(buttonType);
		sysResourceTypeList.add(linkType);
		return sysResourceTypeList;
	}
	
	@RequestMapping("saveSysResource")
	@ResponseBody
	public JSONObject saveSysResource(SysResource sysResource,String childIdArrayString){
		JSONObject jsonObject=new JSONObject();
		boolean isOk=sysResourceService.saveSysResourceBySysResourceAndChild(sysResource, childIdArrayString);
		if(isOk){
			jsonObject.put("status", "1");
		}else{
			jsonObject.put("status","-1");
			jsonObject.put("message", "保存失败");
		}
		return jsonObject;
	}
	
	@RequestMapping("removeSysResourceList")
	@ResponseBody
	public JSONObject removeSysResourceList(String sysResourceIdListString){
		JSONObject jsonObject=new JSONObject();
		if(sysResourceService.removeSysResourceBySysResourceIdListString(sysResourceIdListString)){
			jsonObject.put("status", "1");
		}else{
			jsonObject.put("status", "-1");
			jsonObject.put("message", "删除失败,请检查原因");
		}
		return jsonObject;
	}
}
