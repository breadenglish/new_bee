package com.walkthetalktech.bee.controller.layout;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class MainLayoutController {

	@RequestMapping("mainLayout")
	public String mainLayout(){
		return "main";
	}
	
	@RequestMapping("leftTree")
	public String leftTree(){
		return "module/layout/left_tree";
	}
}
