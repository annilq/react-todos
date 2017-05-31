// 后台组件
import App from "../App";
import MainTasks from "../components/maintasksContainer";
import TaskDetail from "../components/taskdetail";
const routes = {
  path: "/",
  component: App,
  indexRoute: { onEnter: (nextState, replace) => replace("home") },
  childRoutes: [
    {
      path: "/home",
      params: { type: 1 },
      component: MainTasks
    },
    {
      path: "/like",
      params: { type: 2 },
      component: MainTasks
    },
    {
      path: "/done",
      params: { type: 3 },
      component: MainTasks
    },
    {
      path: "/folders/:id",
      component: MainTasks
    },
    {
      path: "/tasks/:id",
      component: TaskDetail
    }
  ]
};
export default routes;
