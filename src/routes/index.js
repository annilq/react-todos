// 后台组件
import App from "../App";
import CSTasks from "../components/tasksContainer";
const routes = {
  path: "/",
  component: App,
  indexRoute: { onEnter: (nextState, replace) => replace("home") },
  childRoutes: [
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
    }
  ]
};
export default routes;
