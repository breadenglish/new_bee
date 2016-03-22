package com.walkthetalktech.bee.controller.users;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.walkthetalktech.authority.annotation.CheckRoles;
import com.walkthetalktech.authority.model.users.UserInfo;

import net.sf.json.JSONObject;

@Controller
public class UserInfoController {

	
	@RequestMapping("loginBeeSystem")
	@ResponseBody
	@CheckRoles(roles={"admin"})
	public JSONObject loginBeeSystem(UserInfo userInfo){
		JSONObject jsonObject=new JSONObject();
		
		System.out.println("测试环境");
		return jsonObject;
	}
}
