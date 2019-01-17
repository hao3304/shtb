import { tranObj, getModel } from "../components/common";
import user from "./user";
import dict from "./dict";
import role from "./role";
import dictItem from "./dictItem";
import dep from "./dep";
import unit from "./unit";
import project from "./project";
import stage from "./stage";
import section from "./section";

export default {
  newUser: tranObj(user),
  userModel: getModel(user),
  newDict: tranObj(dict),
  dictModel: getModel(dict),
  newDictItem: tranObj(dictItem),
  dictItemModel: getModel(dictItem),
  newRole: tranObj(role),
  roleModel: getModel(role),
  newDep: tranObj(dep),
  depModel: getModel(dep),
  newProject: tranObj(project),
  projectModel: getModel(project),
  newStage: tranObj(stage),
  stageModel: getModel(stage),
  newUnit: tranObj(unit),
  unitModel: getModel(unit),
  newSection: tranObj(section),
  sectionModel: getModel(section)
};
