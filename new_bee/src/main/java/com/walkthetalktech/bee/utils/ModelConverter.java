package com.walkthetalktech.bee.utils;

import java.util.ArrayList;
import java.util.List;

import com.walkthetalktech.authority.model.authority.RoleInfo;
import com.walkthetalktech.authority.model.authority.SysResource;
import com.walkthetalktech.bee.model.TreeNode;

import net.sf.json.JSONObject;

public class ModelConverter {
	
	public static TreeNode sysResourceConvertToTreeNode(List<SysResource> sysResourceList,TreeNode treeNodeParam,List<Long> ownerSysResourceList){
		List<TreeNode> treeNodeList=new ArrayList<TreeNode>();
		for (SysResource sysResource : sysResourceList) {
			TreeNode treeNode=new TreeNode();
			treeNode.setId(sysResource.getId());
			treeNode.setIconCls(sysResource.getResourceIcon());
			treeNode.setText(sysResource.getSysResourceName());
			if(null!=ownerSysResourceList&&ownerSysResourceList.contains(sysResource.getId())){
				treeNode.setChecked(true);
			}else{
			}
			
			if(null!=sysResource.getChildren()&&sysResource.getChildren().size()>0){
				treeNode=sysResourceConvertToTreeNode(sysResource.getChildren(), treeNode,ownerSysResourceList);
			}
			treeNodeList.add(treeNode);
		}
		if(null==treeNodeParam){
			treeNodeParam=new TreeNode();
			treeNodeParam.setId(-1l);
			treeNodeParam.setText("菜单");
		}
		treeNodeParam.setState(TreeNode.State.closed);
		treeNodeParam.setChildren(treeNodeList);
		return treeNodeParam;
	}
	
	private static Integer treeGridIndex=-1;
	
	public static void setTreeGridIndexBegin(Integer treeGridIndex){
		ModelConverter.treeGridIndex=treeGridIndex;
	}
	
	public static List<JSONObject> roleInfoConvertToTreeGrid(List<RoleInfo> roleInfoList){
		ModelConverter.setTreeGridIndexBegin(-1);
		List<JSONObject> treeGridData=new ArrayList<JSONObject>();
		for(RoleInfo roleInfo : roleInfoList){
			treeGridIndex++;
			JSONObject roleInfoJSONObject=new JSONObject();
			roleInfoJSONObject.put("index", treeGridIndex);
			roleInfoJSONObject.put("id", "role_"+roleInfo.getId());
			roleInfoJSONObject.put("name", roleInfo.getRoleName());
			roleInfoJSONObject.put("prefix", roleInfo.getRolePrefix());
			roleInfoJSONObject.put("description", roleInfo.getRoleDescription());
			if(null!=roleInfo.getSysResourceList()&&roleInfo.getSysResourceList().size()>0){
				List<JSONObject> children= ModelConverter.sysResourceConvertToTreeGrid(roleInfo.getSysResourceList());
				roleInfoJSONObject.put("state", "closed");
				roleInfoJSONObject.put("children", children);
			}
			treeGridData.add(roleInfoJSONObject);
		}
		return treeGridData;
	}
	
	public static List<JSONObject> sysResourceConvertToTreeGrid(List<SysResource> sysResourceList){
		List<JSONObject> treeGridData=new ArrayList<JSONObject>();
		for (SysResource sysResource : sysResourceList) {
			treeGridIndex++;
			JSONObject jsonObject=new JSONObject();
			jsonObject.put("index", treeGridIndex);
			jsonObject.put("id", "resource_"+sysResource.getId());
			jsonObject.put("name", sysResource.getSysResourceName());
			jsonObject.put("prefix", sysResource.getSysResourcePrefix());
			jsonObject.put("description", sysResource.getResourceDescription());
			jsonObject.put("link", sysResource.getResourceLink());
			jsonObject.put("resourceType", sysResource.getResourceType());
			if(null!=sysResource.getChildren()&&sysResource.getChildren().size()>0){
				List<JSONObject> children=sysResourceConvertToTreeGrid(sysResource.getChildren());
				if(children.size()>0){
					jsonObject.put("state", "closed");
					jsonObject.put("children", children);
				}
			}
			treeGridData.add(jsonObject);
		}
		return treeGridData;
	}
}
