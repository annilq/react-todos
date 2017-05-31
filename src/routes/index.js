// 后台组件
import App from "../App";
import CSTasks from "../components/tasksContainer";
import TaskDetail from "../components/taskdetail";
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
    },
    {
      path: "/tasks/:id",
      component: TaskDetail
    }
  ]
};
export default routes;
