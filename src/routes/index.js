// 后台组件
import App from "../App";
import CSTasks from "../components/tasksContainer";
import Login from "../components/login";
import Register from "../components/register";
const routes = {
  path: "/",
  component: App,
  indexRoute: { onEnter: (nextState, replace) => replace("/login") },
  childRoutes: [
    {
      path: "/login",
      component: Login
    },
    {
      path: "/register",
      component: Register
    },
    {
      path: "/home",
      params: { type: "home" },
      component: CSTasks
    },
    {
      path: "/star",
      params: { type: "star", query: { star: true } },
      component: CSTasks
    },
    {
      path: "/done",
      params: { type: "done", query: { status: 1 } },
      component: CSTasks
    },
    {
      path: "/folders/:id",
      component: CSTasks
    },
    {
      path: "*",
      onEnter: (nextState, replace) => replace("/home"),
      component: CSTasks
    }
  ]
};
export default routes;
