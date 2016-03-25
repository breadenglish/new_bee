package com.walkthetalktech.bee.controller.resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.walkthetalktech.authority.service.authority.ISysResourceService;

@Controller
public class SysResourceController {

	@Autowired
	private ISysResourceService sysResourceService;
	
	@RequestMapping("sysResourceIndex")
	public String sysResourceIndex(){
		return "module/sysresources/sysresource";
	}
}
