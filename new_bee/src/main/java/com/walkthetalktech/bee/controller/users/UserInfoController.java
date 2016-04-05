package com.walkthetalktech.bee.controller.users;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.walkthetalktech.authority.model.users.UserInfo;

import net.sf.json.JSONObject;

@Controller
public class UserInfoController {

	
	@RequestMapping("loginBeeSystem")
	@ResponseBody
	public JSONObject loginBeeSystem(UserInfo userInfo){
		JSONObject jsonObject=new JSONObject();
		jsonObject.put("status", "1");
		return jsonObject;
	}
}
