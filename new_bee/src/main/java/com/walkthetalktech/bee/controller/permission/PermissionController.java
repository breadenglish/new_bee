package com.walkthetalktech.bee.controller.permission;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.walkthetalktech.authority.model.authority.Permission;
import com.walkthetalktech.authority.service.authority.IPermissionService;

import net.sf.json.JSONObject;

@Controller
public class PermissionController {

	@Autowired
	private IPermissionService permissionService;
	
	@RequestMapping("permissionIndex")
	public String permissionIndex(){
		return "module/permission/permission";
	}
	
	@RequestMapping("permissionList")
	@ResponseBody
	public JSONObject permissionList(Permission permission,Integer page){
		JSONObject jsonObject=new JSONObject();
		permission.setBeginNum((page-1)*permission.getRows());
		List<Permission> permissionList=permissionService.findPermissionListByPermission(permission);
		Integer total=permissionService.findPermissionCountByPermission(permission);
		jsonObject.put("rows", permissionList);
		jsonObject.put("total", total);
		return jsonObject;
	}
	
	@RequestMapping("modifyPermission")
	@ResponseBody
	public JSONObject modifyPermission(Permission permissionParam){
		JSONObject jsonObject=new JSONObject();
		Permission permission= permissionService.modifyPermissionByPermission(permissionParam);
		if(null!=permission){
			jsonObject.put("status", "1");
			return jsonObject;
		}
		jsonObject.put("status", "-1");
		jsonObject.put("message", "修改失败");
		return jsonObject;
	}
	
	@RequestMapping("addPermission")
	@ResponseBody
	public JSONObject addPermission(Permission permission){
		JSONObject jsonObject=new JSONObject();
		boolean isOk=permissionService.addPermissionByPermission(permission)>0;
		if(isOk){
			jsonObject.put("status", "1");
			return jsonObject;
		}
		jsonObject.put("status", "-1");
		jsonObject.put("message", "添加失败");
		return jsonObject;
	}
	
	@RequestMapping("removePermissionListByIds")
	@ResponseBody
	public JSONObject removePermissionListByIds(String permissionIds){
		JSONObject jsonObject=new JSONObject();
		boolean isOk=permissionService.removePermissionListByPKArray(permissionIds);
		if(isOk){
			jsonObject.put("status", 1);
			return jsonObject;
		}
		jsonObject.put("status", "-1");
		jsonObject.put("message", "删除失败");
		return jsonObject;
	}
}
