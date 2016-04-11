package com.walkthetalktech.bee.controller.module;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.walkthetalktech.authority.model.authority.Module;
import com.walkthetalktech.authority.model.authority.ModuleType;
import com.walkthetalktech.authority.service.authority.IModuleService;

import net.sf.json.JSONObject;

@Controller
public class ModuleController {

	@Autowired
	private IModuleService moduleService;
	
	@RequestMapping("moduleIndex")
	public String moduleIndex(){
		return "module/module/module";
	}
	
	@RequestMapping("findModuleListByModule")
	@ResponseBody
	public Map<String,Object> findModuleListByModule(Module moduleParam,Integer page){
		Map<String,Object> jsonObject=new HashMap<String,Object>();
		moduleParam.setBeginNum(moduleParam.getRows()*(page-1));
		List<Module> moduleList=moduleService.findModuleListByModule(moduleParam);
		Integer total=moduleService.findModuleCountByModule(moduleParam);
		jsonObject.put("rows", moduleList);
		jsonObject.put("total", total);
		return jsonObject;
	}
	
	@RequestMapping("saveModule")
	@ResponseBody
	public Map<String,Object> saveModule(Module module){
		Map<String,Object> jsonObject=new HashMap<String,Object>();
		if(null!=moduleService.saveModule(module)){
			jsonObject.put("status", "1");
		}else{
			jsonObject.put("status", "-1");
			jsonObject.put("message", "保存失败");
		}
		return jsonObject;
	}
	
	@RequestMapping("removeModuleByModuleIdArray")
	@ResponseBody
	public JSONObject removeModuleByModuleIdArray(String moduleIdArrayString){
		JSONObject jsonObject=new JSONObject();
		if(moduleService.removeModuleByModuleIdArrayString(moduleIdArrayString)){
			jsonObject.put("status", "1");
		}else{
			jsonObject.put("status", "-1");
			jsonObject.put("message", "删除失败");
		}
		return jsonObject;
	}
	
	
	@RequestMapping("moduleTypeList")
	@ResponseBody
	public List<ModuleType> moduleTypeList(){
		List<ModuleType> moduleTypeList=new ArrayList<ModuleType>();
		ModuleType j2ee=new ModuleType();
		j2ee.setModuleTypeName("J2EE(JavaWeb)");
		j2ee.setModuleType(0l);
		ModuleType j2se=new ModuleType();
		j2se.setModuleTypeName("J2SE(Java工具)");
		j2se.setModuleType(1l);
		ModuleType ios=new ModuleType();
		ios.setModuleTypeName("IOS(IOS应用)");
		ios.setModuleType(2l);
		ModuleType android=new ModuleType();
		android.setModuleTypeName("Android(安卓应用)");
		android.setModuleType(3l);
		moduleTypeList.add(j2ee);
		moduleTypeList.add(j2se);
		moduleTypeList.add(ios);
		moduleTypeList.add(android);
		return moduleTypeList;
	}
}
