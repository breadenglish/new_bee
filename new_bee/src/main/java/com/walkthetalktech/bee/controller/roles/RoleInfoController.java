package com.walkthetalktech.bee.controller.roles;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.walkthetalktech.authority.model.authority.RoleInfo;
import com.walkthetalktech.authority.service.authority.IRoleInfoService;
import com.walkthetalktech.authority.service.authority.ISysResourceService;
import com.walkthetalktech.bee.utils.ModelConverter;

import net.sf.json.JSONObject;

@Controller
public class RoleInfoController {

	@Autowired
	private IRoleInfoService roleInfoService;
	
	@Autowired
	private ISysResourceService sysResourceService;

	@RequestMapping("roleLayout")
	public String roleLayout() {
		return "module/roles/role_layout";
	}
	
	@RequestMapping("roleInfoIndex")
	public String roleInfoIndex(){
		return "module/roles/role_info";
	}
	
	@RequestMapping("resourceRoleInfo")
	public String resourceRoleInfo(){
		return "module/roles/resource_role";
	}
	
	@RequestMapping("roleInfoSysResourceList")
	@ResponseBody
	public Map<String,Object> roleInfoSysResourceList(RoleInfo roleInfoParam,Integer page){
		Map<String,Object> jsonObject=new HashMap<String,Object>();
		roleInfoParam.setBeginNum((page - 1) * roleInfoParam.getRows());
		List<RoleInfo> roleInfoList=roleInfoService.findRoleSysResourceListByRoleInfo(roleInfoParam);
		List<JSONObject> treeGridData=ModelConverter.roleInfoConvertToTreeGrid(roleInfoList);
		jsonObject.put("rows", treeGridData);
		Integer total=roleInfoService.findRoleInfoCountByRoleInfo(roleInfoParam);
		jsonObject.put("total", total);
		return jsonObject;
	}

	@RequestMapping("roleInfoList")
	@ResponseBody
	public Map<String,Object> roleInfoList(RoleInfo roleInfoParam, Integer page) {
		Map<String,Object> jsonObject = new HashMap<String,Object>();
		roleInfoParam.setBeginNum((page - 1) * roleInfoParam.getRows());
		List<RoleInfo> roleInfoList = roleInfoService.findRoleInfoByRoleInfo(roleInfoParam);
		Integer total = roleInfoService.findRoleInfoCountByRoleInfo(roleInfoParam);
		jsonObject.put("rows", roleInfoList);
		jsonObject.put("total", total);
		return jsonObject;
	}
	
	
	@RequestMapping("modifyRoleInfo")
	@ResponseBody
	public Map<String,Object> modifyRoleInfo(RoleInfo roleInfoParam){
		Map<String,Object> jsonObject=new HashMap<String,Object>();
		RoleInfo roleInfo=roleInfoService.modifyRoleInfoByRoleInfo(roleInfoParam);
		if(null!=roleInfo){
			jsonObject.put("status", "1");
			return jsonObject;
		}
		jsonObject.put("status", "-1");
		jsonObject.put("message", "修改失败");
		return jsonObject;
	}
	
	@RequestMapping("addRoleInfo")
	@ResponseBody
	public Map<String,Object> addRoleInfo(RoleInfo roleInfo){
		Map<String,Object> jsonObject=new HashMap<String,Object>();
		boolean isOk=roleInfoService.addRoleInfoByRoleInfo(roleInfo)>0;
		if(isOk){
			jsonObject.put("status", "1");
			return jsonObject;
		}
		jsonObject.put("status", "-1");
		jsonObject.put("message", "添加失败");
		return jsonObject;
	}
	
	@RequestMapping("removeRoleInfoListByIds")
	@ResponseBody
	public Map<String,Object> removeRoleInfoListByIds(String rolesIds){
		Map<String,Object> jsonObject=new HashMap<String,Object>();
		boolean isOk=roleInfoService.removeRoleInfoListByPKArray(rolesIds);
		if(isOk){
			jsonObject.put("status", 1);
			return jsonObject;
		}
		jsonObject.put("status", "-1");
		jsonObject.put("message", "删除失败");
		return jsonObject;
	}
}
