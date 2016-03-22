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

@Controller
public class RoleInfoController {

	@Autowired
	private IRoleInfoService roleInfoService;

	@RequestMapping("roleInfoIndex")
	public String roleInfoIndex() {
		return "module/roles/role_info";
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
}
