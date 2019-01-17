import Vue from "vue";
import Router from "vue-router";

import About from "@/views/About";
import Error404 from "@/views/error-page/404";
import User from "@/views/system/user";
import Role from "@/views/system/role";
import Dict from "@/views/system/dict";
import Unit from "@/views/system/unit";

import Home from "@/views/Home";

Vue.use(Router);

export const routes = [
  {
    path: "/about",
    name: "About",
    component: About
  },
  {
    path: "/404",
    name: "E404",
    component: Error404
  },
  {
    path: "/system/user",
    name: "User",
    component: User
  },
  {
    path: "/system/role",
    name: "Role",
    component: Role
  },
  {
    path: "/system/dict",
    name: "Dict",
    component: Dict
  },
  {
    path: "/system/unit",
    name: "Unit",
    component: Unit
  },
  {
    path: "/home",
    name: "Home",
    component: Home
  },
  {
    path: "/system/project",
    name: "Project",
    component: () => import("@/views/system/project")
  },
  {
    path: "/system/stage",
    name: "Stage",
    component: () => import("@/views/system/stage")
  },
  {
    path: "/user/project",
    name: "MyProject",
    component: () => import("@/views/user/MyProject")
  }
];

export default new Router({
  routes
});
