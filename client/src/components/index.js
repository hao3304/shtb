import Vue from "vue";
import iconfont from "./iconfont";
import FFilter from "./FFilter";
import FPanel from "./crud/FPanel";
import FPage from "./FPage";
import FLayoutPanel from "./layout/FLayoutPanel";
import TwoV from "./layout/FLayoutPanel/TowVertical";
import XWrapper from "./xWrapper";
import iconButton from "./iconButton";
import notFind from "./notFind";
import treeSelect from "./treeSelect";
import mapPosition from "./mapPosition";
import tableSelect from "./tableSelect";
import userSelect from "./userSelect";
import FButtonTab from "./layout/FButtomTab";

Vue.component("FFilter", FFilter);
Vue.component("Iconfont", iconfont);
Vue.component("FPanel", FPanel);
Vue.component("FPage", FPage);
Vue.component("FLayoutPanel", FLayoutPanel);
Vue.component("TwoH", FLayoutPanel);
Vue.component("TwoV", TwoV);
Vue.component("XWrapper", XWrapper);
Vue.component("IconButton", iconButton);
Vue.component("notFind", notFind);
Vue.component("treeSelect", treeSelect);
Vue.component("mapPosition", mapPosition);
Vue.component("userSelect", userSelect);
Vue.component("tableSelect", tableSelect);
Vue.component("FButtonTab", FButtonTab);
